import {CompositeState} from '../../../../cli/state';
import {BackendState} from '../../../../cli/states/backend-state';
import {HostingState} from '../../../../cli/states/hosting-state';
import {TuiManager} from '../../../../cli/tui-manager';

describe('BackendState', () => {
  let context: CompositeState;
  let componentPath: string[];
  let backendState: BackendState;

  beforeEach(() => {
    context = new TuiManager();
    componentPath = ['a', 'b'];
    backendState = new BackendState(context, componentPath);
    backendState.getManifestBuilder().setNodeAtPath(componentPath, {});
  });

  it('should create an instance of BackendState', () => {
    expect(backendState).toBeInstanceOf(BackendState);
  });

  it('should add states to the queue', () => {
    expect(backendState.stateQueue[0]).toEqual(expect.any(HostingState));
  });

  it('should set the component path correctly', () => {
    const componentPath = ['backend'];
    const state = new BackendState(new TuiManager(), componentPath);

    expect(state.componentPath).toEqual(componentPath);
  });
});
