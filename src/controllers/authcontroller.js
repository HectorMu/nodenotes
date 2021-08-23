const authController = {}
const Dbpool = require('../database')
const helpers = require('../lib/helpers')
const jwt = require('jsonwebtoken')
const { urlencoded } = require('express')
const nodeMailer = require('../lib/nodemailer')
const passport = require('passport')

authController.signUp = passport.authenticate('signup',{
    successRedirect:'/profile',
    failureRedirect:'/signup',
    failureFlash:true
})

//this controller determines if there's is an user and then redirect that user to
//a route saved in the database, of this way user can choose what view will pop up at login
//this can be use too redirect users depending his roles in the system
//time to make and understand this: 10 hours since 4 pm to 2 am
authController.login = (req, res, next)=>{
    passport.authenticate('local.login',(err, user)=>{
        if(!user){
            return res.redirect('/login')
        }
        req.logIn(user,(err)=>{
            let hour = 18000000
            req.session.cookie.expires = new Date(Date.now()+hour)
            req.session.cookie.maxAge = hour
            return res.redirect('/'+req.user.startscreen)
        })
    })(req, res, next)
}
// authController.login = passport.authenticate('local.login',{
//       successRedirect:'/profile',
//       failureRedirect:'/login',
//       failureFlash:true
// })
authController.logout = (req, res, next)=>{
    req.logOut();
    res.redirect('/')
}


//recover user password
//this controller sends an email to a user to recover his password, user must be registered in the db
authController.SendRecoverEmail = async(req, res)=>{
    const{email} = req.body
    const rows = await Dbpool.query("select * from users where email = ?",[email])
    if(rows.length>0){
        nodeMailer.Send(req, res);

    }else{
        req.flash("error_msg", "There isn't an account with that email")    
        res.redirect('/recover')
    }
}
//this controller render the recover view, need to receive the req.params to get it on the form action
authController.RenderRecoverView = (req, res)=>{
    const {token} = req.params
    const Freetoken = token.split('ñ')[0];
    const FreeId = token.split('ñ')[1];
    try {
        const payload = jwt.verify(Freetoken,process.env.TOKEN_SECRET)
        res.render('resetpass',{
            //here we pass the req.params to recover view
        token
        })
    } catch (error) {
        req.flash("error_msg", "Invalid provided token, the token has expired")    
        res.redirect('/login')
    }
 }
 //this controller change the password on post, first verify the token, then get if there is an user with that id, and
 //finishing updating the user password
 authController.ChangeRecoverPass = async (req, res)=>{
    const {token} = req.params
    const Freetoken = token.split('ñ')[0];
    const FreeId = token.split('ñ')[1];
    const {newpass} = req.body
    try {
        const payload = jwt.verify(Freetoken,process.env.TOKEN_SECRET)
        const user = await Dbpool.query("select * from users where iduser =  ?",[FreeId])
        console.log(user)
        if(user.length>0){
            const NewPassHash = await helpers.encryptPass(newpass)
            await Dbpool.query("update users set pass = ? where iduser = ?",[NewPassHash,FreeId])
            req.flash("success_msg","Password updated successfully")
            res.redirect('/login')
        }
    } catch (error) {
        req.flash("error_msg", "Invalid provided token, the token has expired")    
        res.redirect('/login')
    }
 }
module.exports = authController
