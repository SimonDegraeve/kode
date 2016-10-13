#!/usr/bin/env node


/**
 *
 */
import createCli from 'meow';
import COMMANDS from './commands';
import runCommand from './index';


/**
 *
 */
const cli = createCli(`
  Usage
    $ kode <command> <options>

    Command can be:
      ${Object.keys(COMMANDS).join(' | ')}

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
    if (!commandKey) cli.showHelp();
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
