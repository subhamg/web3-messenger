import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.ts"],
  verbose: false,
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
  roots: ["<rootDir>/src", "<rootDir>/tests"],
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { useESM: true }],
  },
};

export default config;
