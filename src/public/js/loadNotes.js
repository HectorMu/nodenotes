import { getUserNotes } from "./Api/Api.js";


const main = async()=>{
    const userNotes = await getUserNotes();
    console.log(userNotes)
}

main()