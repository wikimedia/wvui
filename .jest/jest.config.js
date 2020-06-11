module.exports = {
  rootDir: '..',
  transform: {
    '.+\\.ts$': 'ts-jest',
    '.+\\.vue$': 'vue-jest',
    '^.+\\.(c|le)ss$': '<rootDir>/.jest/ignoreTransform.js',
  },
  'snapshotResolver': '<rootDir>/.jest/snapshotResolver.js',
  'setupFiles': [
    '<rootDir>/.jest/jest.setup.js'
  ],
  collectCoverage: true,
  collectCoverageFrom: [
      '<rootDir>/src/**/*.(ts|vue)',
      '!<rootDir>/src/**/*.(test|snap).ts',
      '!<rootDir>/node_modules/**',

  ],
  coverageDirectory: '<rootDir>/coverage',
}
