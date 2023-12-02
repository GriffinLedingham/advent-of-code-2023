import { sampleInput02_01, sampleResult02_01 } from "./fixtures/sample";
import { solve02_01 } from "./02_01";

describe("solve02_02", () => {
  it("should solve the example", () => {
    const sum = solve02_01(sampleInput02_01);
    expect(sum).toBe(sampleResult02_01);
  });
});
