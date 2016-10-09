/**
 *
 */
export default {
  lint: {
    cmd: 'eslint',
    inputs: ['src'],
  },

  test: {
    cmd: 'jest',
    options: ['--config', '.jestrc', '--coverage'],
  },

  clean: {
    cmd: 'rimraf',
    inputs: ['lib'],
  },

  transpile: {
    cmd: 'babel',
    options: ['--copy-files', '--out-dir', 'lib', '--ignore', '*.test.js,__*__'],
    inputs: ['src'],
  },

  build: {
    cmd: ['clean', 'transpile'],
  },

  release: {
    cmd: 'terbit',
    options: ['--changelog-preset', 'saya'],
  },

  'report-coverage': {
    cmd: 'codecov',
  },

  changelog: {
    cmd: 'conventional-changelog',
    options: ['--infile', 'CHANGELOG.md', '--same-file', '--preset', 'saya', '--release-count', 0],
  },
};
