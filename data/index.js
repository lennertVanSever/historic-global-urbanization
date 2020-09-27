const csv = require('csv-parser');
const fs = require('fs');

const results = [];

const replaceYearLabelingByRealNumbers = (labeledYear) => {
  return labeledYear.replace('AD_', '').replace('BC_', '-');
};

const getPopulationByYear = (city) => {
  const populationByYear = {};
  Object.keys(city).forEach((year) => {
    const isYear = /(BC|AD)/.test(year);
    if (isYear && city[year]) {
      const yearAsNumber = replaceYearLabelingByRealNumbers(year);
      populationByYear[yearAsNumber] = Number(city[year]);
    }
  });
  return populationByYear;
};

let outputThree = null;
fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    outputThree = results.map((city) => {
      return {
        populationByYear: getPopulationByYear(city),
        name: city.City,
        lat: city.Latitude.replace('�', ''),
        lng: city.Longitude.replace('�', ''),
        color: 'white',
      };
    });
    try {
      const path = '../three.json';
      fs.writeFileSync(path, JSON.stringify(outputThree, null, 1));
      console.log(`succesfully generated data at ${path}`);
    } catch (e) {
      console.error('something went wrong writing the file', e);
    }
  });
