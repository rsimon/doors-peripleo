import fs from 'fs';
import Papa from 'papaparse';
import { nanoid } from 'nanoid';

/**
 * Note: for the dummy, each data point == one record at one particular place.
 * (I.e. one record linked to three places is represented as three data points)
 */
 const recordsCsv = fs.readFileSync('./Dummy-Daten.csv', { encoding: 'utf8', flag: 'r' });
 const records = Papa.parse(recordsCsv, { header: true });
 
 