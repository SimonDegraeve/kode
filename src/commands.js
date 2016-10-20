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
    cmd: require.resolve('.bin/eslint'),
    inputs: [BUILD_SRC],
  },

  test: {
    cmd: require.resolve('.bin/jest'),
    options: ['--coverage'],
  },

  clean: {
    cmd: require.resolve('.bin/rimraf'),
    inputs: [BUILD_DEST],
  },

  transpile: {
    cmd: require.resolve('.bin/babel'),
    options: ['--copy-files', '--out-dir', BUILD_DEST, '--ignore', '*.test.js,__*__'],
    inputs: [BUILD_SRC],
  },

  build: {
    cmd: ['clean', 'transpile'],
  },

  release: {
    cmd: require.resolve('.bin/terbit'),
    options: ['--changelog-preset', 'saya'],
  },

  'report-coverage': {
    cmd: require.resolve('.bin/codecov'),
    options: ['--file=node_modules/.coverage/lcov.info'],
  },

  changelog: {
    cmd: require.resolve('.bin/conventional-changelog'),
    options: ['--infile', 'CHANGELOG.md', '--same-file', '--preset', 'saya', '--release-count', 0],
  },
};
