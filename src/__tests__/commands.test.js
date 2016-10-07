/**
 *
 */
import exec from 'execa';
import runCommand from '../commands';


/**
 *
 */
describe('CommandRunner', () => {
  afterEach(() => jest.clearAllMocks());

  it('throws with invalid command', async () => {
    try {
      await runCommand();
    }
    catch (error) {
      expect(error.message).toBe('Command should be one of lint, test, clean, transpile, build, release, report-coverage.');
    }
  });

  it('runs a valid command', async () => {
    await runCommand('lint');
    expect(exec.stdout).toHaveBeenCalledWith('eslint', ['src'], { env: { FORCE_COLOR: 'true' } });
    expect(exec.stdout).toHaveBeenCalledTimes(1);
  });

  it('runs a bunch of subCommands', async () => {
    await runCommand('build');
    expect(exec.stdout).toHaveBeenCalledTimes(2);
  });
});
