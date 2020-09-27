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
    this.year = -2200;
    this.delay = 50;
    this.selectedYear = null;
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

    if (this.selectedYear) {
      this.getAllCitiesUntilYear(this.threeData, this.selectedYear);
    } else {
      this.delay -= 1;
      if (this.delay < 0 && this.year < 1980) {
        this.year += 3;
        userInterface.changeYear(this.year);
        this.getAllCitiesUntilYear(this.threeData, this.year);
      }
    }
  }
}

export const cities = new Cities();
cities.render();
