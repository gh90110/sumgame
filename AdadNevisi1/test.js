function numberToWords(number) {
    if (number === 0) return "صفر";
    const ones = ["", "یک", "دو", "سه", "چهار", "پنج", "شش", "هفت", "هشت", "نه"];
    const tens = ["", "", "بیست", "سی", "چهل", "پنجاه", "شصت", "هفتاد", "هشتاد", "نود"];
    const teens = ["ده", "یازده", "دوازده", "سیزده", "چهارده", "پانزده", "شانزده", "هفده", "هجده", "نوزده"];
    const hundreds = ["", "صد", "دویست", "سیصد", "چهارصد", "پانصد", "ششصد", "هفتصد", "هشتصد", "نهصد"];
    const scales = ["", "هزار", "میلیون", "میلیارد"];

    function convertGroup(num) {
        if (num === 0) return "";
        if (num < 10) return ones[num];
        if (num < 20) return teens[num - 10];
        if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? " و " + ones[num % 10] : "");
        return hundreds[Math.floor(num / 100)] + (num % 100 !== 0 ? " و " + convertGroup(num % 100) : "");
    }

    let result = [];
    let scaleIndex = 0;
    while (number > 0) {
        const group = number % 1000;
        if (group !== 0) {
            result.unshift(convertGroup(group) + (scaleIndex > 0 ? " " + scales[scaleIndex] : ""));
        }
        number = Math.floor(number / 1000);
        scaleIndex++;
    }

    return result.join(" و ").trim();
}

function generateRandomNumber(max) {
    return Math.floor(Math.random() * (max + 1));
}

// تابع تصادفی‌سازی آرایه با الگوریتم Fisher-Yates
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // انتخاب یک index تصادفی
        [array[i], array[j]] = [array[j], array[i]]; // جابجایی عناصر
    }
    return array;
}

function generateQuestion() {
    const randomNumber = generateRandomNumber(999999);
    //const isNumberToWord = Math.random() > 0.5;
    const isNumberToWord = 1;
    const questionDiv = document.getElementById('question');
    const answerAreaDiv = document.getElementById('answer-area');
    answerAreaDiv.innerHTML = '';
    let correctAnswer;
    let questionString;

    if (isNumberToWord) {
        questionString = randomNumber;
        correctAnswer = numberToWords(randomNumber);
        questionDiv.textContent = questionString;

        const answers = [
            correctAnswer,
            numberToWords(Math.floor(randomNumber / 100)),
            numberToWords(Math.floor(randomNumber / 10)),
            numberToWords(Math.floor(randomNumber * 10))
        ];

        // تصادفی‌سازی آرایه answers با الگوریتم Fisher-Yates
        const shuffledAnswers = shuffleArray(answers);

        shuffledAnswers.forEach(option => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('option');
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => {
                checkAnswer(option, correctAnswer);
            });
            answerAreaDiv.appendChild(optionElement);
        });
        return;
    }

    questionString = numberToWords(randomNumber);
    correctAnswer = randomNumber;
    questionDiv.textContent = questionString;
    const inputElement = document.createElement('input');
    inputElement.type = "number";
    inputElement.placeholder = "عدد را وارد کنید";
    answerAreaDiv.appendChild(inputElement);
    return;
}

function checkAnswer(userAnswer, correctAnswer) {
    const feedbackDiv = document.getElementById('feedback');
    const scoreDiv = document.getElementById('score');
    let currentScore = parseInt(localStorage.getItem('score') || '0');
    let isCorrect = false;
    if (typeof correctAnswer === 'number') {
        isCorrect = parseInt(userAnswer) === correctAnswer;
    } else {
        isCorrect = userAnswer === correctAnswer;
    }

    if (isCorrect) {
        feedbackDiv.textContent = "پاسخ صحیح است!";
        feedbackDiv.style.color = "green";
        currentScore++;
    } else {
        feedbackDiv.textContent = "پاسخ اشتباه است.";
        feedbackDiv.style.color = "red";
    }

    localStorage.setItem('score', currentScore);
    scoreDiv.textContent = "امتیاز: " + currentScore;
    setTimeout(() => {
        generateQuestion();
        feedbackDiv.textContent = '';
    }, 1500);
}

document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submitButton');
    const feedbackDiv = document.getElementById('feedback');
    const scoreDiv = document.getElementById('score');
    const backButton = document.getElementById('backButton');
    scoreDiv.textContent = "امتیاز: " + (localStorage.getItem('score') || '0');

    generateQuestion();

    submitButton.addEventListener('click', () => {
        const answerArea = document.getElementById('answer-area');
        const inputElement = answerArea.querySelector('input');
        const questionDiv = document.getElementById('question');
        if (inputElement) {
            checkAnswer(inputElement.value, parseInt(questionDiv.textContent));
        }
    });

    backButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});