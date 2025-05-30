const textToTypeElem = document.getElementById('textToType');
const inputArea = document.getElementById('inputArea');
const timeElem = document.getElementById('time');
const wpmElem = document.getElementById('wpm');
const accuracyElem = document.getElementById('accuracy');
const startBtn = document.getElementById('startBtn');

const testDuration = 60; // seconds
let timer = null;
let timeLeft = testDuration;
let totalCharsTyped = 0;
let correctCharsTyped = 0;
let testStarted = false;

const texts = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing speed tests are a great way to improve your keyboard skills.",
  "Practice makes perfect, so keep on typing and improving!",
  "JavaScript powers interactive web pages and web applications.",
  "Consistency and patience are key to mastering programming."
];

let currentText = "";

function startTest() {
  // Reset everything
  timeLeft = testDuration;
  totalCharsTyped = 0;
  correctCharsTyped = 0;
  testStarted = true;
  inputArea.value = "";
  inputArea.disabled = false;
  inputArea.focus();
  wpmElem.textContent = 0;
  accuracyElem.textContent = 100;
  timeElem.textContent = timeLeft;

  // Pick random text
  currentText = texts[Math.floor(Math.random() * texts.length)];
  textToTypeElem.textContent = currentText;

  startBtn.disabled = true;

  timer = setInterval(() => {
    timeLeft--;
    timeElem.textContent = timeLeft;
    if (timeLeft <= 0) {
      endTest();
    }
  }, 1000);
}

function endTest() {
  clearInterval(timer);
  testStarted = false;
  inputArea.disabled = true;
  startBtn.disabled = false;
  alert(`Time's up!\nYour WPM: ${calculateWPM()}\nAccuracy: ${calculateAccuracy()}%`);
}

function calculateWPM() {
  // WPM is words per minute, assuming 5 chars per word
  return Math.round((correctCharsTyped / 5) / ((testDuration - timeLeft) / 60));
}

function calculateAccuracy() {
  if (totalCharsTyped === 0) return 100;
  return Math.round((correctCharsTyped / totalCharsTyped) * 100);
}

inputArea.addEventListener('input', () => {
  if (!testStarted) return;

  const input = inputArea.value;
  totalCharsTyped = input.length;

  // Count correct chars
  let correct = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === currentText[i]) correct++;
  }
  correctCharsTyped = correct;

  wpmElem.textContent = calculateWPM();
  accuracyElem.textContent = calculateAccuracy();
});

startBtn.addEventListener('click', startTest);
