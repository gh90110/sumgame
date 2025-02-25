// const grid = document.getElementById('grid');
  const targetNumberDisplay = document.getElementById('target-number');
  const scoreDisplay = document.getElementById('score');
  const timerDisplay = document.getElementById('timer');
  const resetButton = document.getElementById('reset-button');
  const timeSelect = document.getElementById('time-select');
  let targetNumber;
  let selectedCells = [];
  let score = 0;
  let timeRemaining = 120; // Default 2 minutes
  let timerInterval;

  function generateGrid() {
      grid.innerHTML = '';
      selectedCells = [];
      score = 0; // Reset score to zero
      scoreDisplay.textContent = `امتیاز: ${score}`; // Update score display
      const numbers = Array.from({ length: 64 }, () => Math.floor(Math.random() * 10));
      numbers.forEach((number) => {
          const cell = document.createElement('div');
          cell.classList.add('cell');
          cell.textContent = number;
          cell.dataset.value = number;
          cell.addEventListener('click', () => selectCell(cell));
          grid.appendChild(cell);
      });
      generateTargetNumber();
      startTimer();
  }

  function generateTargetNumber() {
    //targetNumber = Math.floor(Math.random() * 20) + 1;// خط قبلی که حذف کردم 
  //  targetNumber = getRandomEvenInRange(10, 26);// خط جدید که اضافه کردم 
    targetNumber =7;// خط جدید که اضافه کردم 
      targetNumberDisplay.textContent = `عدد هدف: ${targetNumber}`;

    }

   function getRandomEvenInRange(min, max) {
      let randomNum;
      do {
        randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
         } while (randomNum % 2 !== 0); // تا زمانی که عدد زوج نباشد ادامه بده
               return randomNum;
    }
  

  function selectCell(cell) {
      if (selectedCells.includes(cell)) {
          cell.classList.remove('selected');
          selectedCells = selectedCells.filter(selected => selected !== cell);
      } else {
          selectedCells.push(cell);
          cell.classList.add('selected');
      }
      checkSum();
  }

  function checkSum() {
      const sum = selectedCells.reduce((acc, cell) => acc + parseInt(cell.dataset.value), 0);
      if (sum === targetNumber) {
          selectedCells.forEach(cell => {
              cell.classList.add('correct'); // Change color for correct answer
              cell.textContent = ''; // Hide the number
          });
          score += 10; // Add points for correct sum
          scoreDisplay.textContent = `امتیاز: ${score}`;
          selectedCells = [];
          generateTargetNumber(); // Generate a new target number
      } else if (sum > targetNumber) {
          selectedCells.forEach(cell => {
              cell.classList.remove('selected'); // Remove selection
          });
          selectedCells = []; // Clear selected cells
      }
  }

  function startTimer() {
      timeRemaining = parseInt(timeSelect.value); // Set time based on user selection
      timerDisplay.textContent = `زمان باقی‌مانده: ${timeRemaining} ثانیه`;
      clearInterval(timerInterval);
      timerInterval = setInterval(() => {
          timeRemaining--;
          timerDisplay.textContent = `زمان باقی‌مانده: ${timeRemaining} ثانیه`;
          if (timeRemaining <= 0) {
              clearInterval(timerInterval);
              alert('زمان تمام شد!'); // Alert when time is up
              generateGrid(); // Restart game
          }
      }, 1000);
  }

  resetButton.addEventListener('click', generateGrid);
  timeSelect.addEventListener('change', generateGrid);
  generateGrid(); // Initialize the game on load
  // deploy trigger