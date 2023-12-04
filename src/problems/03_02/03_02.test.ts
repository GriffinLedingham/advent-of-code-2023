import { sampleInput03_02, sampleResult03_02 } from "./fixtures/sample";
import { solve03_02 } from "./03_02";

describe("solve03_02", () => {
  it("should solve the example", () => {
    const sum = solve03_02(sampleInput03_02);
    expect(sum).toBe(sampleResult03_02);
  });
});
