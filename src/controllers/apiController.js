const connection = require('../database')
const controller = {}


controller.getAllRegisteredUsers = async(req, res) =>{
    try {
        const validLocation = req.headers.location
        if(validLocation != undefined){
            const users = await connection.query('select email from users')
            res.json(users);
        }else{
            res.json({error:"Unauthorized"})
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = controller