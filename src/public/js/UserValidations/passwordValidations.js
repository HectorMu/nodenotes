export const shortPassword = (txt1, msg1, btn) => {
    if(txt1.value === "" || txt1.value === null){
        btn.disabled = true;
        txt1.classList.remove('is-invalid')
        msg1.innerHTML =""
    }else{
        if (txt1.value.length < 8) {
            txt1.classList.add('is-invalid');
            msg1.innerHTML = "<p class='mt-1'><i style='color: red; 'class='fas fa-times'></i>The password is too short.</p>";
            btn.disabled = true;
        } else {
            msg1.innerHTML = "";
            txt1.classList.remove('is-invalid');
            btn.disabled = false;
        }
       
    }
    
}

export const samePassword = (txt1, txt2, msg1, msg2, btn) => {
    if(txt1.value == "" && txt2.value == ""){
        btn.disabled = true;
        txt1.classList.remove('is-invalid')
        txt2.classList.remove('is-invalid')
        msg2.innerHTML=""
    }else{
        if (txt1.value == txt2.value && txt1.value.length >=8 ) {
            msg1.innerHTML = "";
            msg2.innerHTML = "";
            txt1.classList.remove('is-invalid');
            txt2.classList.remove('is-invalid');
            btn.disabled = false;
        } else {
            txt1.classList.add('is-invalid');
            txt2.classList.add('is-invalid');
            msg2.innerHTML = "<p class='mt-1'><i style='color: red; 'class='fas fa-times'></i>The passwords don't match.</p>"
            btn.disabled = true;
        }
        
    }
    
}