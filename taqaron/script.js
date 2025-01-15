const gameBoard = document.getElementById('game-board');
const startButton = document.getElementById('start-button');
const scoreDisplay = document.getElementById('score');
const timeSelect = document.getElementById('time-select');
const timerDisplay = document.getElementById('timer');
const errorMessage = document.getElementById('error-message');

let board = [];
let score = 0;
let coloredCell = null;
let symmetryCell = null;
let gameTimer;
let timeLeft;

function createBoard() {
    board = [];
    gameBoard.innerHTML = "";
    for (let i = 0; i < 8; i++) {
        const row = document.createElement('tr');
        const rowArray = [];
        for (let j = 0; j < 10; j++) {
            const cell = document.createElement('td');
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', handleCellClick);
            row.appendChild(cell);
            rowArray.push(cell);
        }
        board.push(rowArray);
        gameBoard.appendChild(row);
    }
}

function getRandomCell() {
    const row = Math.floor(Math.random() * 8);
    const col = Math.floor(Math.random() * 10);
    return [row, col];
}

function getColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getSymmetryCell(row, col) {
    const symmetryCol = 9 - col;
    return [row, symmetryCol];
}

function selectRandomCell() {
    coloredCell = null;
    symmetryCell = null;
    const [row, col] = getRandomCell();
    const color = getColor();
    coloredCell = [row, col];
    symmetryCell = getSymmetryCell(row, col);
    board[row][col].style.backgroundColor = color;
}


function handleCellClick(event) {
    const clickedCell = event.target;
    const row = parseInt(clickedCell.dataset.row);
    const col = parseInt(clickedCell.dataset.col);

    if (coloredCell && row === symmetryCell[0] && col === symmetryCell[1]) {
        board[row][col].style.backgroundColor = board[coloredCell[0]][coloredCell[1]].style.backgroundColor;
        score += 10;
        scoreDisplay.textContent = score;
        selectRandomCell();
    } else {
        showError();
    }
}

function showError() {
    errorMessage.style.display = 'block';
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 1000);
}

function startGame() {
    const selectedTime = parseInt(timeSelect.value, 10);
    timeLeft = selectedTime;
    timerDisplay.textContent = formatTime(timeLeft);
    score = 0;
    scoreDisplay.textContent = score;
    clearInterval(gameTimer);
    createBoard();
    selectRandomCell();

    gameTimer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = formatTime(timeLeft);
        if (timeLeft <= 0) {
            clearInterval(gameTimer);
            alert(`زمان بازی تمام شد! امتیاز شما: ${score}`);
        }
    }, 1000);
}


function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

startButton.addEventListener('click', startGame);

