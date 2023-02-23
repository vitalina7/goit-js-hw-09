const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
stopBtn.disabled = true;
let timerId = null;

startBtn.addEventListener('click', changeBodyColor);
stopBtn.addEventListener('click', stopChangeColor);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBodyColor() {
  stopBtn.disabled = true;
  stopBtn.disabled = false;
  timerId = setInterval(() => {
    document.body.style.background = getRandomHexColor();
  },1000)
  }

function stopChangeColor() {
clearInterval(timerId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
};

