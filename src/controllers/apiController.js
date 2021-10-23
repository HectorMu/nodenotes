const connection = require('../database')
const controller = {}


controller.getAllRegisteredUsers = async(req, res) =>{
    try {
        const validLocations = ['/signup','/recover']
        const location = req.headers.location
        if(location != undefined){
            if(location.includes(validLocations)){
                const users = await connection.query('select email from users')
                res.json(users);
            }else{
                res.json({error:"Unauthorized"})
            }  
        }else{
            res.json({error:"Unauthorized"})
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = controller