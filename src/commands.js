/**
 *
 */
import exec from 'execa';
import toArgs from 'dargs';


/**
 *
 */
const COMMANDS = {
  lint: {
    bin: 'eslint',
    options: [],
    inputs: ['src'],
  },

  test: {
    bin: 'eslint',
    options: [],
    inputs: ['src'],
  },

  clean: {
    bin: 'rimraf',
    options: [],
    inputs: ['lib'],
  },

  transpile: {
    bin: 'babel',
    options: ['--copy-files', '--out-dir', 'lib', '--ignore', '*.test.js,__*__'],
    inputs: ['src'],
  },

  build: {
    bin: ['clean', 'transpile'],
    options: [],
    inputs: [],
  },

  release: {
    bin: 'terbit',
    options: ['--changelog-preset', 'saya'],
    inputs: [],
  },

  'report-coverage': {
    bin: 'codecov',
    options: [],
    inputs: [],
  },
};


/**
 *
 */
export default async function runCommand(commandKey, inputs = [], options = []) {
  const command = COMMANDS[commandKey];

  if (!command) {
    throw new Error(`Command should be one of ${Object.keys(COMMANDS).join(', ')}.`);
  }

  if (Array.isArray(command.bin)) {
    for (const subCommand of command.bin) {
      await runCommand(subCommand);
    }
  }
  else {
    await exec.stdout(
      command.bin,
      [...[...command.options, ...toArgs(options)], ...[...command.inputs, ...inputs]],
      { env: { FORCE_COLOR: 'true' } }
    );
  }
}
