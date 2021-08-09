const notLoggedLinks = document.getElementById('NotLogged')
    if(window.location.href.includes('login') || window.location.href.includes('signup')){
        notLoggedLinks.classList.add('d-none')
    }else{
        notLoggedLinks.classList.remove('d-none')
    }