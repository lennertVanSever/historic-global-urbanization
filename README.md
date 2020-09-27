# historic-global-urbanization

![Demo gif of historic global urbanization](demo.gif)

Live demo: [https://urban-expansion.netlify.app](https://urban-expansion.netlify.app)

A 3D data visualization showing how the population of the global cities evolved from 2000 BC until AD 1980. Based on the data from the awsesome Yale paper [spatializing global urbanization](https://www.nature.com/articles/sdata201634). The [ThreeJS Globe Visualization library](https://github.com/vasturiano/three-globe) is used to power this visualisation.

## How it works

In the data folder you can find a [csv file](data/data.csv) that comes from the [research paper](https://www.nature.com/articles/sdata201634#Sec7). Next to it there is a [Node.js](data/index.js) script that will convert the cvs to a JSON file.

When you open the index.html file, the first thing that will happen is that the converted [JSON](data/data.json) data is loaded in, then a function from the [ModifyCityData](scripts/ModifyCityData.js) is used to filter out cities by year and set the correct height of the 3D point.

## Running it locally

Git clone this repo

```https://github.com/lennertVanSever/historic-global-urbanization.git```

Open the index.html file with something like [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer). That's it :)

If you want to reconvert the data, first navigate to the data folder

```cd data```

Install the dependencies

```npm install```

Run the script

```npm start```

The log will tell you where the converted JSON is 