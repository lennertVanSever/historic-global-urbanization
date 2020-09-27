import { Color } from './Color.js';

export class ModifyCityData {
  constructor(data, givenYear) {
    this.data = data;
    this.givenYear = givenYear;
    this.maximumSizeOfCity = 2.3;
    this.calculate();
  }

  calculate() {
    this.data = this.data.filter(this.hasPopulationAtGivenYear.bind(this));
    this.data = this.data.map(this.modifyDynamicalyPropertiesOfCity.bind(this));
  }

  hasPopulationAtGivenYear({ populationByYear }) {
    return this.givenYear >= Number(Object.keys(populationByYear)[0]);
  }

  modifyDynamicalyPropertiesOfCity(city) {
    const closestYearToGivenYear = this.getClosestYearToGivenYear(city);
    this.setSizeOfCity(city, closestYearToGivenYear);
    this.setColorOfCity(city);
    return city;
  }

  getClosestYearToGivenYear(city) {
    let closestYearToGivenYear = -10000;
    Object.keys(city.populationByYear).forEach((yearString) => {
      const yearNumber = Number(yearString);
      if (
        Math.abs(yearNumber - this.givenYear) <
        Math.abs(closestYearToGivenYear - this.givenYear)
      ) {
        closestYearToGivenYear = yearNumber;
      }
    });
    return closestYearToGivenYear;
  }

  setSizeOfCity(city, closestYearToGivenYear) {
    city.size = city.populationByYear[closestYearToGivenYear] / 10000000;
  }

  setColorOfCity(city) {
    const color = new Color(city.size / this.maximumSizeOfCity);
    city.color = color.getValue();
  }
}
