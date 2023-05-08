// Get the necessary DOM elements by their IDs
const time = document.getElementById('time');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resumeBtn = document.getElementById('resume');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsTime = document.getElementById('laps');
const currentTimeArea = document.getElementById('currentTime');
const locationArea = document.getElementById('currentLocation');

// Update the current location display by calling the showPosition function
const currentLocation = () => {
  locationArea.textContent = showPosition();
};

// Update the current date display by getting the current date and formatting it
const currentDate = () => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const currentTime = new Date();
  const year = currentTime.getFullYear();
  const month = currentTime.getMonth();
  const day = currentTime.getDay();

  currentTimeArea.textContent = `Date : ${day} - ${monthNames[month]} - ${year}`;
};

// Call the currentDate function to set the initial date display
currentDate();

// Initialize the timer variables and set the timer display to 00:00:00
let seconds = 0;
let minutes = 0;
let hours = 0;
let intervalId;
time.textContent = '00 : 00 : 00';

// Define a function to start the timer by incrementing the seconds, minutes, and hours values and updating the display
const startTimer = () => {
  intervalId = setInterval(() => {
    seconds++;

    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
    // Update the timer display with the current time values
    time.textContent = `${hours.toString().padStart(2, 0)} : ${minutes
      .toString()
      .padStart(2, 0)} : ${seconds.toString().padStart(2, 0)}`;
  }, 1000);
};

// Define functions to pause, resume, and reset the timer, as well as to add lap times
const pauseTimer = () => {
  clearInterval(intervalId);
};

const resumeTimer = () => {
  startTimer();
};

const resetTimer = () => {
  clearInterval(intervalId);
  seconds = 0;
  minutes = 0;
  hours = 0;
  time.textContent = '00 : 00 : 00';
  // Clear the lap times list and reset the lap counter
  lapsTime.innerHTML = '';
  lapCounter = 1;
  intervalId;
};

let lapCounter = 1;
const lapTime = () => {
  const lap = time.textContent;
  const li = document.createElement('li');
  li.className = 'lapElement';
  li.textContent = `${lapCounter} lap)  ${lap}`;
  lapsTime.appendChild(li);
  lapCounter++;
};

// Add event listeners to the buttons to trigger the corresponding functions
startBtn.addEventListener('click', () => {
  startTimer();
});

pauseBtn.addEventListener('click', () => {
  pauseTimer();
});

resumeBtn.addEventListener('click', () => {
  resumeTimer();
});

resetBtn.addEventListener('click', () => {
  resetTimer();
});

lapBtn.addEventListener('click', () => {
  lapTime();
});

// Define a function to get the current position and update the location display using the OpenStreetMap API
function showPosition() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const city = data.address.city;
          const country = data.address.country;
          locationArea.innerHTML = `  <img src="img/pngwing.com.png" alt="location" class ='location-img' />${city}, ${country}`;
        })
        .catch((error) => console.log(error));
    });
  } else {
    console.log('Geolocation is not supported by this browser.');
  }
}

showPosition();
