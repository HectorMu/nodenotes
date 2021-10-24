const connection = require('../database')
const controller = {}



controller.verifyExistingEmail = async (req, res)=>{
    const {email} = req.params
    try {
        const findedEmail = await connection.query(`select email from users where email like '%${email}%'`)
        if(findedEmail.length>0){
            if(findedEmail[0].email){
                res.json({exists:true})
            }
        }
        else{
            res.json({exists:false})
        }
        
    } catch (error) {
        console.log(error)
    }
}


module.exports = controller