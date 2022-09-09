import fs from 'fs';
import Papa from 'papaparse';

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

console.log(uniquePlaces);