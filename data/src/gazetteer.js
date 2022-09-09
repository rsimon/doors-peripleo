import fs from 'fs';
import Papa from 'papaparse';
import { nanoid } from 'nanoid';

const placesCsv = fs.readFileSync('./Dummy-Orte.csv', { encoding: 'utf8' });
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

fs.writeFileSync('Dummy-Gazetteer.json', JSON.stringify(fc, null, 2), 'utf8');