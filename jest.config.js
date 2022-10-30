// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async

const nextJest = require("next/jest");
const createJestConfig = nextJest({
  dir: "./",
});
const customJestConfig = {
  roots: ["<rootDir>"],
  modulePaths: ["<rootDir>"],
  moduleDirectories: ["node_modules", "src"],
  testEnvironment: "jest-environment-jsdom",
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/", "/.out/", "/public/"],
  setupFilesAfterEnv: ["<rootDir>/.jest/setup-tests.js"],
};
module.exports = createJestConfig(customJestConfig);
