import { Report } from 'notiflix/build/notiflix-report-aio';

// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('[data-start]');
const inputData = document.querySelector('input#datetime-picker');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

let selectedDate = null;
let currentDate = null;
let timerId = null;
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      Report.failure('Oops!', 'Please choose a date in the future.', 'Okay');
    } else {
      Report.success('Super!', 'Please, click on button start.', 'Okay');
      startBtn.disabled = false;
      selectedDate = selectedDates[0].getTime();
    }
  },
};
const fp = flatpickr(inputData, options);

const counter = {
  start() {
    timerId = setInterval(() => {
      startBtn.disabled = true;
      inputData.disabled = true;
      currentDate = Date.now();
      const delta = selectedDate - currentDate;

      convertMs(delta);

      updateInterfaceTimer(convertMs(delta));
      if (delta <= 1000) {
        this.stop();
        Report.info(
          'Time is over',
          'You can choose a new date and time',
          'Okay'
        );
      }
    }, 1000);
  },
  stop() {
    clearInterval(timerId);
    startBtn.disabled = true;
    inputData.disabled = false;
    return;
  },
};
startBtn.addEventListener('click', onStart);
function onStart() {
  counter.start();
}

function updateInterfaceTimer({ days, hours, minutes, seconds }) {
  dataDays.textContent = addLeadingZero(days);
  dataHours.textContent = addLeadingZero(hours);
  dataMinutes.textContent = addLeadingZero(minutes);
  dataSeconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
