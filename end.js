
const restartButton = document.getElementById('restart-btn');
const saveButton = document.getElementById('save-btn');
const mostRecentScore = localStorage.getItem('mostRecentScore'); 
const finalScore = document.getElementById('final-score')
finalScore.innerText = mostRecentScore

restartButton.addEventListener('click', restartQuiz);

function restartQuiz() {
    window.location.replace('/index.html')
}