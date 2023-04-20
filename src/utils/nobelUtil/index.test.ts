import cases from 'jest-in-case';

import {capitalizeFirstLetter, levenshteinDistance, qualityResults} from '.';
import {Prize} from '../../screens/NobelPrizeSearch';

describe('capitalizeFirstLetter', () => {
  cases(
    'Capitalize first letter of a string',
    ({str, expected}: {str: string; expected: string}) => {
      const result = capitalizeFirstLetter(str);
      expect(result).toEqual(expected);
    },
    [
      {
        str: 'string',
        expected: 'String',
      },
      {
        str: 'String',
        expected: 'String',
      },
    ],
  );
});

describe('levenshteinDistance', () => {
  cases(
    'Check to equal strings',
    ({
      stringA,
      stringB,
      expected,
    }: {
      stringA: string;
      stringB: string;
      expected: number;
    }) => {
      const result = levenshteinDistance(stringA, stringB);
      expect(result).toEqual(expected);
    },
    [
      {
        stringA: 'Chemistry',
        stringB: 'Chemistry',
        expected: 0,
      },
      {
        stringA: 'Peace',
        stringB: 'Peace',
        expected: 0,
      },
    ],
  );
  cases(
    'Find 2 distances',
    ({
      stringA,
      stringB,
      expected,
    }: {
      stringA: string;
      stringB: string;
      expected: number;
    }) => {
      const result = levenshteinDistance(stringA, stringB);
      expect(result).toEqual(expected);
    },
    [
      {
        stringA: 'Chemist',
        stringB: 'Chemistry',
        expected: 2,
      },
      {
        stringA: 'PeaCE',
        stringB: 'Peace',
        expected: 2,
      },
      {
        stringA: '',
        stringB: 'Pe',
        expected: 2,
      },
    ],
  );
});

describe('qualityResults', () => {
  cases(
    'Sort quality results for a user',
    ({
      filteredPrizes,
      searchWords,
      expected,
    }: {
      filteredPrizes: Prize[];
      searchWords: string[];
      expected: Prize[];
    }) => {
      const result = qualityResults(filteredPrizes, searchWords);
      expect(result).toEqual(expected);
    },
    [
      {
        filteredPrizes: [
          {
            id: '1',
            category: 'peace',
            laureates: [],
            year: '1999',
          },
          {
            id: '2',
            category: 'peace',
            laureates: [],
            year: '1998',
          },
          {id: '3', category: 'peace', laureates: [], year: '1990'},
        ],
        searchWords: ['1990', 'peace'],
        expected: [
          {id: '3', category: 'peace', laureates: [], year: '1990'},
          {id: '1', category: 'peace', laureates: [], year: '1999'},
          {id: '2', category: 'peace', laureates: [], year: '1998'},
        ],
      },
    ],
  );
});
