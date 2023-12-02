import { sampleInput02_02, sampleResult02_02 } from "./fixtures/sample";
import { solve02_02 } from "./02_02";

describe("solve02_02", () => {
  it("should solve the example", () => {
    const sum = solve02_02(sampleInput02_02);
    expect(sum).toBe(sampleResult02_02);
  });
});
