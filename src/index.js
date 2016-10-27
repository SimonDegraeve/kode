/**
 *
 */
import exec from 'execa';
import toArgs from 'dargs';
import COMMANDS from './commands';


/**
 *
 */
export default async function runCommand(commandKey, inputs = [], options = {}) {
  const command = COMMANDS[commandKey];

  if (!command) {
    throw new Error(`Command should be one of ${Object.keys(COMMANDS).join(', ')}.`);
  }

  if (Array.isArray(command.cmd)) {
    let sequence = Promise.resolve();
    command.cmd.forEach(subCommand => {
      sequence = sequence.then(() => runCommand(subCommand));
    });
    return sequence;
  }

  const mergedInputs = [...command.inputs || [], ...inputs];
  const mergedOptions = [...command.options || [], ...toArgs(options)];

  return exec(command.cmd, [...mergedOptions, ...mergedInputs], {
    stdio: 'inherit',
    env: { ...process.env, FORCE_COLOR: 'true' },
  });
}
