
let scoresTable =document.getElementById('scoresTable') ;

const highScores = JSON.parse(localStorage.getItem('scores')) ;
console.log(highScores);

for(score of highScores){
    scoresTable.innerHTML +=`<tr><td>${score.username} </td> <td> ${score.score}</td></tr>`
}
