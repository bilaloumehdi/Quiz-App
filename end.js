// import { score } from "./script";
let username =document.getElementById('username-input');
let save =document.getElementById('save') ;
let finaleScore =document.getElementById('finalScore') ;
let resume =document.getElementById('resume') ;
let mostRecentScore = localStorage.getItem('mostRecentScore') ;
let highScores = JSON.parse(localStorage.getItem('scores'))|| [] ;



    
const alertPlaceholder = document.getElementById('liveAlertPlaceholder')


const alert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    alertPlaceholder.append(wrapper)
}


/* TOP 5 SCORES */
const MAX_SCORES =4 ;

save.addEventListener('click', (e) => {
    if(username.value === "") {
        alert('You must fill the username to save ', 'danger')
        return 
    }
    highScores.push({
        "username" :username.value , 
        "score":localStorage.getItem('mostRecentScore')
    }) ;

    highScores.sort((a,b) => b.score-a.score) ;

    highScores.splice(5) ;
    
    localStorage.setItem('scores',JSON.stringify(highScores)) ;
    username.value ="" ;

    e.preventDefault() ;

    alert('Result saved', 'success')
    
})



finaleScore.innerHTML = mostRecentScore ;
finaleScore.classList.add("text-blue" );

// message that depence to the result 
if(mostRecentScore == 0 ){
    resume.innerHTML = `You have lost ` ;
}

else if(mostRecentScore <= 20) {
    resume.innerHTML = `You can do better` ;
}
else if(mostRecentScore <= 40) {
    resume.innerHTML =`Good job `
}
else{
    resume.innerHTML =`Great job `
}

