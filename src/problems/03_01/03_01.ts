import { time, timeEnd } from "../../utils/time";

export const solve03_01 = (input: string) => {
  time("solve03_01");

  const inputSplit = input.split("\n");

  const matrix = inputSplit.map((line) => line.split(""));

  let partNumberSum = 0;

  for (let i = 0; i < matrix.length; i++) {
    const line = matrix[i];
    for (let j = 0; j < line.length; j++) {
      const char = line[j];

      // Don't check non-numbers
      if (!isNumber(char)) continue;

      // Check all adjacents & diags
      let isPartNumber =
        isSymbol(matrix[i][j - 1]) ||
        isSymbol(matrix[i][j + 1]) ||
        isSymbol(matrix[i - 1]?.[j]) ||
        isSymbol(matrix[i + 1]?.[j]) ||
        isSymbol(matrix[i - 1]?.[j - 1]) ||
        isSymbol(matrix[i - 1]?.[j + 1]) ||
        isSymbol(matrix[i + 1]?.[j - 1]) ||
        isSymbol(matrix[i + 1]?.[j + 1]);

      if (!isPartNumber) continue;

      let startIndex = -1;

      // we found a valid number to include, need to find the start of the number and the end
      for (let k = j; k >= 0; k--) {
        if (k - 1 < 0 || !isNumber(matrix[i][k - 1])) {
          startIndex = k;
          break;
        }
      }

      if (startIndex === -1) throw new Error("Could not find start index");

      let endIndex = null;

      for (let k = startIndex; k < line.length; k++) {
        if (k + 1 >= line.length || !isNumber(matrix[i][k + 1])) {
          endIndex = k;
          break;
        }
      }

      if (startIndex === null || endIndex === null)
        throw new Error("Could not find start or end index");

      // Get the full number start to finish
      const number = line.slice(startIndex, endIndex + 1).join("");

      partNumberSum += parseInt(number);

      // Skip ahead in our iteration to ending index of the number
      j = endIndex + 1;
    }
  }

  timeEnd("solve03_01");

  return partNumberSum;
};

function isSymbol(char: string) {
  if (!char) return false;
  return char.match(/[^a-zA-Z0-9\.]+/) !== null;
}

function isNumber(char: string) {
  return !isNaN(parseInt(char));
}
