import { time, timeEnd } from "../../utils/time";
import { Colors } from "./fixtures/input";

export const solve02_02 = (input: string) => {
  time("solve02_02");
  // Sum all games' power
  const power = input.split("\n").reduce((acc, line) => {
    // Iterate through each game and find the multiplicitive power of the game
    const powerForGame = Object.values(Colors).reduce((acc, color) => {
      return (
        acc *
        // Max all occurences of the color in the line
        Math.max(
          // Math all occurences of the color in the line
          ...(line?.match(new RegExp(`(\\d+) ${color}`, "g")) ?? [])?.map((i) =>
            // Parse the number from the match
            parseInt(i.replace(` ${color}`, ""))
          )
        )
      );
    }, 1);
    return (acc += powerForGame);
  }, 0);
  timeEnd("solve02_02");
  return power;
};
