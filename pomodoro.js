const start = document.getElementById("start");
const time = document.getElementById("time");

let workTime = 25;
let breakTime = 5;
let longBreakTime = 15;
let seconds = 0;
let isWork = true;
let cycles = 0;
let timer;

// Создаём звук (можно заменить на свой)
const alarmSound = new Audio("s.mp3");

function updateDisplay() {
  time.textContent = `${isWork ? "Работа" : "Отдых"}: ${
    isWork ? workTime : cycles % 4 === 0 ? longBreakTime : breakTime
  }:${seconds.toString().padStart(2, "0")}`;
}

function startTimer() {
  if (timer) return; // Не даём запустить повторно

  timer = setInterval(() => {
    if (seconds === 0) {
      if (isWork && workTime === 0) {
        cycles++; // Увеличиваем число циклов
        isWork = false; // Переключаемся на отдых
        alarmSound.play(); // Воспроизводим звук
        seconds = 59;
      } else if (
        !isWork &&
        (cycles % 4 === 0 ? longBreakTime : breakTime) === 0
      ) {
        isWork = true; // Возвращаемся к работе
        alarmSound.play(); // Воспроизводим звук
        workTime = 25;
        breakTime = 5; // Сбрасываем короткий отдых
        longBreakTime = 15; // Сбрасываем длинный перерыв
        seconds = 59;
      } else {
        if (isWork) workTime--;
        else if (cycles % 4 === 0) longBreakTime--; // Уменьшаем длинный перерыв
        else breakTime--; // Уменьшаем короткий отдых
        seconds = 59;
      }
    } else {
      seconds--;
    }

    updateDisplay();
  }, 10);
}

start.addEventListener("click", startTimer);
updateDisplay();
