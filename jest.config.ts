// jest.config.ts
import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  testMatch: ["**/*.test.ts", "**/*.test.tsx"],
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
};
export default config;
