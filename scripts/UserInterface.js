import { cities } from './index.js';

export class UserInterface {
  constructor() {
    this.yearRange = document.getElementById('yearRange');
    this.labelValue = document.getElementById('labelValue');
    this.backwardForwardButton = document.getElementById(
      'backwardForwardButton'
    );
    this.pausePlayButton = document.getElementById('pausePlayButton');
    this.bindEvents();
  }

  bindEvents() {
    this.yearRange.addEventListener('input', this.yearInputChange.bind(this));
    this.backwardForwardButton.addEventListener(
      'click',
      this.handleBackwardForwardButtonClick.bind(this)
    );
    this.pausePlayButton.addEventListener(
      'click',
      this.handlepausePlayButtonClick.bind(this)
    );
  }

  convertIntegerToLabelYears(year) {
    if (year < 0) {
      return `${Math.abs(year)} BC`;
    }
    return `AD ${year}`;
  }

  changeLabelValue(newValue) {
    this.labelValue.innerHTML = this.convertIntegerToLabelYears(newValue);
  }

  changeRangeValue(newValue) {
    this.yearRange.value = newValue;
  }

  changeYear(newYear) {
    this.changeLabelValue(newYear);
    this.changeRangeValue(newYear);
  }

  yearInputChange({ target: { value: year } }) {
    cities.selectedYear = year;
  }

  handleBackwardForwardButtonClick() {
    if (cities.direction === 'FORWARD') {
      cities.direction = 'BACKWARD';
    } else {
      cities.direction = 'FORWARD';
    }
  }

  handlepausePlayButtonClick() {
    if (cities.pause) {
      cities.pause = false;
    } else {
      cities.pause = true;
    }
  }

  changeTextBackwardForwardButton(text) {
    this.backwardForwardButton.innerText = text;
  }

  changeTextPausePlayButton(text) {
    this.pausePlayButton.innerText = text;
  }
}
