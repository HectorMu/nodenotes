import { saveNote,editNote } from "../apiNotesFetch.js"
import { RenderNotes } from "../userInterface.js"
import { Alert } from "./alert.js"
import { hideButton, showButton } from "./buttonVisibility.js"
import { Clean } from "./cleanInputs.js"
import { formDesign } from "./form.js"
import { noteData } from "./noteComponent.js"


const formDiv = document.getElementById('form')
let idnote = 0;
export const getSelection = () =>{
    let selection = noteData
    idnote = selection[0].idnote
    window.setDataInForm(selection)
    // hideButton(btnsave)
    // showButton(btnSaveEdit)
    // showButton(btnCancelEdit)
}
export const addNoteForm = async() => {
        //getting the form
        formDiv.innerHTML = formDesign()
        //form data
        const title = document.getElementById('Title')
        const content = document.getElementById('Content')
        const importance = document.getElementById('Importance')
        //form controls
        const btnsave = document.getElementById('btnSave')
        const btnSaveEdit = document.getElementById('btnSaveEdit')
        const btnCancelEdit  = document.getElementById('btnCancelEdit')
        const formTitle = document.getElementById('formCardHeader');

        btnsave.addEventListener('click',async(e)=>{
            e.preventDefault();
            const response =  await saveNote(title.value,content.value,importance.value)
            if(response){
               
                await RenderNotes()
                Clean()
                Alert("Note Saved")
            }else{
                Alert("Something wen't wrong")
            }
           
        })
        btnSaveEdit.addEventListener('click',async(e)=>{
            e.preventDefault();
            const response = await editNote(idnote,title.value,content.value,importance.value);
            if(response){
                showButton(btnsave)
                hideButton(btnSaveEdit)
                hideButton(btnCancelEdit)
                await RenderNotes()
                Clean()
                Alert("Note edited")
            }
        })

        btnCancelEdit.addEventListener('click',(e)=>{
            e.preventDefault();
            formTitle.innerText ="Add a new note"
            title.value =""
            content.value =""
            importance.value = ""
            btnSaveEdit.classList.add('d-none')
            btnCancelEdit.classList.add('d-none')
            btnsave.classList.remove('d-none');
        })

        window.setDataInForm = (noteData) =>{
            formTitle.innerText = `Editing note: ${noteData[0].title}`
            title.value = noteData[0].title
            content.value = noteData[0].content
            importance.value = noteData[0].importance

            showButton(btnSaveEdit)
            showButton(btnCancelEdit)
            hideButton(btnsave)
        }
}



