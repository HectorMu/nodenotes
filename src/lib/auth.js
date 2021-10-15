const auth={};

auth.isLoggedIn =(req, res, next)=>{
    if(req.isAuthenticated()){
        return next();
    }else{
        req.flash('error_msg','You must be logged in.');
        res.redirect('/login');
    }
}
auth.IsAlreadyLoggedIn = (req, res, next)=>{
    if(req.isAuthenticated()){
        req.flash('error_msg','You are already logged in, logout to visit this page')
        res.redirect('/profile')
    }else{
        return next()
    }
}
module.exports = auth;