module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Resolve @ paths to src
    '\\.(jpg|jpeg|png|gif|webp|avif|svg)$': '<rootDir>/__mocks__/fileMock.js', // Mock image files
  },
  transformIgnorePatterns: [
    'node_modules/(?!(some-esm-library)/)',  // Allow transformation of certain ESM dependencies
  ],
};

// module.exports = {
//   testEnvironment: 'jest-environment-jsdom',
//   transform: {
//     "^.+\\.tsx?$": "ts-jest",  // Use ts-jest for TypeScript files
//   },
//   moduleNameMapper: {
//     // Correct the regex mapping for the '@' alias
//     '^@/(.*)$': '<rootDir>/src/$1', // This line should map '@' to the 'src' folder.
//     '\\.(jpg|jpeg|png|gif|webp|avif|svg)$': '<rootDir>/__mocks__/fileMock.js',  // Mock image files
//   },
//   transformIgnorePatterns: [
//     'node_modules/(?!(some-esm-library)/)',  // Allow transformation of certain ESM dependencies
//   ],
// };
