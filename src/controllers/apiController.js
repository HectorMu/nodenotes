const connection = require('../database')
const controller = {}


controller.getAllRegisteredUsers = async(req, res) =>{
    try {
        const users = await connection.query('select email from users')
        res.json(users);
    } catch (error) {
        console.log(error)
    }
}








module.exports = controller