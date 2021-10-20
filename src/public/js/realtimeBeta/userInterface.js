//imports
import { GetNotes } from "./apiNotesFetch.js";
import { addNoteForm } from "./components/addForm.js";
//components
import { createCardNote} from "./components/noteComponent.js";
import { SearchComponent } from "./components/search.js";

//binding elements
const notesDiv = document.getElementById('notes')
export const RenderNotes =async()=>{
    const notes = await GetNotes()
    //clean before entry again
    notesDiv.innerHTML =""
    notes.map(n =>{
        notesDiv.insertAdjacentHTML('beforeend', createCardNote(n))
    }) 
}

export const mainRender =  async() =>{
    RenderNotes()
    SearchComponent()
    addNoteForm()
}
