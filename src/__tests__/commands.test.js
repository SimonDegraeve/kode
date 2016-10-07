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
    expect(exec).toHaveBeenCalledTimes(1);
    expect(exec.mock.calls[0][0]).toBe('eslint');
    expect(exec.mock.calls[0][1]).toEqual(['src']);
  });

  it('runs a bunch of subCommands', async () => {
    await runCommand('build');
    expect(exec).toHaveBeenCalledTimes(2);
  });

  it('uses CLI flags', async () => {
    await runCommand('lint', ['lib'], { fix: true });
    expect(exec).toHaveBeenCalledTimes(1);
    expect(exec.mock.calls[0][0]).toBe('eslint');
    expect(exec.mock.calls[0][1]).toEqual(['--fix', 'src', 'lib']);
  });
});
