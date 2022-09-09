import fs from 'fs';
import Papa from 'papaparse';

const recordsCsv = fs.readFileSync('./Dummy-Daten.csv', { encoding: 'utf8', flag: 'r' });
const records = Papa.parse(recordsCsv, { header: true });

// Log all unique places
const uniquePlaces = records.data.reduce((places, record) => {
  const { Standort, Herstellungsort } = record;
  const Fundort = record['Fundort/Herkunft'];

  [Standort, Herstellungsort, Fundort]
    .map(str => str?.trim())
    .filter(str => str) // Filter empty
    .forEach(place => places.add(place));

  return places;
}, new Set());

console.log(uniquePlaces);