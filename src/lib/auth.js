const auth={};

auth.isLoggedIn =(req, res, next)=>{
    if(req.isAuthenticated()){
        return next();
    }else{
        req.flash('error_msg','You must be logged in.');
        res.redirect('/login');
    }
}
module.exports = auth;