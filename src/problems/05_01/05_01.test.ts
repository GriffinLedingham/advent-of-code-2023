import { sampleInput05_01, sampleResult05_01 } from "./fixtures/sample";
import { solve05_01 } from "./05_01";

describe("solve05_01", () => {
  it("should solve the example", () => {
    const sum = solve05_01(sampleInput05_01);
    expect(sum).toBe(sampleResult05_01);
  });
});
