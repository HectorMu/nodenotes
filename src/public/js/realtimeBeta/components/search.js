import { getByTitle } from "../apiNotesFetch.js"
import { RenderNotes } from "../userInterface.js"
import { NotFound } from "./noFound.js"
import { createCardNote } from "./noteComponent.js"

const searchDiv = document.getElementById('Search')
const notesDiv = document.getElementById('notes')

export const SearchComponent = () =>{

    searchDiv.innerHTML =  `
    <input id="txtSearch" type="text" class="form-control" placeholder="Search Note by title">
    `
    const txtSearch = document.getElementById('txtSearch')

    txtSearch.addEventListener('keyup',async()=>
    {
        if(txtSearch.value ==""){
            await RenderNotes()
        }
        const note = await getByTitle(txtSearch.value)
        notesDiv.innerHTML = "";
        if(note.length > 0){
            note.map(n =>{
                notesDiv.insertAdjacentHTML('beforeend',createCardNote(n))
            }) 
        }else{
            notesDiv.innerHTML = NotFound()
        }
    })
}