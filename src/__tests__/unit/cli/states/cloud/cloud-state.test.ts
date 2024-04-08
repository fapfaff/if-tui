import {CompositeState} from '../../../../../cli/state';
import {CarbonIntensityState} from '../../../../../cli/states/carbon-intensity-state';
import {CloudInstanceState} from '../../../../../cli/states/cloud/cloud-instance-state';
import {CloudState} from '../../../../../cli/states/cloud/cloud-state';
import {CloudVendorState} from '../../../../../cli/states/cloud/cloud-vendor-state';
import {TuiManager} from '../../../../../cli/tui-manager';

describe('CloudState', () => {
  let context: CompositeState;
  let componentPath: string[];
  let cloudInstanceState: CloudState;

  beforeEach(() => {
    context = new TuiManager();
    componentPath = ['a', 'b'];
    cloudInstanceState = new CloudState(context, componentPath);
    cloudInstanceState.getManifestBuilder().setNodeAtPath(componentPath, {});
  });

  it('should create an instance of CloudVendorState', () => {
    expect(cloudInstanceState).toBeInstanceOf(CloudState);
  });

  it('should set the component path', () => {
    expect(cloudInstanceState.componentPath).toEqual(componentPath);
  });

  it('should add the CloudVendorState and CloudInstanceState to the state queue', () => {
    expect(cloudInstanceState.stateQueue).toHaveLength(3);
    expect(cloudInstanceState.stateQueue[0]).toBeInstanceOf(CloudVendorState);
    expect(cloudInstanceState.stateQueue[1]).toBeInstanceOf(CloudInstanceState);
    expect(cloudInstanceState.stateQueue[2]).toBeInstanceOf(
      CarbonIntensityState
    );
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

    cloudInstanceState.afterStateExecution();

    const manifest = cloudInstanceState.getManifestBuilder().build();
    expect(manifest.initialize.plugins).toEqual(
      expect.objectContaining({
        'sci-operational': sciOPlugin,
        sci: sciPlugin,
      })
    );
  });

  it('should add sci-operational and sci to the pipeline', () => {
    cloudInstanceState.afterStateExecution();

    const manifest = cloudInstanceState.getManifestBuilder().build();
    expect(manifest.tree.children.a.children.b.pipeline).toEqual(
      expect.arrayContaining(['sci-operational', 'sci'])
    );
  });
});
