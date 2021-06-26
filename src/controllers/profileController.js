const controller = {}
const helpers = require('../lib/helpers')
const Dbpool = require('../database')


controller.GetNotes = async(req, res) =>{
    const notes = await Dbpool.query('select count(idnote) as num from notes where fkuser = ?',[req.user.iduser])
    console.log(notes[0].num)
    res.render('userprofile',{
       notes
    })
}

controller.renderEditProfile = async(req, res)=>{
    const {iduser} = await req.params
    const users = await Dbpool.query("Select * from users where iduser = ?",[iduser])
    console.log(users)
    
    res.render('profile_edit',{
        users:users[0]
    })
} 
controller.editProfile = async(req, res)=>{
    const iduser = req.user.iduser
    const {firstname, lastname, email} = req.body
    const newUser = {
        firstname,
        lastname,
        email,
    }
    await Dbpool.query("update users set firstname = ?, lastname = ?, email = ? where iduser = ?",[newUser.firstname, newUser.lastname,newUser.email, iduser])
    res.redirect('/profile')
}
controller.changeStartScreen = async(req, res)=>{
    const iduser = req.user.iduser
    const {startscreen} = req.body
    await Dbpool.query("update users set startscreen = ? where iduser = ?",[startscreen,iduser])
    res.redirect('/profile')
}

controller.changePassword = async(req, res)=>{
    const iduser = req.user.iduser
    const {oldpass, newpass} = req.body
    if(newpass.length<8){
        req.flash("error_msg","Password was'nt 8 caracters long. Try again")
        res.redirect('/profile')
    }else{
        console.log(req.body)
    const rows = await Dbpool.query("select * from users where email = ?",[req.user.email])
    const user = rows[0]
    const validpass = await helpers.validatePass(oldpass,user.pass)
    console.log(validpass)
    if(validpass){
        const NewEncryptPass = await helpers.encryptPass(newpass)
        await Dbpool.query("update users set pass = ? where iduser = ?",[NewEncryptPass , iduser])
        req.flash("success_msg","Password updated successfully")
        res.redirect('/profile')
    }
    else{
        req.flash("error_msg","Password doesnt match with old password")
        res.redirect('/profile')
    }
    }
    
}

module.exports = controller
