export const Clean = () =>{
    const textareas = document.querySelectorAll('textarea')
    const inputs = document.querySelectorAll('input')
    textareas.forEach(t => {
        t.value =""
    });
    inputs.forEach(i => {
        i.value =""
    });
}