import { time, timeEnd } from "../../utils/time";

const stringNums = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
} as const;

export const solve01_02 = (input: string) => {
  time("solve01_02");

  const lines = input.split("\n");
  let sum = 0;

  for (const lineIndex in lines) {
    let line = lines[lineIndex];
    let splitLine = line.split("");

    let parsedNumericLine = "";

    for (let charIndex = 0; charIndex < splitLine.length; charIndex++) {
      for (let stringNum in stringNums) {
        if (!isNaN(parseInt(splitLine[charIndex]))) {
          parsedNumericLine += splitLine[charIndex];
          continue;
        }
        if (charIndex === line.indexOf(stringNum)) {
          // Swap out the first char of the string to break future indexOf finds. hacky.. lol
          // this is to support lines in the input like: 7ninesevennine to attribue both 7 and 9 at the end
          line =
            line.substring(0, charIndex) + "-" + line.substring(charIndex + 1);
          parsedNumericLine +=
            stringNums[stringNum as keyof typeof stringNums].toString();
        }
      }
    }

    const calibrationValues = `${parsedNumericLine.charAt(
      0
    )}${parsedNumericLine.charAt(parsedNumericLine.length - 1)}`;

    sum += parseInt(calibrationValues);
  }
  timeEnd("solve01_02");
  return sum;
};
