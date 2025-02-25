// script.js
let patterns = [
    { pattern: "1, 2, 3, 4, ?", answer: 5 },
    { pattern: "2, 4, 6, 8, ?", answer: 10 },
    { pattern: "1, 3, 5, 7, ?", answer: 9 },
    // ...
];

let currentPattern = 0;
let score = 0;

document.getElementById("pattern").innerHTML = patterns[currentPattern].pattern;

document.getElementById("submit").addEventListener("click", () => {
    let answer = parseInt(document.getElementById("answer").value);
    if (answer === patterns[currentPattern].answer) {
        score++;
        document.getElementById("result").innerHTML = "پاسخ صحیح!";
    } else {
        document.getElementById("result").innerHTML = "پاسخ غلط!";
    }
    document.getElementById("score").innerHTML = `امتیاز: ${score}`;
    currentPattern++;
    if (currentPattern >= patterns.length) {
        currentPattern = 0;
    }
    document.getElementById("pattern").innerHTML = patterns[currentPattern].pattern;
    document.getElementById("answer").value = "";
});
// script.js
let patterns = [
    { pattern: "1, 2, 3, 4, ?", answer: 5, level: 1 },
    { pattern: "2, 4, 6, 8, ?", answer: 10, level: 1 },
    { pattern: "1, 3, 5, 7, ?", answer: 9, level: 1 },
    { pattern: "1, 2, 4, 8, 16, ?", answer: 32, level: 2 },
    { pattern: "2, 6, 12, 20, ?", answer: 30, level: 2 },
    // ...
];

let currentLevel = 1;
let currentPattern = 0;
let score = 0;

document.getElementById("pattern").innerHTML = patterns[currentPattern].pattern;

document.getElementById("submit").addEventListener("click", () => {
    let answer = parseInt(document.getElementById("answer").value);
    if (answer === patterns[currentPattern].answer) {
        score++;
        document.getElementById("result").innerHTML = "پاسخ صحیح!";
    } else {
        document.getElementById("result").innerHTML = "پاسخ غلط!";
    }
    document.getElementById("score").innerHTML = `امتیاز: ${score}`;
    currentPattern++;
    if (currentPattern >= patterns.length) {
        currentPattern = 0;
        currentLevel++;
    }
    document.getElementById("pattern").innerHTML = patterns[currentPattern].pattern;
    document.getElementById("answer").value = "";
});