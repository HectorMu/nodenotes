const mysql = require('mysql')    
const path = require('path')
const {promisify } = require('util')

const dotenv = require ('dotenv')
dotenv.config({ 
    path: path.resolve(__dirname, './env/.env') 
 })
const Dbpool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER ,
    password: process.env.DB_PASSWORD ,
    database: process.env.DB_DATABASE ,
    port: 3306
})
Dbpool.getConnection((err, connection)=>{
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('Database connection was closed by provider')
        }
    
    if(err.code === 'ER_CON_COUNT_ERROR'){
        console.error('Database has more than admited connections')
    }
    if(err.code === 'ECONNREFUSED'){
        console.error('The connection to databse was refused by provider')
    }
}
    if(connection){
        connection.release()
        console.log('Database connected succesfully')
        return
    }
})
Dbpool.query = promisify(Dbpool.query)
module.exports = Dbpool
