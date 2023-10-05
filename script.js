const quizQuestions = [
    {
        question: "Question 1: What year was the Great Chicago Fire?",
        choices: ["1863", "1869", "1871", "1893"],
        correctAnswer: "1871"
    },
    {
        question: "Question 2: Who was the first black mayor of Chicago?",
        choices: ["Barack Obama", "Harold Washington", "Lori Lightfoot", "Fred Hampton"],
        correctAnswer: "Harold Washington"
    },
    {
        question: "Question 3: Chicago's downtown area is known as what?",
        choices: ["Downtown", "Ye Olde Chicago", "Uptown", "The Loop"],
        correctAnswer: "The Loop"
    },
    {
        question: "Question 4: What year was Chicago Founded?",
        choices: ["1837", "1839", "1846", "1849"],
        correctAnswer: "1837"
    }
];

let currentQuestionIndex = 0;
let time = 60;
let timerId;
let highScores = [];

const startBtn = document.getElementById("start-btn");
const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const timeElement = document.getElementById("time");
const gameOverElement = document.getElementById("game-over");
const initialsInput = document.getElementById("initials");
const scoreForm = document.getElementById("score-form");
const scoresListElement = document.getElementById("scores-list");
const highScoresElement = document.getElementById("high-scores");

startBtn.addEventListener("click", startQuiz);
scoreForm.addEventListener("submit", saveScore);

function startQuiz() {
    startBtn.disabled = true;
    timerId = setInterval(updateTimer, 1000);
  
    displayQuestion(); 
}

function displayQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    choicesElement.innerHTML = "";
  
    currentQuestion.choices.forEach(function (choice) {
      const Item = document.createElement("li");
      Item.textContent = choice;
      Item.addEventListener("click", checkAnswer);
      Item.classList.add("answer-choice"); 
      choicesElement.appendChild(Item);
    });
}

function checkAnswer(event) {
    const selectedChoice = event.target;
    const selectedAnswer = selectedChoice.textContent;
    const currentQuestion = quizQuestions[currentQuestionIndex];
  
    if (selectedAnswer === currentQuestion.correctAnswer) {
      currentQuestionIndex++;
      if (currentQuestionIndex === quizQuestions.length) {
        endQuiz();
      } else {
        displayQuestion();
      }
    } else {
      time -= 10;
      if (time < 0) { 
        time = 0;
      }
      currentQuestionIndex++;
      if (currentQuestionIndex === quizQuestions.length) {
        endQuiz();
      } else {
        displayQuestion();
      }
    }
}

function updateTimer() {
    time--;
    if (time <= 0) {
      time = 0;
      endQuiz();
    }
    timeElement.textContent = time;
}

function endQuiz() {
    clearInterval(timerId);
    questionElement.textContent = "";
    choicesElement.innerHTML = "";
    timeElement.textContent = "0";
    gameOverElement.style.display = "block";
    highScoresElement.style.display = "block";
    displayHighScores();
}

function saveScore(event) { 
    event.preventDefault(); 
    const initials = initialsInput.value;
    const score = time;
  
    const scoreEntry = { initials, score };
    highScores.push(scoreEntry);

    displayHighScores();
}

function displayHighScores() {
    scoresListElement.innerHTML = "";
  
    for (let i = 0; i < highScores.length; i++) {
      const scoreEntry = highScores[i];
      const scoreItem = document.createElement("li");
      scoreItem.textContent = `${scoreEntry.initials}: ${scoreEntry.score}`;
      scoresListElement.appendChild(scoreItem);
    }
}