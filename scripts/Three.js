/* eslint-disable max-classes-per-file */

export class Globe extends ThreeGlobe {
  constructor() {
    super();
    this.globeImageUrl('//unpkg.com/three-globe/example/img/earth-day.jpg')
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
    this.position.z = 500;
  }
}

export class TrackballControls extends THREE.TrackballControls {
  constructor(camera, domElement) {
    super(camera, domElement);
    this.minDistance = 101;
    this.rotateSpeed = 5;
    this.zoomSpeed = 0.8;
  }
}
