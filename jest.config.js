module.exports = {
  roots: [
    '<rootDir>/src',
  ],
  testRegex: '(/_tests_/.*|(\\.|/)(test|spec))\\.js$',
  moduleFileExtensions: [
    'js',
  ],
  setupFiles: ['jest-canvas-mock'],
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx}', '!**/node_modules/**', '!src/lib/**', '!src/canvas/constants.js'],
};
