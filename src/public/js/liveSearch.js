const notesTitle = document.querySelectorAll('.card-header')
const allNotes = document.querySelectorAll('.card')
const allCols = document.querySelectorAll('.card-col')
const txtSearch = document.getElementById('txtSearch')
txtSearch.addEventListener('keyup',()=>{
  for(let i = 0; i < allNotes.length; i++){
    if(txtSearch.value=="" || txtSearch.value == null){
    allNotes[i].classList.remove('d-none')
      allCols[i].classList.remove('d-none')
    }
    if(!notesTitle[i].textContent.includes(txtSearch.value)){
      allNotes[i].classList.add('d-none')
      allCols[i].classList.add('d-none')   
    }
  }
})