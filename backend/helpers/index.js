import * as fs from 'fs';

export const extractTextFromTxtFile = () => {
  let convertedText;

  convertedText = fs.readFileSync('./corpus/hemingway.txt');

  return convertedText.toString();
};

// normalizes the entire corpus
export const cleanUpTextContents = text => {
  const filteredText = text
    .replace(/[^a-zA-Z ]/g, ' ') // only get all letters
    .split(' ') // create array of every word
    .filter(e => e.length !== 0) // remove all empty items
    .map(e => e.toLowerCase()); // all items forced to lower case

  return filteredText;
};

// similarity algo
export { fuzzyWithDiceCoefficient as getSimilarWords } from './matching.js';
