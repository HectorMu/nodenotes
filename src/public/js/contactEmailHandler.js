const form = document.getElementById('contactForm')
const reply = document.getElementById('reply')
const message = document.getElementById('message')
form.addEventListener('submit',async(e)=>{
    e.preventDefault()
    const response = await fetch('https://formspree.io/f/xleapeqa',{
        method:'POST',
        headers:{
           'Content-Type':'application/json',
        },
        body: JSON.stringify({
            _replyto: reply.value,
            message: message.value
        })  
    })
    const results = await response.json();
    if(results.ok){
        swal("Email sended!", "Thank you for your coments!", "success");
        reply.value ="";
        message.value=""
    }else{
        swal("Ooops!", "Something wen't wrong, try again!", "error");
    }
})