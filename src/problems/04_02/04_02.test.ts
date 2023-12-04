import { sampleInput04_02, sampleResult04_02 } from "./fixtures/sample";
import { solve04_02 } from "./04_02";

describe("solve04_02", () => {
  it("should solve the example", () => {
    const sum = solve04_02(sampleInput04_02);
    expect(sum).toBe(sampleResult04_02);
  });
});
