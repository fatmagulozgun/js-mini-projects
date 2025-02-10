const questions = [
    {
        question: "Türkiye'nin başkenti neresidir?",
        answers: ["İstanbul", "Ankara", "İzmir", "Bursa"],
        correct: 1
    },
    {
        question: "Hangi gezegen Güneş Sisteminin en büyük gezegenidir?",
        answers: ["Mars", "Venüs", "Jüpiter", "Satürn"],
        correct: 2
    },
    {
        question: "İnsan vücudundaki en büyük organ hangisidir?",
        answers: ["Kalp", "Beyin", "Akciğer", "Deri"],
        correct: 3
    },
    {
        question: "Hangi element periyodik tabloda 'Fe' sembolü ile gösterilir?",
        answers: ["Demir", "Flor", "Fosfor", "Fermiyum"],
        correct: 0
    },
    {
        question: "Dünya'nın uydusu hangisidir?",
        answers: ["Mars", "Ay", "Güneş", "Venüs"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById('question');
const answerButtons = document.querySelectorAll('.answer-btn');
const questionNumberEl = document.getElementById('questionNumber');
const totalQuestionsEl = document.getElementById('totalQuestions');
const scoreEl = document.getElementById('score');
const resultEl = document.getElementById('result');
const finalScoreEl = document.getElementById('final-score');
const restartBtn = document.getElementById('restart-btn');
const questionContainer = document.getElementById('question-container');

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    resultEl.classList.add('hide');
    questionContainer.classList.remove('hide');
    totalQuestionsEl.textContent = questions.length;
    showQuestion();
}

function showQuestion() {
    resetState();
    let question = questions[currentQuestion];
    questionNumberEl.textContent = currentQuestion + 1;
    questionEl.textContent = question.question;
    
    question.answers.forEach((answer, index) => {
        answerButtons[index].textContent = answer;
        answerButtons[index].addEventListener('click', () => selectAnswer(index));
    });
}

function resetState() {
    answerButtons.forEach(button => {
        button.classList.remove('correct', 'wrong');
        button.disabled = false;
    });
}

function selectAnswer(index) {
    const correct = questions[currentQuestion].correct;
    
    answerButtons.forEach(button => {
        button.disabled = true;
    });

    if (index === correct) {
        answerButtons[index].classList.add('correct');
        score += 20;
        scoreEl.textContent = score;
    } else {
        answerButtons[index].classList.add('wrong');
        answerButtons[correct].classList.add('correct');
    }

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 1500);
}

function showResult() {
    questionContainer.classList.add('hide');
    resultEl.classList.remove('hide');
    finalScoreEl.textContent = score;
}

restartBtn.addEventListener('click', startQuiz);

startQuiz();