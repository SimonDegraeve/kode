/**
 *
 */
jest.mock('execa', () => exec);
import exec from 'execa-jest-mock';
import runCommand from './';


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
    await runCommand('test');
    expect(exec).toHaveBeenCalledTimes(1);
    expect(exec.mock.calls[0][0]).toMatch(/\.bin\/jest/);
  });

  it('runs a bunch of subCommands', async () => {
    await runCommand('build');
    expect(exec).toHaveBeenCalledTimes(2);
  });

  it('uses CLI flags', async () => {
    await runCommand('lint', ['lib'], { fix: true });
    expect(exec).toHaveBeenCalledTimes(1);
    expect(exec.mock.calls[0][0]).toMatch(/\.bin\/eslint/);
    expect(exec.mock.calls[0]).toContainEqual(['--fix', 'src', 'lib']);
  });
});
