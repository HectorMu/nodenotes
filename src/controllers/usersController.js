const controller = {}
const helpers = require('../lib/helpers')
const Dbpool = require('../database')


controller.listUsers = async(req, res) =>{
    const users = await Dbpool.query('select * from users')
    res.render('users',{
       users
    })
}
controller.addUser = async(req, res)=>{
    const {firstname, lastname, email, pass, privileges} = req.body
    const newUser = {
        firstname,
        lastname,
        email,
        pass,
        privileges
    }
    newUser.pass =  await helpers.encryptPass(pass)
    const result = await Dbpool.query("insert into users set ?",[newUser])
    req.flash("success_msg","User "+newUser.firstname+" signed up succesfully, privileges as "+ newUser.privileges)
    res.redirect('/users')
}
controller.rendereditUser = async(req, res)=>{
    const {iduser} = await req.params
    const users = await Dbpool.query("Select * from users where iduser = ?",[iduser])
    console.log(users)
    
    res.render('user_edit',{
        users:users[0]
    })
}
controller.editUser = async(req, res)=>{
    const {iduser} = await req.params
    const {firstname, lastname, email, pass,privileges} = req.body
    const newUser = {
        firstname,
        lastname,
        email,
        pass,
        privileges
    }
    newUser.pass =  await helpers.encryptPass(pass)
    await Dbpool.query("update users set ?  where iduser = ?",[newUser, iduser])
    req.flash("success_msg","User "+newUser.firstname+" information edited succesfully")
    res.redirect('/users')
}

controller.deleteUser = async(req, res)=>{
    const {iduser} = await req.params
    await Dbpool.query("delete from users where iduser = ?",[iduser])
    req.flash("success_msg","User with id "+iduser+" deleted succesfully")
    res.redirect('/users')

}

controller.searchUser = async(req, res)=>{
    const {search} = await req.body
    if(search == ""){
        res.redirect('/users')
    }
    const users = await Dbpool.query("select * from users where firstname like ?",['%'+search+'%'])
    res.render('users',{
        users
    })
}



module.exports = controller