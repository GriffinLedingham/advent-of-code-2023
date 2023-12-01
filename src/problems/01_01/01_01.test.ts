import { sampleInput01_01, sampleResult01_01 } from "./fixtures/sample";
import { solve01_01 } from "./01_01";

describe("solve01_01", () => {
  it("should solve the example", () => {
    const sum = solve01_01(sampleInput01_01);
    expect(sum).toBe(sampleResult01_01);
  });
});
