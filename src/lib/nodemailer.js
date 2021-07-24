const nodeMailer = require('nodemailer')
const jwt = require('jsonwebtoken');
const Dbpool = require('../database')
const Email = {}

Email.Send = async (req, res)=>{

    let transporter = nodeMailer.createTransport({
        service: 'outlook',
        auth:{
            user:process.env.MAILEREMAIL,
            pass:process.env.MAILERPASS
            //user: 'nodenotes@outlook.com',
            //pass:'hmNoNotes123'
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
    const link = `http://localhost:3000/resetpass/${user[0].iduser}/${token}`

    let emailOptions = {
        from: 'nodenotes@outlook.com',
        to: req.body.email,
        subject:"Account Recover",
        html:  `
        <div style="font-family: arial;font-family:arial;border: 1px solid #0006;">
            <div class="container" style="font-family: arial;">
                                 <div class="col-md-12">
                                     <div class="box" style="border: 1px solid #e9ecef;padding: 5px;">
                                          <h1><Strong>¡Hi there!</Strong></h1> 
                                          <p style="font-size: 20px;">
                                              You are receiving this email because you did a password reset request for your account.
                                              This link will be active only by 15 minutes counting since the request was made.
                                             <br>
                                             <br>
                                             <center> 
                                                 <a  style="text-decoration: none;color: #fff;background-color: gray;border-color: gray;display: inline-block;margin-bottom: 0;font-weight: 400;text-align: center;white-space: nowrap;vertical-align: middle;-ms-touch-action: manipulation;touch-action: manipulation;cursor: pointer;background-image: none;border: 1px solid transparent;padding: 6px 12px;font-size: 20px;line-height: 1.42857143;border-radius: 4px;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;"  style="font-size: 20px;" href="${link}" >Reset password</a>
                                             </center>
                                             <br>
                                             <br>
                                                 <p style="font-size: 20px;">
                                                    If you didn't request a password change, you can ignore this email.
                                                     
                                                     <br>
                                                     Greetings, Héctor Muñoz, Node Notes CEO.
                                                 </p>
                                          </p>  
                                     </div>
                                 </div>
              </div>
     
        </div>`
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
