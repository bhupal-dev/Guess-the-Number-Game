const input = document.querySelector('#guessInput');
const guessBtn = document.querySelector('#guessBtn');
const againBtn = document.querySelector('#playAgainBtn');
const message = document.querySelector('#message');
const highScoreEl = document.querySelector('#highScore');

let secret;
let attempts;
let best = Number(localStorage.getItem('guess-best')) || null;

function startGame() {
  secret = Math.floor(Math.random() * 10) + 1;
  attempts = 0;
  input.value = '';
  input.disabled = false;
  guessBtn.disabled = false;
  againBtn.hidden = true;
  message.textContent = 'Make your first guess.';
  highScoreEl.textContent = best ?? '—';
  input.focus();
}

function checkGuess() {
  const guess = Number(input.value);
  if (!Number.isInteger(guess) || guess < 1 || guess > 10) {
    message.textContent = 'Enter a whole number from 1 to 10.';
    return;
  }
  attempts += 1;
  if (guess === secret) {
    if (best === null || attempts < best) {
      best = attempts;
      localStorage.setItem('guess-best', String(best));
    }
    message.textContent = `Correct. You found it in ${attempts} attempt${attempts === 1 ? '' : 's'}.`;
    input.disabled = true;
    guessBtn.disabled = true;
    againBtn.hidden = false;
    highScoreEl.textContent = best;
  } else {
    message.textContent = guess < secret ? 'Too low. Try again.' : 'Too high. Try again.';
    input.select();
  }
}

guessBtn.addEventListener('click', checkGuess);
againBtn.addEventListener('click', startGame);
input.addEventListener('keydown', event => {
  if (event.key === 'Enter') checkGuess();
});

startGame();
