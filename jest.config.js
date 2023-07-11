/** @type {import('jest').Config} */
const config = {
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  roots: ['<rootDir>/src'],
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
};

module.exports = config;
