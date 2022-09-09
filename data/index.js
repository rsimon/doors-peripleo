import fs from 'fs';
import Papa from 'papaparse';
import { nanoid } from 'nanoid';

/*
const csv = fs.readFileSync('./Dummy-Daten.csv', { encoding: 'utf8', flag: 'r' });
const sourceData = Papa.parse(csv, { header: true });

// TODO collect unique places
const uniquePlaces = sourceData.data.reduce((places, record) => {
  const { Standort, Herstellungsort } = record;
  const Fundort = record['Fundort/Herkunft'];

  [Standort, Herstellungsort, Fundort]
    .map(str => str?.trim())
    .filter(str => str) // Filter empty
    .forEach(place => places.add(place));

  return places;
}, new Set());
*/

// console.log(uniquePlaces);

const placesCsv = fs.readFileSync('./Orte.csv', { encoding: 'utf8' });
const places = Papa.parse(placesCsv, { header: true, delimiter: ';' });

const fc = {
  type: 'FeatureCollection',
  features: places.data.map(row => {
    return {
      id: nanoid(),
      type: 'Feature',
      properties: {
        title: row.Ortsname
      },
      geometry: {
        type: 'Point',
        coordinates: [
          parseFloat(row.Lon), parseFloat(row.Lat)
        ]
      }
    }
  })
};

fs.writeFileSync('places.json', JSON.stringify(fc, null, 2), 'utf8');