
let question =document.getElementById('question') ;
let choices =Array.from(document.getElementsByClassName('choice-text')) ;
let scoreFromDocument =document.getElementById('score') ;
//    for printing how much questions left
let count =document.getElementById('counter') ;

let loader =document.getElementById('loader') ;
let questionContainer =document.getElementById('question-container') ;

let questions =[] ;



let avialableQuestions =[] ;
let currentQuestion = {} ;
let questionsCounter = 0 ;

// make sure that every think is loaded then he will accapt to give the answer
let acceptingAnswers = false ;
let score = 0 ;

scoreFromDocument.classList.remove('text-blue') ;



// CONSTANTS
const CORRECT_ANSWER = 10 ;
const MAX_QUESTIONS = 5 ;


// fetching data form an API 
async function fetchData () {
    try{
        const res = await fetch("https://opentdb.com/api.php?amount=5&category=18&type=multiple") ;
    
        
        const data = await res.json() ;
        
        questions = data.results.map(loadedQuestion => {    
            let formattedQuestion ={
                question:loadedQuestion.question ,
            }
            let choicesArray = [...loadedQuestion.incorrect_answers] ;
            const correctAnswerIndex = Math.floor(Math.random() * 3 )  ; // index between 0 and 2
            
            choicesArray.splice(correctAnswerIndex,0,loadedQuestion.correct_answer) ;

            choicesArray.forEach((choice,index) => {
                formattedQuestion["choice"+(index+1)] = choice;
            })
            formattedQuestion["answer"]=correctAnswerIndex + 1 ;
            
            
            return formattedQuestion ;
        }) ;
        
    questionContainer.classList.remove('d-none') ;
    loader.classList.add('d-none') ;
    startGame() ;
    }catch(error){
        console.log(error);
        
    }
    

}
fetchData() ;

startGame = () =>{

    avialableQuestions = [...questions] ;
    score = 0 ;
    questionsCounter = 0  ;

        //  seting score into localStorage 
        // localStorage.setItem('mostRecentScore',score) ;
    getNewQuestion() ;
}


function getNewQuestion () {
        questionsCounter++ ;
    
        if(avialableQuestions.length === 0 ) {
            return window.location.assign('./end.html');
        }
    
    const currentQuestionIndex = Math.floor(Math.random()*avialableQuestions.length) ;
    
    currentQuestion = avialableQuestions[currentQuestionIndex] ;

    
    
    question.innerHTML = currentQuestion.question ;

    
    // choices of the question 
    choices.forEach ((choice) =>{
        const number = choice.dataset.number ;
        
        choice.innerHTML = currentQuestion["choice"+number] ;
        
    })
    avialableQuestions.splice(currentQuestionIndex,1);

    acceptingAnswers = true ;
    count.innerHTML = `${questionsCounter}/${MAX_QUESTIONS} ` ;
}




choices.forEach ((choice) => {

    choice.addEventListener('click',(e)=>{

        
        if(!acceptingAnswers) return ;

        if(e.target.dataset.number == currentQuestion.answer){            
            
        

            e.target.classList.add('bg-success') ;
            acceptingAnswers = false ; 

            // removing the red background
            setTimeout(() => {
                e.target.classList.remove('bg-success') ;
                

                // how much question left
                count.innerHTML = `${questionsCounter}/${MAX_QUESTIONS} ` ;
                
                    
                getNewQuestion() ;
            },1000) ;
            
            // Modify score
            score += CORRECT_ANSWER ;
            scoreFromDocument.innerHTML = score ;
            scoreFromDocument.classList.add('text-blue') ;
            
              // seting score into localStorage 
            localStorage.setItem('mostRecentScore',score) ;

        }else{
                // (e.target.dataset.number != currentQuestion.answer)

                // adding the two backgrounds red and green
                e.target.classList.add('bg-danger') ;
                choices[currentQuestion.answer -1].classList.add('bg-success')
                acceptingAnswers = false ;

                // removing the two backgrounds 
                setTimeout(() => {

                    e.target.classList.remove('bg-danger');
                    choices[currentQuestion.answer -1].classList.remove('bg-success') ;
                    
                    // how much question left
                    count.innerHTML = `${questionsCounter}/${MAX_QUESTIONS} ` ;
                    
                    // seting score into localStorage 
                    localStorage.setItem('mostRecentScore',score) ;

                    getNewQuestion() ;
                },1000) ;
        }
    
        
    })
})


let next =document.getElementById('next') ;

// next.addEventListener('click', (e) => {
        
//     e.preventDefault();
// })

