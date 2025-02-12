const start = document.getElementById("start");
const reset = document.getElementById("reset");
const time = document.getElementById("time");
const stop = document.getElementById("stop");

let workTime = 25;
let breakTime = 5;
let longBreakTime = 15;
let seconds = 0;
let isWork = true;
let cycles = 0;
let timer = null;

const alarmSound = new Audio("s.mp3");

function updateDisplay() {
  let minutes = isWork
    ? workTime
    : cycles % 4 === 0
    ? longBreakTime
    : breakTime;

  time.textContent = `${isWork ? "Работа" : "Отдых"}: ${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function startTimer() {
  if (timer) return;

  timer = setInterval(() => {
    if (seconds === 0) {
      if (isWork && workTime === 0) {
        cycles++;
        isWork = false;
        alarmSound.play();
        workTime = 25;
        breakTime = 5;
        longBreakTime = 15;
      } else if (
        !isWork &&
        (cycles % 4 === 0 ? longBreakTime : breakTime) === 0
      ) {
        isWork = true;
        alarmSound.play();
      } else {
        if (isWork) workTime--;
        else if (cycles % 4 === 0) longBreakTime--;
        else breakTime--;
      }
      seconds = 59;
    } else {
      seconds--;
    }
    updateDisplay();
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
  timer = null;
}

function resetTimer() {
  stopTimer();
  workTime = 25;
  breakTime = 5;
  longBreakTime = 15;
  seconds = 0;
  isWork = true;
  cycles = 0;
  updateDisplay();
}

start.addEventListener("click", startTimer);
stop.addEventListener("click", stopTimer);
reset.addEventListener("click", resetTimer);

updateDisplay();
