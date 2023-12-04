import { sampleInput03_01, sampleResult03_01 } from "./fixtures/sample";
import { solve03_01 } from "./03_01";

describe("solve03_01", () => {
  it("should solve the example", () => {
    const sum = solve03_01(sampleInput03_01);
    expect(sum).toBe(sampleResult03_01);
  });
});
