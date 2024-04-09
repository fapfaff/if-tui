import {CompositeState} from '../../../../../cli/state';
import {OnPremiseState} from '../../../../../cli/states/on-premise/onpremise-state';
import {TuiManager} from '../../../../../cli/tui-manager';
import {BoaviztaCpuState} from '../../../../../cli/states/on-premise/boavizta-cpu-state';

describe('CpuNameState', () => {
  let context: CompositeState;
  let componentPath: string[];
  let onPremiseState: OnPremiseState;

  beforeEach(() => {
    context = new TuiManager();
    componentPath = ['a', 'b'];
    onPremiseState = new OnPremiseState(context, componentPath);
    onPremiseState.getManifestBuilder().setNodeAtPath(componentPath, {});
  });

  it('should create an instance of OnPremiseState', () => {
    expect(onPremiseState).toBeInstanceOf(OnPremiseState);
  });

  it('should add states to the queue', () => {
    expect(onPremiseState.stateQueue[0]).toEqual(expect.any(BoaviztaCpuState));
  });

  it('should add sci and sci-o to the initialization', () => {
    const sciElugin = {
      path: '@grnsft/if-plugins',
      method: 'SciE',
    };
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

    onPremiseState.afterStateExecution();

    const manifest = onPremiseState.getManifestBuilder().build();
    expect(manifest.initialize.plugins).toEqual(
      expect.objectContaining({
        'sci-energy': sciElugin,
        'sci-operational': sciOPlugin,
        sci: sciPlugin,
      })
    );
  });

  it('should add sci-operational and sci to the pipeline', () => {
    onPremiseState.afterStateExecution();

    const manifest = onPremiseState.getManifestBuilder().build();
    expect(manifest.tree.children.a.children.b.pipeline).toEqual(
      expect.arrayContaining(['sci-operational', 'sci'])
    );
  });
});
