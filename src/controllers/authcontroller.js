const authController = {}
const passport = require('passport')

authController.signUp = passport.authenticate('signup',{
    successRedirect:'/profile',
    failureRedirect:'/signup',
    failureFlash:true
})

authController.login = passport.authenticate('local.login',{
    successRedirect:'/profile',
    failureRedirect:'/login',
    failureFlash:true
})

authController.logout = (req, res, next)=>{
    req.logOut();
    res.redirect('/')
}
module.exports = authController