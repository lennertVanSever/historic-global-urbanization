/* eslint-disable max-classes-per-file */
import { mapRange } from './utils/remapping.js';

export class Globe extends ThreeGlobe {
  constructor() {
    super();
    this.globeImageUrl('/images/earth-day.jpg')
      .pointsData([])
      .pointAltitude('size')
      .pointColor('color')
      .pointsTransitionDuration(100);
  }
}

export class Renderer extends THREE.WebGLRenderer {
  constructor() {
    super();
    this.setSize(window.innerWidth, window.innerHeight);
    this.setPixelRatio(2);
    document.getElementById('globeViz').appendChild(this.domElement);
  }
}

export class Scene extends THREE.Scene {
  constructor(globe) {
    super();
    this.add(globe);
    this.add(new THREE.AmbientLight(0xbbbbbb));
    this.add(new THREE.DirectionalLight(0xffffff, 0.6));
  }
}

export class Camera extends THREE.PerspectiveCamera {
  constructor() {
    super();
    this.aspect = window.innerWidth / window.innerHeight;
    this.updateProjectionMatrix();
    this.position.x = 192;
    this.position.y = 116;
    this.position.z = 191;
  }
}

export class TrackballControls extends THREE.TrackballControls {
  constructor(camera, domElement) {
    super(camera, domElement);
    this.minDistance = 120;
    this.maxDistance = 1000;
    this.rotateSpeed = mapRange(window.innerWidth, 0, 2000, 0.5, 3);
    this.zoomSpeed = 0.8;
  }
}
