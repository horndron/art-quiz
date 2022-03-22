import htmlToElement from '../../utils/htmlToElement';
import Settings from './setting.html';
import './setting.sass';

class Setting {
  constructor(volume, timeGame, timeToAnswer) {
    this.volume = volume;
    this.timeGame = timeGame;
    this.timeToAnswer = timeToAnswer;
  }
}

const settings = htmlToElement(Settings);
const settingsValue = new Setting(
  settings.querySelector('.range-volume').value,
  settings.querySelector('#timerstate').checked,
  settings.querySelector('.range-timer').value,
);

function saveToLocalStorage() {
  localStorage.setItem('rangeVolume', settings.querySelector('.range-volume').value);
  localStorage.setItem('rangeTimer', settings.querySelector('.range-timer').value);
  localStorage.setItem('onOffTimer', settings.querySelector('#timerstate').checked);
}

function prevButton() {
  const event = new Event('change');

  this.nextElementSibling.stepDown();
  this.nextElementSibling.dispatchEvent(event);
  settingsValue.timeToAnswer = this.nextElementSibling.value;
  saveToLocalStorage();
}

function nextButton() {
  const event = new Event('change');

  this.previousElementSibling.stepUp();
  this.previousElementSibling.dispatchEvent(event);
  settingsValue.timeToAnswer = this.previousElementSibling.value;
  saveToLocalStorage();
}

function settingListener() {
  settings.querySelector('.prev-timer').addEventListener('click', prevButton);
  settings.querySelector('.next-timer').addEventListener('click', nextButton);

  settings.querySelector('.range-volume').addEventListener('input', (event) => {
    const { value } = event.target;
    event.target.style
      .background = `linear-gradient(to right, #FFBCA2 0%, #FFBCA2 ${value * 100}%, #C4C4C4 ${value * 100}%, #C4C4C4 100%)`;
    settingsValue.volume = event.target.value;
    saveToLocalStorage();
  });

  settings.querySelector('#timerstate').addEventListener('change', (event) => {
    if (event.target.checked === true) {
      settings.querySelector('.range-timer').disabled = true;
    } else {
      settings.querySelector('.range-timer').disabled = false;
    }
    settingsValue.timeGame = event.target.value;
    saveToLocalStorage();
  });

  settings.querySelector('.default-settings').addEventListener('click', () => {
    settings.querySelector('#timerstate').checked = false;
    settings.querySelector('.range-timer').value = 0;
    settings.querySelector('.range-volume').value = 0;
    settings.querySelector('.range-volume').style
      .background = 'linear-gradient(to right, #FFBCA2 0%, #FFBCA2 0%, #C4C4C4 0%, #C4C4C4 100%)';

    saveToLocalStorage();
  });
}

function setStorage() {
  const volume = localStorage.getItem('rangeVolume');
  settings.querySelector('.range-volume').value = volume;
  settings.querySelector('.range-volume').style
    .background = `linear-gradient(to right, #FFBCA2 0%, #FFBCA2 ${volume * 100}%, #C4C4C4 ${volume * 100}%, #C4C4C4 100%)`;
  settings.querySelector('.range-timer').value = localStorage.getItem('rangeTimer');

  if (localStorage.getItem('onOffTimer') === 'false') {
    settings.querySelector('#timerstate').checked = false;
  } else {
    settings.querySelector('#timerstate').checked = true;
  }
  settingsValue.volume = localStorage.getItem('rangeVolume');
  settingsValue.timeGame = localStorage.getItem('onOffTimer');
  settingsValue.timeToAnswer = localStorage.getItem('rangeTimer');
}

if (!localStorage.getItem('rangeVolume')) {
  saveToLocalStorage();
} else {
  setStorage();
}

function settingHtml() {
  settingListener();

  if (!localStorage.getItem('rangeVolume')) {
    saveToLocalStorage();
  } else {
    setStorage();
  }

  return settings;
}

export { settingsValue };
export default settingHtml;
