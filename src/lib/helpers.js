const helpers = {}
const bcrypt = require('bcryptjs')

helpers.encryptPass = async(pass)=>{
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(pass,salt)
    return hash
}

helpers.validatePass = async(pass, savedPass)=>{
    try{
            return await bcrypt.compare(pass, savedPass)
    }catch(e){
        console.log(e)
    }
}

helpers.httpsRedirect = (req, res, next)=>{
    if(req.secure){
        next();
    }else{
        res.redirect('https://' + req.headers.host + req.url);
    }
}
helpers.unknownPageRedirect  = (_, res)=> res.redirect("/")

helpers.sessionConfig = () =>{
    let options = {
        host:process.env.DB_HOST ,
        port: 3306,
        user: process.env.DB_USER ,
        password: process.env.DB_PASSWORD ,
        database:process.env.DB_DATABASE,
    }
    return options
}

module.exports = helpers

