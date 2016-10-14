/**
 *
 */
const BUILD_SRC = process.env.BUILD_SRC || 'src';
const BUILD_DEST = process.env.BUILD_DEST || 'lib';


/**
 *
 */
export default {
  lint: {
    cmd: 'eslint',
    inputs: [BUILD_SRC],
  },

  test: {
    cmd: 'jest',
    options: ['--coverage'],
  },

  clean: {
    cmd: 'rimraf',
    inputs: [BUILD_DEST],
  },

  transpile: {
    cmd: 'babel',
    options: ['--copy-files', '--out-dir', BUILD_DEST, '--ignore', '*.test.js,__*__'],
    inputs: [BUILD_SRC],
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
    options: ['--file=node_modules/.coverage/lcov.info'],
  },

  changelog: {
    cmd: 'conventional-changelog',
    options: ['--infile', 'CHANGELOG.md', '--same-file', '--preset', 'saya', '--release-count', 0],
  },
};
