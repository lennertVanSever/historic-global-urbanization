import { cities } from './index.js';

export class UserInterface {
  constructor() {
    this.yearRange = document.getElementById('yearRange');
    this.labelValue = document.getElementById('labelValue');
    this.bindEvents();
  }

  bindEvents() {
    this.yearRange.addEventListener('input', this.yearInputChange.bind(this));
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
    this.changeLabelValue(year);
  }
}
