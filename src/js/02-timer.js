// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const textRef = document.querySelector('#datetime-picker');
const timerRef = document.querySelector('.timer');
const startBtn = document.querySelector('[data-start]');

 let timerDeadline = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    console.log(selectedDates[0]);
    timerDeadline = selectedDates[0].getTime();
    const delta = timerDeadline - Date.now();
    if (delta <= 0 ) {
      Notiflix.Notify.failure('Please choose a date in the future');
              startBtn.disabled = true;
      return;
  } else {
    startBtn.disabled = false;
  }
},
};
flatpickr(textRef, options);

const timer = {
    intervalId: null,
    start() {
        this.intervalId = setInterval(() => {
            const deltatime = timerDeadline - Date.now();
            console.log(deltatime);
            const timeUp = convertMs(deltatime);
            updateClockface(timeUp);
        }, 1000)
    },
    stop() {
        clearInterval(this.intervalId);
    }
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
    
  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function pad(value) {
    return String(value).padStart(2, '0');
}

function updateClockface({ days, hours, minutes, seconds }) {
    timerRef.textContent = `${days}::${hours}::${minutes}::${seconds}`;
}

startBtn.addEventListener('click', () => {
    timer.start();
})
