import {
  extractTextFromTxtFile,
  cleanUpTextContents,
  getSimilarWords,
} from '../helpers/index.js';

const data = extractTextFromTxtFile();
const allRoutes = [
  {
    type: 'GET',
    route: '/corpus',
    name: '/corpus',
    color: '#61AFFE',
  },
  {
    type: 'GET',
    route: '/cleanCorpus',
    name: '/cleanCorpus',
    color: '#61AFFE',
  },
  {
    type: 'GET',
    name: '/cleanCorpus/{valueToSearch : string}',
    color: '#61AFFE',
  },
  {
    type: 'POST',
    name: '/cleanCorpus/{valueToAdd : string}',
    color: '#49CC90',
  },
  {
    type: 'PUT',
    name: '/cleanCorpus/{valueToChange: string}/{valueToAdd : string}',
    color: '#FCA130',
  },
  {
    type: 'DELETE',
    name: '/cleanCorpus/{similarWords: string | string,string,string}/{valueToDelete : string}',
    color: '#F93E3E',
  },
];
const cleanData = cleanUpTextContents(data);

let deletedWords = [];

export const getAllRoutes = (req, res) => {
  res.send(
    '<h2 style="font-family: monospace;">Available routes:</h2>' +
      allRoutes
        .map(
          item =>
            `
              <p style="font-family: monospace; margin-top: 2em;"><span style="color: white; padding: 5px; background-color: ${
                item.color
              };">${item.type}</span> <span>${
              item.route
                ? `<a href="${item.route}">${item.name}</a>`
                : item.name
            }</span></p>
              `,
        )
        .join(''),
  );
};

export const getCorpus = (req, res) => {
  res.send(`${data}`);
};

export const getCleanCorpus = (req, res) => {
  res.send(`<p style="word-break: break-word;">${cleanData}</p>`);
};

export const getSimilarTextFromQuery = (req, res) => {
  const { query } = req.params;

  if (query) {
    const queryableData = cleanData.filter(e =>
      getSimilarWords(query, e, query.length),
    );

    const availableWordsToQuery =
      !deletedWords || deletedWords.length === 0
        ? queryableData
        : queryableData.filter(item => !deletedWords.includes(item));
    res.send([...new Set(availableWordsToQuery)]);
    // console.log(query);
  } else {
    console.log('An error has occured...'); // TODO: do try catch and display error here (optional)
  }
};

export const createWord = (req, res) => {
  const { valueToAdd } = req.params;

  if (valueToAdd) {
    cleanData.push(valueToAdd);
  }
  res.send(cleanData);
};

export const updateWord = (req, res) => {
  const { srcValue, valueToUpdate } = req.params;
  const matchingItem = cleanData.find(item => item === srcValue);

  if (matchingItem) {
    cleanData.forEach(item => {
      if (item === matchingItem)
        cleanData.splice(cleanData.indexOf(matchingItem), 1, valueToUpdate);
    });
  }

  res.send(cleanData);
};

export const deleteWord = (req, res) => {
  const { values, valueToDelete } = req.params;
  if (values.length > 0 && valueToDelete) {
    res.send(values.split(',').filter(item => item !== valueToDelete));

    deletedWords.push(valueToDelete);
  }
};
