const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const quizContainer = document.getElementById('quiz-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const scoreDisplay = document.getElementById('score');
var timerEl = document.querySelector(".time");
const endContainer = document.getElementById('end-container');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const finalScore = document.getElementById('final-score');
const initialsInput = document.getElementById('initalsInput');
const initialsButton = document.getElementById('initials-btn');
finalScore.innerText = mostRecentScore
var secondsLeft = 10;
let score = 0
let userInitials = ""
let leaderboard = [];
var initialsDisplay = document.getElementById('final-initials');
let shuffledQuestions, currentQuestionIndex

// Questions object //

const questions = [
    {
        question: 'What makes up most of the mass in our solar system?',
        answers: [
            { text: 'The Sun', correct: true },
            { text: 'The Planets', correct: false }
        ]
    },
    {
        question: 'Which planet is home to the solar systems tallest volcano?',
        answers: [
            { text: 'Earth', correct: false },
            { text: 'Mars', correct: true },
            { text: 'Mercury', correct: false },
            { text: 'Saturn', correct: false }
        ]
    },
    {
        question: 'Which planet is home to the solar systems tallest volcano?',
        answers: [
            { text: 'Earth', correct: false },
            { text: 'Mars', correct: true },
            { text: 'Mercury', correct: false },
            { text: 'Saturn', correct: false }
        ]
    },
    {
        question: 'How many times could Earth fit inside Jupiter?',
        answers: [
            { text: '400', correct: false },
            { text: '1,200', correct: false },
            { text: '1,000', correct: true },
            { text: '10,000', correct: false }
        ]
    },
    {
        question: 'Which planet is the coldest?',
        answers: [
            { text: 'Pluto', correct: false },
            { text: 'Neptune', correct: false },
            { text: 'Jupiter', correct: false },
            { text: 'Uranus', correct: true }
        ]
    },
    {
        question: 'How many "Earth-years" does it take for Neptune to orbit the Sun?',
        answers: [
            { text: '15', correct: false },
            { text: '301', correct: false },
            { text: '89', correct: false },
            { text: '165', correct: true }
        ]
    }
]

//sets the timer for game
function setTime(){
    timerInterval = setInterval(function(){
    secondsLeft--;
    timerEl.textContent = secondsLeft;

    if(secondsLeft > 30){
        timerEl.setAttribute("class", "green-time");
    } else if(secondsLeft < 15) {
        timerEl.setAttribute("class", "red-time");
    } else {
        timerEl.setAttribute("class", "red-time");
    }

    if(secondsLeft === 0) {
        clearInterval(timerInterval);
        openEndContainer();
    }
}, 1000);
}

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    setTime();
    startButton.classList.add('hide') // hides the start button //
    shuffledQuestions = questions.sort(() => Math.random() - .5) // picks a question //
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide') // makes the question visible //
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
    scoreDisplay.innerText = "Your Score: " + score;
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })

}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

// this runs when an answer button is clicked //
// increment score here instead of above // if correct, increment. 
function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        openEndContainer();
    }
    if (correct) {
        score = score + 10;
    }
}

// Select right and wrong classes on answers //
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

// Clear right and wrong classes on answers //
function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

// open end container and hide quiz container //
function openEndContainer() {
    endContainer.classList.remove('hide');
    quizContainer.classList.add('hide');
    finalScore.textContent = score;
    generateTable();
}

// Initials local storage //

initialsButton.addEventListener('click', initialsFunction)

function initialsFunction() {
    if (initialsInput.value.length < 1) return;
    initialsInput.innerHTML += '<li>' + initialsInput.value + '</li>';
    
    // Save the list to localStorage
    localStorage.setItem('recentInitials', initialsInput.value);
    console.log(initialsInput.value);
    var saved = localStorage.getItem('recentInitials');

    // If there are any saved items, update our list
    if (saved) {
        initialsDisplay.innerHTML = saved;

        // Clear input
        initialsInput.value = '';
    }
}

// loads all previous scores saved //
// just list top scores //

getScores();
function getScores() {
    var storedScores = JSON.parse(localStorage.getItem("leaderboard"));

    if (storedScores !== null) {
        leaderboard = storedScores;
    }
};


generateTable();
function generateTable() {
    // let rows = "<tbody>";
    // for (i = 0; i < leaderboard.length; i++) {
    //     rows += "<tr>";
    //     rows += "<td>" + leaderboard[i].totalScore + "</td>";
    //     rows += "</tr>";
    // }
    // rows += "</tbody>";
    document.getElementById("tableData").innerHTML = rows;
};

// score automatically starts at 10 and not 0? //
