// Utility function to convert numbers to words
function numberToWords(number) {
    const units = ['', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'];
    const teens = ['ده', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده'];
    const tens = ['', '', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'];
    const scales = ['', 'هزار', 'میلیون', 'میلیارد'];

    function convertThreeDigits(num) {
        if (num === 0) return '';
        
        const [hundreds, rest] = [Math.floor(num / 100), num % 100];
        let result = hundreds > 0 ? units[hundreds] + ' صد ' : '';
        
        if (rest === 0) return result.trim();
        
        if (rest < 10) {
            result += (result ? ' و ' : '') + units[rest];
        } else if (rest < 20) {
            result += (result ? ' و ' : '') + teens[rest - 10];
        } else {
            const [ten, unit] = [Math.floor(rest / 10), rest % 10];
            result += (result ? ' و ' : '') + tens[ten];
            if (unit > 0) {
                result += ' و ' + units[unit];
            }
        }
        
        return result.trim();
    }

    if (number === 0) return 'صفر';
    
    let result = '';
    let remainingNumber = Math.abs(number);
    let scaleIndex = 0;
    
    while (remainingNumber > 0) {
        const threeDigits = remainingNumber % 1000;
        if (threeDigits !== 0) {
            const threeDigitWord = convertThreeDigits(threeDigits);
            result = threeDigitWord + (scales[scaleIndex] ? ' ' + scales[scaleIndex] : '') + 
                     (result ? ' ' + result : '');
        }
        
        remainingNumber = Math.floor(remainingNumber / 1000);
        scaleIndex++;
    }
    
    return number < 0 ? 'منفی ' + result : result;
}

// Utility function to convert words to numbers
function wordsToNumber(words) {
    const wordToNumberMap = {
        'صفر': 0, 'یک': 1, 'دو': 2, 'سه': 3, 'چهار': 4, 'پنج': 5, 
        'شش': 6, 'هفت': 7, 'هشت': 8, 'نه': 9, 'ده': 10,
        'یازده': 11, 'دوازده': 12, 'سیزده': 13, 'چهارده': 14, 
        'پانزده': 15, 'شانزده': 16, 'هفده': 17, 'هجده': 18, 'نوزده': 19,
        'بیست': 20, 'سی': 30, 'چهل': 40, 'پنجاه': 50, 
        'شصت': 60, 'هفتاد': 70, 'هشتاد': 80, 'نود': 90,
        'صد': 100, 'هزار': 1000, 'میلیون': 1000000, 'میلیارد': 1000000000
    };

    const cleanWords = words.replace(/\s+/g, ' ').trim().split(' ');
    let total = 0;
    let currentNumber = 0;

    for (let i = 0; i < cleanWords.length; i++) {
        const word = cleanWords[i];
        const value = wordToNumberMap[word];

        if (value === undefined) {
            return null; // Invalid word
        }

        if (value === 100) {
            currentNumber = (currentNumber || 1) * 100;
        } else if (value === 1000 || value === 1000000 || value === 1000000000) {
            currentNumber = currentNumber || 1;
            total += currentNumber * value;
            currentNumber = 0;
        } else if (value >= 1 && value <= 19) {
            currentNumber += value;
        } else if (value >= 20 && value <= 90) {
            currentNumber += value;
        }
    }

    return total + currentNumber;
}

// Game variables
let currentLevel = null;
let currentMode = null;
let currentNumber = null;
let score = 0;
let totalQuestions = 0;

// Generate a random number based on level
function generateNumber(digits) {
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Start game for a specific level
function startGame(level) {
    currentLevel = level;
    document.getElementById('level-selection').style.display = 'none';
    document.getElementById('mode-selection').style.display = 'block';
}

// Select game mode
function selectMode(mode) {
    currentMode = mode;
    document.getElementById('mode-selection').style.display = 'none';
    document.getElementById('game-section').style.display = 'block';
    
    // Set game title
    const gameTitle = document.getElementById('game-title');
    gameTitle.textContent = mode === 'number_to_words' 
        ? 'تبدیل عدد به کلمه' 
        : 'تبدیل کلمه به عدد';

    // Determine number of digits based on level
    const digits = currentLevel === 'third' ? 6 : 
                   currentLevel === 'fourth' ? 9 : 12;

    // Generate first number
    currentNumber = generateNumber(digits);

    // Display challenge
    const challengeElement = document.getElementById('challenge');
    challengeElement.textContent = currentMode === 'number_to_words' 
        ? currentNumber 
        : numberToWords(currentNumber);

    // Reset score
    score = 0;
    totalQuestions = 0;
    updateScoreDisplay();
}

// Check user's answer
function checkAnswer() {
    const userInput = document.getElementById('user-input').value.trim();
    let correct = false;

    if (currentMode === 'number_to_words') {
        correct = userInput === numberToWords(currentNumber);
    } else if (currentMode === 'words_to_number') {
        correct = wordsToNumber(userInput) === currentNumber;
    }

    // Update score
    if (correct) {
        score++;
    }
    totalQuestions++;
    updateScoreDisplay();

    // Generate new number based on current level
    const digits = currentLevel === 'third' ? 6 : 
                   currentLevel === 'fourth' ? 9 : 12;
    currentNumber = generateNumber(digits);

    // Update challenge
    const challengeElement = document.getElementById('challenge');
    challengeElement.textContent = currentMode === 'number_to_words' 
        ? currentNumber 
        : numberToWords(currentNumber);

    // Clear input
    document.getElementById('user-input').value = '';
}

// Update score display
function updateScoreDisplay() {
    document.getElementById('score-value').textContent = score;
    document.getElementById('total-questions').textContent = totalQuestions;
}

// Reset to level selection
function resetToLevelSelection() {
    document.getElementById('game-section').style.display = 'none';
    document.getElementById('mode-selection').style.display = 'none';
    document.getElementById('level-selection').style.display = 'block';
    
    // Reset game state
    currentLevel = null;
    currentMode = null;
    currentNumber = null;
    score = 0;
    totalQuestions = 0;
}