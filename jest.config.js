/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testEnvironment: 'jest-environment-jsdom', // Use jsdom for DOM-related testing
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Ensure TypeScript and JSX files are transformed
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Resolve @ paths to src
  },
  transformIgnorePatterns: ['node_modules/(?!(some-esm-library)/)'], // Allow transformation of ESM dependencies if needed
};
