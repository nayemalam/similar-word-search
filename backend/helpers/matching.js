/**
 * This method performs the fuzzy similarity matching using the dice coefficient
 *
 * @param {string} string1 first input string (one or many words)
 * @param {string} string2 second input string (one or many words)
 * @param {number} numberOfGrams number of grams
 * @return {number} a value between [0.0,1.0] which gives the similarity between two words based on the dice coefficient - values closer to 1.0
 * have higher similarity
 */
export const fuzzyWithDiceCoefficient = (string1, string2, numberOfGrams) => {
  let result = 0.0,
    commonTerms;

  if (!string1 || !string2 || string1.length === 0 || string2.length === 0) {
    return;
  }

  // get nGram of input strings
  const ngram1 = nGramOfOneWord(string1, numberOfGrams);
  const ngram2 = nGramOfOneWord(string2, numberOfGrams);
  if (!ngram1 || !ngram2) {
    return;
  }

  // find common elements
  const intersection = getCommonTerms(ngram1, ngram2);
  commonTerms = intersection.length;
  result = diceFunction(commonTerms, ngram1.length, ngram2.length);
  //   console.log(result);

  return result;
};

/**
 * This method finds all the common elements between two lists
 * alternate to retainAll() method (https://www.geeksforgeeks.org/arraylist-retainall-method-in-java/)
 *
 * @param {Array<string>} ngram1 list of word(s) diced (i.e. with its corresponding ngrams)
 * @param {Array<string>} ngram2 list of word(s) diced (i.e. with its corresponding ngrams)
 * @return {Array<string>} the common terms between two lists
 */
const getCommonTerms = (ngram1, ngram2) => {
  if (!ngram1 || !ngram2 || ngram1.length === 0 || ngram2.length === 0) {
    return;
  }

  let commonTerms = ngram1.filter(likeElement => ngram2.includes(likeElement));
  //   console.log('common:', commonTerms);
  let intersection = [...new Set(commonTerms)];

  return intersection;
};

/**
 * This method performs the Sørensen–Dice coefficient (https://en.wikipedia.org/wiki/S%C3%B8rensen%E2%80%93Dice_coefficient)
 *
 * @param {number} numberOfCommonItems number of common elements between the two input strings
 * @param {number} stringLength1 length of string 1
 * @param {number} stringLength2 length of string 2
 * @return {number} the dice coefficient between two strings
 */
const diceFunction = (numberOfCommonItems, stringLength1, stringLength2) => {
  if (isNaN(stringLength1) || isNaN(stringLength2)) {
    return;
  }

  return (2 * numberOfCommonItems) / (stringLength1 + stringLength2);
};

/**
 * This method breaks one word into ngrams (https://en.wikipedia.org/wiki/N-gram)
 *
 * @param {string} str one word
 * @param {number} n number of grams
 * @return {Array<string>} the unigram, bigram, trigram, four-gram, etc... (depending of chosen n) of input str
 */
const nGramOfOneWord = (str, n) => {
  let result = [];
  if (n > str.length) {
    return;
  }

  for (var i = 0; i <= str.length - n; i++) {
    result.push(str.substring(i, i + n));
  }

  return result;
};
