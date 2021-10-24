import { verifyEmail } from "../Api/Api.js";

const emailInput = document.getElementById('email')
const message = document.getElementById('emailMessage')
const btnSend = document.getElementById('send')

emailInput.addEventListener('keyup',async ()=>{
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(emailInput.value == ""){
        message.innerHTML = ""
        emailInput.classList.remove('is-invalid')
        emailInput.classList.remove('is-valid')
    }else{
        if(emailPattern.test(emailInput.value)){
            const result = await verifyEmail(emailInput.value)
              if(result.exists === true){
                emailInput.classList.remove('is-invalid')
                emailInput.classList.add('is-valid')
                message.innerHTML=""
                btnSend.disabled = false;
                  
              }else{
                emailInput.classList.add('is-invalid')
                message.innerHTML ="<p class='mt-2'><i style='color: red; 'class='fas fa-times'> </i> This email is not registered. Provide a registered email.</p>";
                btnSend.disabled = true;
                 
              }
            }else{
                    emailInput.classList.add('is-invalid')
                    message.innerHTML ="<p class='mt-2'><i style='color: red; 'class='fas fa-times'></i> Write a valid email. </p>";
                    btnSend.disabled = true;
            }
    }
})

