window.sr = ScrollReveal();
const animateByDirection = (objectsArray)=>{
    objectsArray.map(el=>{
        sr.reveal(el.id,{
            duration: 1000,
            origin: el.origin,
            distance: '50px'
        });
    })
}

const animateSectionRight = (elementsArray) =>{
    elementsArray.map(el =>{
        sr.reveal(el, {
            duration: 1500,
            origin: 'right',
            distance:'50px'
        });
    })
}

const animateSectionLeft = (elementsArray) =>{
    elementsArray.map(el =>{
        sr.reveal(el, {
            duration: 1500,
            origin: 'left',
            distance:'50px'
        });
    })
}

const animateOneByOneLeft =(elementsArray)=>{
    let del = 0;
    elementsArray.map(el =>{
        sr.reveal(el,{
            delay:del,
            duration: 500,
            origin: 'left',
            distance: '50px'
        });
        del+=500;
    })
}

const animateByDirectionOneByOne = (objectsArray)=>{
    let del = 0;
    objectsArray.map(el=>{
        sr.reveal(el.id,{
            delay:del,
            duration: 1000,
            origin: el.origin,
            distance: '50px'
        });
        del+=500
    })
}

sr.reveal('#backtop',{
    duration: 2000,
    origin: 'top',
    distance:'100px'
});


//calling all animate functions
const headerElements = [ {id: '.header-content-left',origin: 'left'},{ id: '#header-card',origin: 'right'}]
animateByDirection(headerElements)

const sectionsRightIds = ['#stepone-right','#steptwo-right','#stepthree-right','#contactdiv']
animateSectionRight(sectionsRightIds)

const sectionsLeftIds = ['#stepone-left','#steptwo-left','#stepthree-left','#formcard']
animateSectionLeft(sectionsLeftIds)

const animatedCirclesIds = ['#circle1','#arrow1','#circle2','#arrow2','#circle3','#check']
animateOneByOneLeft(animatedCirclesIds)

const featuresCards = [{id: '#card1',origin: 'left'},{id: '#card2',origin: 'left'},{id: '#card4',origin: 'top'},{id: '#card3',origin: 'right'}]
animateByDirectionOneByOne(featuresCards)






