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
      expect(error.message).toMatch(/Command should be one of/);
    }
  });

  it('runs a valid command', async () => {
    await runCommand('lint');
    expect(exec).toHaveBeenCalledTimes(1);
    expect(exec.mock.calls[0]).toContain('eslint');
    expect(exec.mock.calls[0]).toContainEqual(['src']);
  });

  it('runs a bunch of subCommands', async () => {
    await runCommand('build');
    expect(exec).toHaveBeenCalledTimes(2);
  });

  it('uses CLI flags', async () => {
    await runCommand('lint', ['lib'], { fix: true });
    expect(exec).toHaveBeenCalledTimes(1);
    expect(exec.mock.calls[0]).toContain('eslint');
    expect(exec.mock.calls[0]).toContainEqual(['--fix', 'src', 'lib']);
  });
});
