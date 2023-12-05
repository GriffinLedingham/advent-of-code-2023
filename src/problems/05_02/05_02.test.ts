import { sampleInput05_02, sampleResult05_02 } from "./fixtures/sample";
import { solve05_02 } from "./05_02";

describe("solve05_02", () => {
  it("should solve the example", () => {
    const sum = solve05_02(sampleInput05_02);
    expect(sum).toBe(sampleResult05_02);
  });
});
