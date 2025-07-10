let secretNumber;
let attemptsLeft;
let currentAttempts;
let highScore = null;

const guessInput = document.getElementById('guessInput');
const guessBtn = document.getElementById('guessBtn');
const playAgainBtn = document.getElementById('playAgainBtn');
const message = document.getElementById('message');
const highScoreSpan = document.getElementById('highScore');

function initializeGame() {
  secretNumber = Math.floor(Math.random() * 10) + 1;
  attemptsLeft = 3;
  currentAttempts = 0;
  guessBtn.disabled = false;
  playAgainBtn.style.display = 'none';
  message.textContent = "";
  guessInput.value = "";
  guessInput.disabled = false;
  message.classList.remove("fade");
}

function updateHighScore() {
  if (highScore === null || currentAttempts < highScore) {
    highScore = currentAttempts;
    highScoreSpan.textContent = highScore;
  }
}

guessBtn.addEventListener('click', function () {
  const guess = Number(guessInput.value);

  if (!guess || guess < 1 || guess > 10) {
    message.textContent = "⚠️ Please enter a number between 1 and 10.";
    message.style.color = "yellow";
    message.classList.add("fade");
    return;
  }

  attemptsLeft--;
  currentAttempts++;

  if (guess === secretNumber) {
    message.textContent = `🎉 Correct! You guessed it in ${currentAttempts} attempt(s)!`;
    message.style.color = "lime";
    guessBtn.disabled = true;
    guessInput.disabled = true;
    playAgainBtn.style.display = 'inline-block';
    updateHighScore();
  } else if (attemptsLeft > 0) {
    message.textContent = `❌ Wrong! You have ${attemptsLeft} tries left.`;
    message.style.color = "orange";
  } else {
    message.textContent = `💥 Game Over! The number was ${secretNumber}.`;
    message.style.color = "red";
    guessBtn.disabled = true;
    guessInput.disabled = true;
    playAgainBtn.style.display = 'inline-block';
  }

  message.classList.add("fade");
  guessInput.value = "";
});

playAgainBtn.addEventListener('click', initializeGame);

// Start the game initially
initializeGame();
