import {AppState} from '../../../../cli/states/app-state';
import {HasBackendState} from '../../../../cli/states/has-backend-state';
import {TuiManager} from '../../../../cli/tui-manager';

describe('AppState', () => {
  it('should add HasBackendState to the queue', () => {
    const context = new TuiManager();
    const state = new AppState(context);

    expect(state.stateQueue).toContainEqual(expect.any(HasBackendState));
  });

  it('should set the build and client components in the manifest', async () => {
    const context = new TuiManager();
    const state = new AppState(context);

    await state.beforeStateExecution();

    const manifest = state.getManifestBuilder().build();
    expect(manifest.tree.children.build).toBeDefined();
    expect(manifest.tree.children.client).toBeDefined();
  });
});
