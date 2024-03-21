import {WebState} from '../../../../cli/states/web-state';
import {WebTypeState} from '../../../../cli/states/web-type-state';
import {TuiManager} from '../../../../cli/tui-manager';

describe('WebState', () => {
  it('should add WebTypeState to the queue', () => {
    const context = new TuiManager();
    const state = new WebState(context);

    expect(state.stateQueue).toContainEqual(expect.any(WebTypeState));
  });

  it('should set the build, serve, client and traffic components in the manifest', async () => {
    const context = new TuiManager();
    const state = new WebState(context);

    await state.beforeStateExecution();

    const manifest = state.getManifestBuilder().build();
    expect(manifest.tree.children.build).toBeDefined();
    expect(manifest.tree.children.serve).toBeDefined();
    expect(manifest.tree.children.traffic).toBeDefined();
    expect(manifest.tree.children.client).toBeDefined();
  });
});
