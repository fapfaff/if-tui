import {BackendState} from '../../../../cli/states/backend-state';
import {TuiManager} from '../../../../cli/tui-manager';

describe('BackendState', () => {
  it('should set the component path correctly', () => {
    const componentPath = ['backend'];
    const state = new BackendState(new TuiManager(), componentPath);

    expect(state.componentPath).toEqual(componentPath);
  });
});
