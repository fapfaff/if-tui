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

  it('should add sci and sci-o to the initialization', () => {
    const sciOPlugin = {
      path: '@grnsft/if-plugins',
      method: 'SciO',
    };
    const sciPlugin = {
      path: '@grnsft/if-plugins',
      method: 'Sci',
      'global-config': {
        'functional-unit-time': '5 minutes',
      },
    };

    backendState.afterStateExecution();

    const manifest = backendState.getManifestBuilder().build();
    expect(manifest.initialize.plugins).toEqual(
      expect.objectContaining({
        'sci-operational': sciOPlugin,
        sci: sciPlugin,
      })
    );
  });

  it('should add sci-operational and sci to the pipeline', () => {
    backendState.afterStateExecution();

    const manifest = backendState.getManifestBuilder().build();
    expect(manifest.tree.children.a.children.b.pipeline).toEqual(
      expect.arrayContaining(['sci-operational', 'sci'])
    );
  });
});
