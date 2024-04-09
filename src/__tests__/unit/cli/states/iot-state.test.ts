import {HasBackendState} from '../../../../cli/states/has-backend-state';
import {IotState} from '../../../../cli/states/iot-state';
import {TuiManager} from '../../../../cli/tui-manager';

describe('IotState', () => {
  it('should add HasBackendState to the queue', () => {
    const context = new TuiManager();
    const state = new IotState(context);

    expect(state.stateQueue).toContainEqual(expect.any(HasBackendState));
  });

  it('should set thefirmware and hardware components in the manifest', async () => {
    const context = new TuiManager();
    const state = new IotState(context);

    await state.beforeStateExecution();

    const manifest = state.getManifestBuilder().build();
    expect(manifest.tree.children.firmware).toBeDefined();
    expect(manifest.tree.children.hardware).toBeDefined();
  });
});
