import { sampleInput01_02, sampleResult01_02 } from "./fixtures/sample";
import { solve01_02 } from "./01_02";
import { sampleInput01_01, sampleResult01_01 } from "../01_01/fixtures/sample";

// Part 2 should still pass the part 1 tests
describe("solve01_01", () => {
  it("should solve the example", () => {
    const sum = solve01_02(sampleInput01_01);
    expect(sum).toBe(sampleResult01_01);
  });
});
describe("solve01_02", () => {
  it("should solve the example", () => {
    const sum = solve01_02(sampleInput01_02);
    expect(sum).toBe(sampleResult01_02);
  });

  it("should properly handle 7ninesevennine as 79", () => {
    const sum = solve01_02("7ninesevennine");
    expect(sum).toBe(79);
  });
});
