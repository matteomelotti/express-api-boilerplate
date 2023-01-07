export default {
  testEnvironment: "node",
  testEnvironmentOptions: {
    NODE_ENV: "test",
  },
  restoreMocks: true,
  coveragePathIgnorePatterns: ["node_modules", "index.js", "tests"],
  coverageReporters: ["text", "lcov", "clover", "html"],
  moduleFileExtensions: ["js", "json", "ts"],
  transform: {
    "^.+\\.(t|j)s$": "babel-jest",
  },
};
