export default {
  rootDir: '.',
  runner: 'jest-electron/runner',
  testEnvironment: 'jest-electron/environment',
  transform: {
    '^.+\\.[t|j]s?$': 'babel-jest'
  },
  setupFiles: ['./test/setup.js'],
  collectCoverageFrom: ['./src/*.js']
};
