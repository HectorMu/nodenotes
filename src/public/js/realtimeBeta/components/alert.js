
const messages = document.getElementById('messages')
export const Alert = (message) =>{
    if(message.length >0){
        messages.innerHTML =  `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>${message}</strong>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
        </div>
        `
    }
    
}