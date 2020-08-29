const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const scoreDisplay = document.getElementById('score')
var timeEl = document.querySelector(".time");
var secondsLeft = 60;
let score = 0
const correctScoreValue = 10

let shuffledQuestions, currentQuestionIndex

// TIMER CONTENT //

function setTime() {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = secondsLeft + " seconds left till game over";

    if(secondsLeft === 0) {
    clearInterval(timerInterval);
    openEndPage();
    }

    }, 1000);
}

function openEndPage() {
    window.location.replace('/end.html')
}

setTime();



// QUIZ CONTENT //

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide') // hides the start button //
    shuffledQuestions = questions.sort(() => Math.random() - .5) // picks a question //
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide') // makes the question visible //
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
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

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (selectedButton.dataset.correct) {
        incrementScore(correctScoreValue)
        console.log(score)
    }


    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        openEndPage()
        localStorage.setItem("mostRecentScore", score);
    }
}

function incrementScore(num) {
    score += num;
    scoreDisplay.innerText = score;
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

// Questions Object //

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
    }]
