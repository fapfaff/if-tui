import {CompositeState} from '../../../../cli/state';
import {CloudVendorState} from '../../../../cli/states/cloud-vendor-state';
import {TuiManager} from '../../../../cli/tui-manager';
import {Answer} from '../../../../types/answer';

describe('CloudVendorState', () => {
  let context: CompositeState;
  let componentPath: string[];
  let cloudVendorState: CloudVendorState;

  beforeEach(() => {
    context = new TuiManager();
    componentPath = ['a', 'b'];
    cloudVendorState = new CloudVendorState(context, componentPath);
  });

  it('should create an instance of CloudVendorState', () => {
    expect(cloudVendorState).toBeInstanceOf(CloudVendorState);
  });

  it('should set the component path', () => {
    expect(cloudVendorState.componentPath).toEqual(componentPath);
  });

  it('should throw when path missing', () => {
    expect(() => cloudVendorState.handleAnswer('aws' as Answer)).toThrow();
  });

  it('should add the CloudCarbonFootprint plugin to the initialize section', () => {
    cloudVendorState.getManifestBuilder().setNodeAtPath(componentPath, {});
    cloudVendorState.handleAnswer('aws' as Answer);

    expect(
      cloudVendorState.getManifestBuilder().build().initialize.plugins
    ).toEqual({
      ccf: {
        path: '@grnsft/if-unofficial-models',
        method: 'CloudCarbonFootprint',
      },
    });
  });

  it('should configure defaults of the node', () => {
    cloudVendorState.getManifestBuilder().setNodeAtPath(componentPath, {});
    cloudVendorState.handleAnswer('aws' as Answer);

    expect(
      cloudVendorState.getManifestBuilder().build().tree.children.a.children.b
        .defaults
    ).toEqual({
      'cloud/vendor': 'aws',
    });
  });

  it('should configure the pipeline of the node', () => {
    cloudVendorState.getManifestBuilder().setNodeAtPath(componentPath, {});
    cloudVendorState.handleAnswer('aws' as Answer);

    expect(
      cloudVendorState.getManifestBuilder().build().tree.children.a.children.b
        .pipeline
    ).toEqual(['ccf']);
  });
});
