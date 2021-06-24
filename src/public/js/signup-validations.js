  //MATCH MESSAGE
  const matchMessage = document.getElementById('match')
  //LENGHT MESSAGE
  const lengthMessage = document.getElementById('res')
  //VALIDATE INPUT CONTENTS
  const txtFirstName = document.getElementById("first")
  const txtLastName = document.getElementById("last")
  const txtEmail  = document.getElementById("email")
  const txtPass = document.getElementById("pass")
  const txtConfirm = document.getElementById("confirm")
  const btnSignup = document.getElementById('signup')
   
  function validateInputs(){
      if(txtFirstName.value=="" || txtLastName.value=="" || txtEmail.value=="", txtPass.value=="", txtConfirm.value==""){
          btnSignup.disabled = true
             //VALIDATE PASSWORD LENGTH
              txtPass.addEventListener("keyup", function(){
                  if(txtPass.value.length<8){
                      lengthMessage.innerHTML ="Password must be 8 caracters length minimun"
                      btnSignup.disabled = true
                  }
                  if(txtPass.value.length >=8){
                      lengthMessage.innerHTML =""
                      btnSignup.disabled = false
                                       
                  }
                  if(txtPass.value != txtConfirm.value){
                    matchMessage.innerHTML ="Passwords do not match"
                    btnSignup.disabled = true
                }
                if(txtPass.value == txtConfirm.value){
                    matchMessage.innerHTML =""
                    btnSignup.disabled = false
                }
                  txtConfirm.addEventListener("keyup", function(){
                    if(txtPass.value.length<8){
                        lengthMessage.innerHTML ="Password must be 8 caracters length minimun"
                        btnSignup.disabled = true
                    }
                    if(txtPass.value.length >=8){
                        lengthMessage.innerHTML =""
                        btnSignup.disabled = false
                        //VALIDATE PASSWORD MATCHS                  
                    }
                    if(txtPass.value != txtConfirm.value){
                        matchMessage.innerHTML ="Passwords do not match"
                        btnSignup.disabled = true
                    }
                    if(txtPass.value == txtConfirm.value){
                        matchMessage.innerHTML =""
                        btnSignup.disabled = false
                    }
                   
                })    
          })
       }
  }
  window.onload = validateInputs();