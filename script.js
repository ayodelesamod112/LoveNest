
"use strict";

// ======================================
// 1. FLOATING HEARTS
// ======================================

const heartsContainer = document.getElementById("hearts-container");

function createHeart() {
    if (!heartsContainer) return;

    const heart = document.createElement("span");

    heart.className = "heart";
    heart.textContent = "♥";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (15 + Math.random() * 20) + "px";
    heart.style.animationDuration = (4 + Math.random() * 3) + "s";

    heartsContainer.appendChild(heart);

    heart.addEventListener("animationend", function () {
        heart.remove();
    });
}

if (heartsContainer) {
    setInterval(createHeart, 1200);
}


// ======================================
// 2. SURPRISE MESSAGE
// ======================================

const surpriseButton = document.getElementById("surprise-button");
const surpriseMessage = document.getElementById("surprise-message");

if (surpriseButton && surpriseMessage) {

    surpriseButton.addEventListener("click", function () {

        surpriseMessage.classList.toggle("hidden");

        const isHidden = surpriseMessage.classList.contains("hidden");

        surpriseButton.textContent = isHidden
            ? "Open Your Surprise ♥"
            : "Close Your Surprise ♥";

    });

}


// ======================================
// 3. LOVE QUIZ
// ======================================

const questions = [
    {
        question: "What makes beautiful memories special?",
        options: [
            "Kindness and care",
            "Expensive gifts",
            "Being famous"
        ],
        answer: 0
    },

    {
        question: "Which helps build a strong relationship?",
        options: [
            "Dishonesty",
            "Trust and respect",
            "Ignoring each other"
        ],
        answer: 1
    },

    {
        question: "What is a thoughtful way to appreciate someone?",
        options: [
            "Never listening",
            "Taking someone for granted",
            "Showing kindness"
        ],
        answer: 2
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("quiz-options");
const resultElement = document.getElementById("quiz-result");
const nextButton = document.getElementById("next-question");

function showQuestion() {

    answered = false;

    const question = questions[currentQuestion];

    questionElement.textContent = question.question;

    optionsContainer.innerHTML = "";

    resultElement.textContent = "";

    nextButton.style.display = "none";

    question.options.forEach(function (option, index) {

        const button = document.createElement("button");

        button.textContent = option;

        button.className = "quiz-option";

        button.addEventListener("click", function () {
            checkAnswer(index);
        });

        optionsContainer.appendChild(button);

    });

}

function checkAnswer(selectedAnswer) {

    if (answered) return;

    answered = true;

    const correctAnswer = questions[currentQuestion].answer;

    const buttons = optionsContainer.querySelectorAll("button");

    buttons.forEach(function (button) {
        button.disabled = true;
    });

    if (selectedAnswer === correctAnswer) {

        score++;

        resultElement.textContent = "Correct answer! Well done! 💗";

    } else {

        resultElement.textContent =
            "Incorrect. The correct answer is: " +
            questions[currentQuestion].options[correctAnswer];

    }

    nextButton.style.display = "inline-block";

}

function showResult() {

    questionElement.textContent = "Quiz Completed! 🎉";

    optionsContainer.innerHTML = "";

    resultElement.textContent =
        "Your score is " + score + " out of " + questions.length + "!";

    nextButton.textContent = "Play Again";

    nextButton.style.display = "inline-block";

}

if (questionElement && optionsContainer && resultElement && nextButton) {

    showQuestion();

    nextButton.addEventListener("click", function () {

        if (currentQuestion < questions.length - 1) {

            currentQuestion++;

            showQuestion();

        } else if (currentQuestion === questions.length - 1) {

            currentQuestion++;

            showResult();

        } else {

            currentQuestion = 0;

            score = 0;

            nextButton.textContent = "Next Question";

            showQuestion();

        }

    });

}


// ======================================
// 4. LOVE COUNTER
// ======================================

const dateInput = document.getElementById("special-date");

function updateCounter() {

    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
        return;
    }

    if (!dateInput || !dateInput.value) {
        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";
        return;
    }

    const startDate = new Date(dateInput.value + "T00:00:00");
    const now = new Date();

    const difference = now.getTime() - startDate.getTime();

    if (difference < 0 || isNaN(difference)) {
        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";
        return;
    }

    const totalSeconds = Math.floor(difference / 1000);

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    daysElement.textContent = days;
    hoursElement.textContent = hours;
    minutesElement.textContent = minutes;
    secondsElement.textContent = seconds;

}

if (dateInput) {

    dateInput.addEventListener("change", updateCounter);

    updateCounter();

    setInterval(updateCounter, 1000);

}


// ======================================
// 5. PHOTO GALLERY
// ======================================

const galleryImages = document.querySelectorAll(".gallery-item img");

galleryImages.forEach(function (image) {

    image.style.cursor = "pointer";

    image.addEventListener("click", function () {

        const popup = document.createElement("div");

        popup.style.cssText = `
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            cursor: pointer;
            padding: 20px;
        `;

        const enlargedImage = document.createElement("img");

        enlargedImage.src = image.src;
        enlargedImage.alt = image.alt;

        enlargedImage.style.cssText = `
            max-width: 90%;
            max-height: 85vh;
            object-fit: contain;
            border-radius: 12px;
        `;

        popup.appendChild(enlargedImage);

        document.body.appendChild(popup);

        popup.addEventListener("click", function () {
            popup.remove();
        });

    });

});


// ======================================
// 6. WEBSITE READY
// ======================================

console.log("LoveNest JavaScript loaded successfully! 💗");
