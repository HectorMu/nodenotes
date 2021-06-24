const controller = {}
const Dbpool = require('../database')

controller.listNotes = async (req, res)=>{
    const notes = await Dbpool.query("select * from notes where fkuser = ?",[req.user.iduser])
    console.log(notes)
    res.render('mynotes',{
        notes
    })
}
controller.saveNote = async(req, res)=>{
    const {title,content,createdat} = req.body
    const fkuser = req.user.iduser
    const newNote = {
        title,
        content, 
        createdat,
        fkuser
    }
    const insert = Dbpool.query("insert into notes set ?",[newNote])
    req.flash("success_msg","Note added succesfully")
    res.redirect('/mynotes')
}
controller.renderEditNote = async(req, res)=>{
    const {idnote} = await req.params
    const notes = await Dbpool.query("Select * from notes where idnote = ?",[idnote])
    console.log(notes)
    res.render('editnote',{
        notes:notes[0]
    })
}
controller.editNote = async(req, res)=>{
    const {idnote } = await req.params
    const {title, content, createdat} = req.body
    const newNote = {
        title, content, createdat
    }
    await Dbpool.query("update notes set ? where idnote = ?",[newNote, idnote])
    req.flash("success_msg","Note "+title+" information edited succesfully")
    res.redirect('/mynotes')
}
controller.deleteNote = async(req, res)=>{
    const {idnote} = await req.params
    await Dbpool.query("delete from notes where idnote = ?",[idnote])
    req.flash("success_msg","Note with id "+idnote+" deleted succesfully")
    res.redirect('/mynotes')

}
controller.searchNote = async(req, res)=>{
    const {search} = await req.body
    const iduser  = req.user.iduser
    if(search == ""){
        res.redirect('/mynotes')
    }
    const notes = await Dbpool.query("select * from notes where title like ? && fkuser = ?",['%'+search+'%',iduser])
    if(notes.length==0){
        req.flash("error_msg","There isn't a note with that name")
        res.redirect('/mynotes')
    }
    res.render('mynotes',{
        notes
    })
}





module.exports = controller