function mapRange(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}

function getColor(weight) {
  const red = 255;
  let green = 255;
  let blue = 255;
  if (weight > 0) {
    blue = Math.round(mapRange(weight, 0, 0.5, 255, 0));
    if (blue < 0) {
      blue = 0;
    }
  }
  if (weight > 0.5) {
    green = Math.round(mapRange(weight, 0, 1, 255, 0));
  }
  return [red, green, blue];
}

function componentToHex(c) {
  const hex = c.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}

function rgbToHex(r, g, b) {
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}

const getAllCitiesUntilYearThree = (cities, givenYear) => {
  cities = cities.filter(({ populationByYear }) => {
    const condition = givenYear >= Number(Object.keys(populationByYear)[0]);
    return condition;
  });
  cities = cities.map((city) => {
    let closestYearToGivenYear = -10000;
    Object.keys(city.populationByYear).forEach((yearString) => {
      const yearNumber = Number(yearString);
      if (
        Math.abs(yearNumber - givenYear) <
        Math.abs(closestYearToGivenYear - givenYear)
      ) {
        closestYearToGivenYear = yearNumber;
      }
    });
    // city.size = city.populationByYear[closestYearToGivenYear] / 400000;
    city.sizeTest = city.populationByYear[closestYearToGivenYear] / 10000000;
    const rgbColor = getColor(city.sizeTest / 2.3);
    city.color = rgbToHex(rgbColor[0], rgbColor[1], rgbColor[2]);
    return city;
  });
  return cities;
};

const getInitialCityData = async () => {
  const threeDataResponse = await fetch('../data/data.json');
  return threeDataResponse.json();
};

(async () => {
  let selectedYear = null;
  document
    .getElementById('yearRange')
    .addEventListener('input', ({ target: { value: year } }) => {
      selectedYear = year;
      document.getElementById('labelValue').innerHTML = year;
    });

  const Globe = new ThreeGlobe()
    .globeImageUrl('//unpkg.com/three-globe/example/img/earth-day.jpg')
    .pointsData([])
    .pointAltitude('sizeTest')
    .pointColor('color')
    .pointsTransitionDuration(100);

  // Setup renderer
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('globeViz').appendChild(renderer.domElement);

  // Setup scene
  const scene = new THREE.Scene();
  scene.add(Globe);
  scene.add(new THREE.AmbientLight(0xbbbbbb));
  scene.add(new THREE.DirectionalLight(0xffffff, 0.6));

  // Setup camera
  const camera = new THREE.PerspectiveCamera();
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  camera.position.z = 500;

  // Add camera controls
  const tbControls = new THREE.TrackballControls(camera, renderer.domElement);
  tbControls.minDistance = 101;
  tbControls.rotateSpeed = 5;
  tbControls.zoomSpeed = 0.8;

  const threeData = await getInitialCityData();
  let year = -2200;
  let delay = 50;
  // Kick-off renderer
  (function animate() {
    // IIFE
    // Frame cycle

    tbControls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);

    if (selectedYear) {
      const cityData = getAllCitiesUntilYearThree(threeData, selectedYear);
      Globe.pointsData(cityData);
    } else {
      delay -= 1;
      if (delay < 0 && year < 1980) {
        year += 3;
        document.getElementById('labelValue').innerHTML = year;
        const cityData = getAllCitiesUntilYearThree(threeData, year);
        document.getElementById('yearRange').value = year;
        Globe.pointsData(cityData);
      }
    }
  })();
})();
