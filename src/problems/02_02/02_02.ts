import { time, timeEnd } from "../../utils/time";
import { Colors } from "./fixtures/input";

export const solve02_02 = (input: string) => {
  time("solve02_02");
  const power = input.split("\n").reduce((acc, line) => {
    const powerForGame = Object.values(Colors).reduce((acc, color) => {
      return (
        acc *
        Math.max(
          ...(line?.match(new RegExp(`(\\d+) ${color}`, "g")) ?? [])?.map((i) =>
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
