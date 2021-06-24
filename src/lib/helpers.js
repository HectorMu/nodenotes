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

module.exports = helpers

