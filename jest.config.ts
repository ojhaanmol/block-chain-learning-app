module.exports = {
  preset: "ts-jest", // Use ts-jest preset for TypeScript
  testEnvironment: "node", // Set the test environment
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Transform TypeScript files
  },
  transformIgnorePatterns: [
    "node_modules/(?!@some-esm-package)", // If you need to transform any ESM packages, include them here
  ],
  extensionsToTreatAsEsm: [".ts"], // Treat .ts files as ES Modules
};
