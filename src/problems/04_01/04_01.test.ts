import { sampleInput04_01, sampleResult04_01 } from "./fixtures/sample";
import { solve04_01 } from "./04_01";

describe("solve04_01", () => {
  it("should solve the example", () => {
    const sum = solve04_01(sampleInput04_01);
    expect(sum).toBe(sampleResult04_01);
  });
});
