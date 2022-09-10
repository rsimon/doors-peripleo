import fs from 'fs';
import Papa from 'papaparse';

const gazetteerCsv = fs.readFileSync('./Dummy-Orte.csv', { encoding: 'utf8' });
const gazetteer = Papa.parse(gazetteerCsv, { header: true, delimiter: ';' });

const getPlace = placeName => {
  if (!placeName?.trim())
    return;

  const row = gazetteer.data.find(row => row.Ortsname === placeName.trim());
  if (row) {
    return {
      type: 'Point',
      coordinates: [ parseFloat(row.Lon), parseFloat(row.Lat) ]
    };
  }
}

/**
 * Note: for the dummy, each data point == one record at one particular place.
 * (I.e. one record linked to three places is represented as three data points)
 */
const recordsCsv = fs.readFileSync('./Dummy-Daten.csv', { encoding: 'utf8' });
const records = Papa.parse(recordsCsv, { header: true });
 
const data = records.data.reduce((records, row) => {
  const { 
    Standort,
    Herstellungsort,
    Objektbezeichnung,
    Material,
    Technik,
    Entstehungszeit,
    Schlagworte,
    Eingangsart,
    Lizenzbedingung,
    Publizieren,
    Thema,
    Sammlung,
    Copyright,
    Institution
  } = row;

  const InvNr = row['Inv.Nr.'];
  const Fundort = row['Fundort/Herkunft'];
  const Foto = row['Foto Link - Medienserver'];
  const Beschreibung = row['Beschreibung (Museumsobjekt)'];
  const Geschichte = row['Objektgeschichte (Museumsobjekt)'];
  const Link = row['Link Museumsdatenbank'];
  const Eigentuemer = row['Eigentümer'];

  const peripleoRecord = {
    '@id': Link,
    type: 'Feature',
    properties: {
      title: Objektbezeichnung,
      invNr: InvNr,
      material: Material,
      technique: Technik?.split(';').map(str => str.trim()) || [],
      copyright: Copyright,
      license: Lizenzbedingung,
      institution: Institution,
      collection: Sammlung,
      owner: Eigentuemer,
      ccodes: ['AT']
    },
    descriptions: [{
      value: Beschreibung
    }],
    depictions: [{
      '@id': Foto,
      license: Lizenzbedingung
    }]
  };

  const placeOfDeposit = getPlace(Standort);
  
  const placeOfProduction = getPlace(Herstellungsort);

  const placeOfOrigin = getPlace(Fundort);

  console.log(placeOfDeposit, placeOfOrigin, placeOfProduction);

  return records;
}, []);