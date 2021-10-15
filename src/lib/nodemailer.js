const nodeMailer = require('nodemailer')
const emailFormat = require('../lib/emailFormat')
const jwt = require('jsonwebtoken');
const Dbpool = require('../database')
const Email = {}

Email.Send = async (req, res)=>{

    let transporter = nodeMailer.createTransport({
        service: 'outlook',
        auth:{
            user:process.env.MAILEREMAIL,
            pass:process.env.MAILERPASS
        }
    })
    //creating the user token
    const {email} = req.body
    const user = await Dbpool.query("select * from users where email = ?", [email])
   // console.log(user)
    const payload={
        email: user[0].email,
        id: user[0].iduser
    }
    const token = jwt.sign(payload,process.env.TOKEN_SECRET,{expiresIn: '15m'})
    const link = `https://nodenoteshm.herokuapp.com/resetpass/${token}ñ${user[0].iduser}`

    let emailOptions = {
        from: 'nodenotes@outlook.com',
        to: req.body.email,
        subject:"Account Recover",
        html:  emailFormat.EmailHTML(link)
    }
    transporter.sendMail(emailOptions,(err, info)=>{
        
        if(err){
            req.flash('error_message','Can\'t send the email, try again'+ err)
            res.redirect('/recover')
        }else {
            req.flash('success_msg','An email with instructions has been sent')
            res.redirect('/login')
        }
    })
}

module.exports = Email
