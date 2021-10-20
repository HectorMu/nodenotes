import { SearchComponent } from "./components/search.js";
import { renderRealtimeBeta } from "./realtime.js";
import { mainRender } from "./userInterface.js";
const body = document.getElementById('body')
const btnTry = document.getElementById('trybeta')

btnTry.addEventListener('click',()=>{
    body.innerHTML = renderRealtimeBeta()
    mainRender()
})

