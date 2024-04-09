import {MlState} from '../../../../cli/states/ml-state';
import {TuiManager} from '../../../../cli/tui-manager';

describe('MlState', () => {
  it('should set data, training and inference components in the manifest', async () => {
    const context = new TuiManager();
    const state = new MlState(context);

    await state.beforeStateExecution();

    const manifest = state.getManifestBuilder().build();
    expect(manifest.tree.children.training).toBeDefined();
    expect(manifest.tree.children.data).toBeDefined();
    expect(manifest.tree.children.inference).toBeDefined();
  });
});
