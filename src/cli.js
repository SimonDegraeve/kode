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
    $ kode <command>

    Version can be:
      patch | minor | major | prepatch | preminor | premajor | prerelease | 1.2.3

  Options


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


/**
 *
 */
if (!module.parent) {
  runProgram();
}
