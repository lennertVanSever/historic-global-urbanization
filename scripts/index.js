/* eslint-disable max-classes-per-file */
import { ModifyCityData } from './ModifyCityData.js';
import { Camera, Globe, Renderer, Scene, TrackballControls } from './Three.js';
import { UserInterface } from './UserInterface.js';

const globe = new Globe();

const renderer = new Renderer();

const scene = new Scene(globe);

const camera = new Camera();

const trackballControls = new TrackballControls(camera, renderer.domElement);

const userInterface = new UserInterface();

class Cities {
  constructor() {
    this.initialYear = -2200;
    this.maximumYear = 1980;
    this.year = this.initialYear;
    this.delay = 50;
    this.pace = 3;
    this.selectedYear = null;
    this.direction = 'FORWARD';
    this.pause = false;
  }

  set selectedYear(selectedYear) {
    if (selectedYear) {
      this.pause = true;
      this.year = Number(selectedYear);
      this._selectedYear = Number(selectedYear);
    }
  }

  get selectedYear() {
    return this._selectedYear;
  }

  set direction(direction) {
    this._direction = direction;
    if (direction === 'FORWARD') {
      userInterface.changeTextBackwardForwardButton('Backward');
    }
    if (direction === 'BACKWARD') {
      userInterface.changeTextBackwardForwardButton('Forward');
    }
    this.pause = false;
  }

  get direction() {
    return this._direction;
  }

  set pause(pause) {
    this._pause = pause;
    if (pause) {
      userInterface.changeTextPausePlayButton('Play');
    }
    if (!pause) {
      userInterface.changeTextPausePlayButton('Pause');
    }
  }

  get pause() {
    return this._pause;
  }

  set year(year) {
    this._year = year;
    userInterface.changeYear(year);
  }

  get year() {
    return this._year;
  }

  getAllCitiesUntilYear(cities, givenYear) {
    const modifiedCityData = new ModifyCityData(cities, givenYear);
    globe.pointsData(modifiedCityData.data);
  }

  async render() {
    this.threeData = await this.getInitialCityData();
    this.animate();
  }

  async getInitialCityData() {
    const threeDataResponse = await fetch('../data/data.json');
    return threeDataResponse.json();
  }

  animate() {
    trackballControls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(this.animate.bind(this));

    if (this.pause) {
      this.getAllCitiesUntilYear(this.threeData, this.year);
    }
    if (!this.pause) {
      if (this.selectedYear) this.selectedYear = null;
      this.delay -= 1;
      if (this.delay < 0) {
        if (this.direction === 'FORWARD' && this.year < this.maximumYear) {
          this.year += this.pace;
        }
        if (this.direction === 'BACKWARD' && this.year >= this.initialYear) {
          this.year -= this.pace;
        }
        this.getAllCitiesUntilYear(this.threeData, this.year);
      }
    }
  }
}

export const cities = new Cities();
cities.render();
