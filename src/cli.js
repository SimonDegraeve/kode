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
    process.exit(1);
  }
}


/**
 *
 */
if (!module.parent) {
  runProgram();
}
