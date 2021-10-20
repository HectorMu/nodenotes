import { deleteNote,getOne } from "../apiNotesFetch.js"
import { RenderNotes } from "../userInterface.js"
import { getSelection } from "./addForm.js"
import { Alert } from "./alert.js"

export let noteData = []

export const createCardNote = (n) =>{
    window.DeleteNote = async(id)=>{
        let deleteConfirmation = confirm('¿Delete note?')
        if(deleteConfirmation){
            await deleteNote(id);
            await RenderNotes();
            Alert('Note Deleted')
        }
       
    }
    window.GetEditNoteData = async(id)=>{
        //cleanig the array
        noteData.splice(0, noteData.length)
        const note = await getOne(id)
        note.forEach(data => {
            noteData.push(data)
        });
        getSelection()
    }

    return  `
            <div class="col mt-2"> 
                <div class="container-fluid">
                    <div class="card mb-2"  style="width: 15rem;">
                        <div style="font-size: 22px;" class="card-header bg-${n.importance} text-white text-center font-weight-bold">
                            ${n.title}
                        </div>
                                <div class="card-body ">
                                    <p class="card-text">${n.content}</p>
                                    <div class="row">
                                        <div class="col">
                                        <button class="btn btn-outline-primary btn-block "  onClick="window.GetEditNoteData(${n.idnote})" >Edit</button>
                                        </div>
                                        <div class="col">
                                        <button class="btn btn-outline-danger btn-block " id="btnEdit"  onClick="window.DeleteNote(${n.idnote})" >Delete</button>
                                    </div>
                                </div>
                         </div>
                    </div>
                </div>
            </div>
            `
}