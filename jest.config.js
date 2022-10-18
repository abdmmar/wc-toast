export default {
  rootDir: '.',
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    browsers: [
      'chrome',
      'firefox',
      'safari'
    ]
  },
  transform: {
    '^.+\\.[t|j]s?$': 'babel-jest'
  },
  setupFiles: ['./test/setup.js'],
  collectCoverageFrom: ['./src/*.js']
};
