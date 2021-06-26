const authController = {}
const { urlencoded } = require('express')
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
module.exports = authController
