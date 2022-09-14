import fs from 'fs';
import Papa from 'papaparse';
import { nanoid } from 'nanoid';

const gazetteerCsv = fs.readFileSync('./Dummy-Orte.csv', { encoding: 'utf8' });
const gazetteer = Papa.parse(gazetteerCsv, { header: true, delimiter: ';' });

const getPlace = placeName => {
  const row = gazetteer.data.find(row => row.Ortsname === placeName.trim());
  if (row) {
    return {
      type: 'Point',
      coordinates: [ parseFloat(row.Lon), parseFloat(row.Lat) ]
    };
  }
}

const buildFeature = (record, place, relation) => {
  if (!place?.trim())
    return;

  return {
    ...record,
    '@id': nanoid(),
    properties: {
      ...record.properties,
      place: place.trim(),
      relation
    },
    geometry: {
      ...getPlace(place.trim())
    }
  }
}

/**
 * Note: for the dummy, each data point == one record at one particular place.
 * (I.e. one record linked to three places is represented as three data points)
 */
const recordsCsv = fs.readFileSync('./Dummy-Daten-v2.csv', { encoding: 'utf8' });
const records = Papa.parse(recordsCsv, { header: true });
 
const features = records.data.reduce((all, row) => {
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
  const Link = row['Link DIPkatalog']; // row['Link Museumsdatenbank'];
  const Eigentuemer = row['Eigentümer'];

  const peripleoRecord = {
    type: 'Feature',
    properties: {
      title: Objektbezeichnung,
      source: Link,
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

  const features = Link?.trim() ? [
    buildFeature(peripleoRecord, Standort, 'Standort'),
    buildFeature(peripleoRecord, Herstellungsort, 'Herstellungsort'),
    buildFeature(peripleoRecord, Fundort, 'Fundort/Herkunft')
  ].filter(rec => rec) : [];
  
  return [...all, ...features];
}, []);

const fc = {
  type: 'FeatureCollection',
  features
};

fs.writeFileSync('demo-dataset.lp.json', JSON.stringify(fc, null, 2), 'utf8');
