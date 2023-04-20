import {Prize} from '../../screens/NobelPrizeSearch';

export const levenshteinDistance = (a: string, b: string): number => {
  const m = a.length;
  const n = b.length;
  const d = [];

  // Initialize first row and column of matrix
  for (let i = 0; i <= m; i++) {
    d[i] = [i];
  }
  for (let j = 0; j <= n; j++) {
    d[0][j] = j;
  }

  // Fill in the rest of the matrix
  for (let j = 1; j <= n; j++) {
    for (let i = 1; i <= m; i++) {
      if (a[i - 1] === b[j - 1]) {
        d[i][j] = d[i - 1][j - 1];
      } else {
        d[i][j] = Math.min(d[i - 1][j], d[i][j - 1], d[i - 1][j - 1]) + 1;
      }
    }
  }

  return d[m][n];
};

export const qualityResults = (
  filteredPrizes: Prize[],
  searchWords: string[],
) => {
  const results: {prize: Prize; score: number}[] = [];
  filteredPrizes.forEach(prize => {
    const {year, category} = prize;
    let score = 0;

    const yearString = year.toString();
    const categoryLower = category.toLowerCase();

    const prizeWords = [...yearString.split(' '), categoryLower];

    searchWords.forEach(queryWord => {
      let minDistance = Infinity;

      prizeWords.forEach(prizeWord => {
        const distance = levenshteinDistance(prizeWord, queryWord);
        minDistance = Math.min(minDistance, distance);
      });

      score += minDistance;
    });

    results.push({prize, score});
  });

  results.sort((a, b) => a.score - b.score);

  return results.map(result => result.prize);
};

export const capitalizeFirstLetter = (str: string) => {
  // converting first letter to uppercase
  const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

  return capitalized;
};
