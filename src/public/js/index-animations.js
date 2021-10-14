window.sr = ScrollReveal();
window.addEventListener('load',()=>{

sr.reveal('.header-content-left',{
    duration: 2000,
    origin: 'top',
    distance: '300px'
});
sr.reveal('.header-content-right',{
    duration: 2000,
    origin: 'right',
    distance: '10px'
});
sr.reveal('#contact-description-column',{
    duration: 2000,
    origin: 'right',
    distance:'10px'
});
sr.reveal('#howtostart',{
    duration: 1500,
    origin: 'top',
    distance: '200px'
});
sr.reveal('#testimonial',{
    duration: 2000,
    origin: 'bottom',
    distance: '300px'

});
sr.reveal('#col-content-right',{
    duration: 2000,
    origin: 'top',
    distance: '300px'

});
sr.reveal('#contact-column',{
    duration: 2000,
    origin: 'left',
    distance:'10px'
});
sr.reveal('#contact-description-column',{
    duration: 2000,
    origin: 'right',
    distance:'10px'
});
sr.reveal('#backtop',{
    duration: 2000,
    origin: 'top',
    distance:'100px'
});



})



