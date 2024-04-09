import {promises} from 'fs';
import * as yaml from 'js-yaml';
import {TuiManager} from '../../../cli/tui-manager';

describe('TuiManager', () => {
  let tuiManager: TuiManager;

  beforeEach(() => {
    tuiManager = new TuiManager();
  });

  it('should create an instance of TuiManager', () => {
    expect(tuiManager).toBeInstanceOf(TuiManager);
  });

  it('should set the manifest file name', () => {
    const fileName = 'manifest.yaml';
    tuiManager.setManifestFileName(fileName);
    expect(tuiManager.manifestFileName).toBe(fileName);
  });

  it('should get the manifest builder', () => {
    const manifestBuilder = tuiManager.getManifestBuilder();
    expect(manifestBuilder).toBeDefined();
  });

  it('should write the manifest file after state execution', async () => {
    const writeFileSpy = jest
      .spyOn(promises, 'writeFile')
      .mockResolvedValueOnce();
    const dumpSpy = jest.spyOn(yaml, 'dump').mockReturnValueOnce('mocked yaml');

    tuiManager.setManifestFileName('manifest.yaml');
    tuiManager.afterStateExecution();

    expect(writeFileSpy).toHaveBeenCalledWith('manifest.yaml', 'mocked yaml');
    expect(dumpSpy).toHaveBeenCalledWith(tuiManager.manifestBuilder.build());
  });
});
