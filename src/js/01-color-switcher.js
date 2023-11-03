const selectors = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

const body = document.body;

selectors.startBtn.addEventListener('click', handlerStart);
selectors.stopBtn.addEventListener('click', handlerStop);

let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
function changeColor() {
  body.style.backgroundColor = getRandomHexColor();
}

function handlerStart(event) {
  event.target.disabled = true;
  selectors.stopBtn.disabled = false;
  timerId = setInterval(changeColor, 1000);
}

function handlerStop(event) {
  event.target.disabled = true;
  selectors.startBtn.disabled = false;

  clearInterval(timerId);
}
