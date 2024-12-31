const container = document.querySelector('.container')
const fireworks = new Fireworks.default(container)
const sound = fireworks.currentOptions.sound;

sound.enabled = true;
sound.files = ['./explosion0.mp3', './explosion1.mp3'];
sound.volume = { min: 100, max: 100 };

console.log(sound.files)

console.log()
const yearHTML = document.getElementById('year');
const dayHTML = document.getElementById('day');
const hourHTML = document.getElementById('hour');
const minuteHTML = document.getElementById('minute');
const secondHTML = document.getElementById('second');

const currentYear = new Date().getFullYear();
const newYearDateTime = new Date(currentYear + 1, 0, 1, 0, 0, 0);

function updateCountdown() {
  const diffYearDateTime = newYearDateTime - new Date();
  const remainingDay = Math.floor(diffYearDateTime / 1000 / 60 / 60 / 24);
  const remainingHour = Math.floor(diffYearDateTime / 1000 / 60 / 60) % 24;
  const remainingMinute = Math.floor(diffYearDateTime / 1000 / 60) % 60;
  const remainingSecond = Math.floor(diffYearDateTime / 1000) % 60;

  yearHTML.innerHTML = currentYear;
  dayHTML.innerHTML = remainingDay < 10 ? '0' + remainingDay : remainingDay;
  hourHTML.innerHTML = remainingHour < 10 ? '0' + remainingHour : remainingHour;
  minuteHTML.innerHTML = remainingMinute < 10 ? '0' + remainingMinute : remainingMinute;
  secondHTML.innerHTML = remainingSecond < 10 ? '0' + remainingSecond : remainingSecond;

  if (diffYearDateTime <= 0 || new Date() >= newYearDateTime) {
  // if (remainingSecond < 45) {
    yearHTML.innerHTML = currentYear+1;
    fireworks.start();
    clearInterval(intervalId);
    document.querySelector('.bottom').classList.toggle('fade-out');
    setTimeout(() => {
      document.querySelector('.bottom').classList.add('hidden');
      document.querySelector('.bottom').classList.toggle('fade-out');
      document.querySelector('.greet').classList.remove('hidden');
      document.querySelector('.emoji').classList.remove('hidden');
    }, 2000);
    document.querySelector('.greet').classList.add('fade-in');
  }
}
const intervalId = setInterval(updateCountdown, 1000);

document.addEventListener('keydown', e => {
  switch (e.key) {
    case 'm':
    case 'M':
      sound.enabled = !sound.enabled;
      fireworks.updateOptions(sound)
      break;

    case 'ArrowUp':
      if (sound.volume.min === 100 && sound.volume.min === 100) {
        console.log(`volume: ${sound.volume.max}`)
        return;
      } else {
        console.log(sound.volume.min++);
        console.log(sound.volume.max++);
        fireworks.updateOptions(sound);
      }
      break;

    case 'ArrowDown':
      if (sound.volume.min === 0 && sound.volume.min === 0) {
        console.log(`volume: ${sound.volume.max}`)
        return;
      } else {
        console.log(sound.volume.min--);
        console.log(sound.volume.max--);
        fireworks.updateOptions(sound);
      }
      break;

    default:
      break;
  }
});

