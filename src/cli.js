#!/usr/bin/env node


/**
 *
 */
import createCli from 'meow';
import runCommand from './index';


/**
 *
 */
const cli = createCli(`
  Usage
    $ kode <command> <options>

    Command can be:
      lint | test | clean | transpile | build | release | report-coverage

  Examples
    $ kode lint
    $ kode test --watch
`);


/**
 *
 */
async function runProgram() {
  try {
    const [commandKey, ...inputs] = cli.input;
    await runCommand(commandKey, inputs, cli.flags);
  }
  catch (error) {
    console.log(error.stdout || error.stderr || error.message);  // eslint-disable-line no-console
    process.exit(1);
  }
}

console.log(cli);


/**
 *
 */
if (!module.parent) {
  runProgram();
}
