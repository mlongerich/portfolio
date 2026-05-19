module.exports = {
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/src/test/setup.js'],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.css$': '<rootDir>/src/test/cssStub.cjs',
  },
  testMatch: ['**/src/**/*.test.[jt]s?(x)'],
};
