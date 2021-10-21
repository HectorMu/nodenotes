const controller = {}
const Dbpool = require('../database')
let actualNotes = "All my notes"

controller.listNotes = async (req, res)=>{
    const notes = await Dbpool.query("select * from notes where fkuser = ?",[req.user.iduser])
    actualNotes = "All my notes"
        res.render('mynotes',{
            notes, actualNotes,
        })   
   
}
controller.listImportantNotes = async (req, res)=>{
    const notes = await Dbpool.query("select * from notes where importance = 'warning' && fkuser = ?",[req.user.iduser])
    if(notes.length>0){
        actualNotes = "Important notes"
        res.render('mynotes',{
        notes, actualNotes
    })  
    }else{
        req.flash("error_msg","There isn't important notes")
        res.redirect('/mynotes')
    }
     
}
controller.listVeryImportantNotes = async (req, res)=>{
    const notes = await Dbpool.query("select * from notes where importance = 'danger' && fkuser = ?",[req.user.iduser])
    if(notes.length>0){
        actualNotes = "Very important notes"
        res.render('mynotes',{
            notes, actualNotes
        })  
    }else{
        req.flash("error_msg","There isn't very important notes")
        res.redirect('/mynotes')
    }
     
}
controller.listNormalNotes = async (req, res)=>{
    const notes = await Dbpool.query("select * from notes where importance = 'dark' && fkuser = ?",[req.user.iduser])
    if(notes.length>0){
        actualNotes = "Normal importance notes" 
        res.render('mynotes',{
            notes,  actualNotes
        })   
    }else{
        req.flash("error_msg","There isn't normal importance notes")
        res.redirect('/mynotes')
    }
}


controller.saveNote = async(req, res)=>{
    const {title,content,importance} = req.body
    let today = new Date()
    const createdat = today.toLocaleDateString("en-US");
    const fkuser = req.user.iduser
    const newNote = {
        title,
        content, 
        createdat,
        fkuser,
        importance
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
    const {title, content,importance} = req.body
    const newNote = {
        title, content,importance
    }
    await Dbpool.query("update notes set ? where idnote = ?",[newNote, idnote])
    req.flash("success_msg","Note "+title+" information edited succesfully")
    res.redirect('/mynotes')
}
controller.deleteNote = async(req, res)=>{
    const {idnote, title} = await req.params
    await Dbpool.query("delete from notes where idnote = ?",[idnote])
    req.flash("success_msg",`Note "${title}" deleted succesfully`)
    res.redirect('/mynotes')

}
controller.searchNote = async(req, res)=>{
    const {search} = await req.body
    const iduser  = req.user.iduser
    if(search == ""){
        res.redirect('/mynotes')
    }
    const notes = await Dbpool.query("select * from notes where title like ? && fkuser = ?",['%'+search+'%',iduser])
    if(notes.length>0){
        actualNotes = `Note finded`
        res.render('mynotes',{
            notes,actualNotes
        })
    }
    else{
        req.flash("error_msg","There isn't a note with that name")
        res.redirect('/mynotes')
    }
   
}





module.exports = controller
