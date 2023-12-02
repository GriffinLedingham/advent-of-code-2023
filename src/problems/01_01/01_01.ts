import { time, timeEnd } from "../../utils/time";

export const solve01_01 = (input: string) => {
  time("solve01_01");
  const lines = input.split("\n");
  let sum = 0;

  for (const line of lines) {
    const splitLine = line.split("");
    let calibrationValues = "";

    // Look left to right
    for (let charIndex = 0; charIndex < splitLine.length; charIndex++) {
      const char = splitLine[charIndex];
      if (!isNaN(parseInt(char))) {
        calibrationValues += char;
        break;
      }
    }

    // Look right to left
    for (
      let charIndexRev = splitLine.length - 1;
      charIndexRev >= 0;
      charIndexRev--
    ) {
      const char = splitLine[charIndexRev];
      if (!isNaN(parseInt(char))) {
        calibrationValues += char;
        break;
      }
    }

    sum += parseInt(calibrationValues);
  }
  timeEnd("solve01_01");
  return sum;
};
