import { time, timeEnd } from "../../utils/time";

export const solve03_02 = (input: string) => {
  time("solve03_02");

  const inputSplit = input.split("\n");

  const matrix = inputSplit.map((line) => line.split(""));

  let gearRatioSum = 0;

  for (let i = 0; i < matrix.length; i++) {
    const line = matrix[i];
    for (let j = 0; j < line.length; j++) {
      const char = line[j];

      // Don't check non-gears
      if (char !== "*") continue;

      // Get all the pairs of i,j that are adjacent to the gear
      const ijPairs = getIJPairs(i, j);

      const gearMultNums = [];

      for (const [i, j] of ijPairs) {
        // If not a number, skip
        if (!isNumber(matrix[i][j])) continue;

        // We know this is a number that needs multiplying for the gear, now we need to do the index stuff for line
        const iLine = matrix[i];

        // We found a valid number to include, need to find the start of the number and the end
        let startIndex = null;
        for (let k = j; k >= 0; k--) {
          if (k - 1 < 0 || !isNumber(matrix[i][k - 1])) {
            startIndex = k;
            break;
          }
        }
        if (startIndex === null) throw new Error("Could not find start index");

        let endIndex = null;
        for (let k = startIndex; k < iLine.length; k++) {
          if (k + 1 >= iLine.length || !isNumber(matrix[i][k + 1])) {
            endIndex = k;
            break;
          }
        }
        if (endIndex === null)
          throw new Error("Could not find start or end index");

        // Get the full number start to finish
        const number = iLine.slice(startIndex, endIndex + 1).join("");

        gearMultNums.push({
          val: parseInt(number),
          startIndex: [i, startIndex] as [number, number],
        });
      }

      // Ensure we don't double count the same number due to multiple adjacent parts
      const dedupedGearMultNums = uniqueByStartIndex(gearMultNums);

      // If we don't have at least 2 numbers to multiply, skip
      if (dedupedGearMultNums.length < 2) continue;

      gearRatioSum += dedupedGearMultNums.reduce(
        (acc, curr) => acc * curr.val,
        1
      );
    }
  }

  timeEnd("solve03_02");

  return gearRatioSum;
};

function isSymbol(char: string) {
  if (!char) return false;
  return char.match(/[^a-zA-Z0-9\.]+/) !== null;
}

function isNumber(char: string) {
  return !isNaN(parseInt(char));
}

function getIJPairs(i: number, j: number) {
  return [
    [i, j - 1],
    [i, j + 1],
    [i - 1, j],
    [i + 1, j],
    [i - 1, j - 1],
    [i - 1, j + 1],
    [i + 1, j - 1],
    [i + 1, j + 1],
  ];
}

function uniqueByStartIndex(
  arr: { val: number; startIndex: [number, number] }[]
) {
  const seen = new Set();

  return arr.filter((item) => {
    const key = item.startIndex.join("-");
    const isDuplicate = seen.has(key);
    seen.add(key);
    return !isDuplicate;
  });
}
