import {CompositeState} from '../../../../cli/state';
import {CloudInstanceState} from '../../../../cli/states/cloud-instance-state';
import {TuiManager} from '../../../../cli/tui-manager';
import {Answer} from '../../../../types/answer';

describe('CloudInstanceState', () => {
  let context: CompositeState;
  let componentPath: string[];
  let cloudInstanceState: CloudInstanceState;

  beforeEach(() => {
    context = new TuiManager();
    componentPath = ['a', 'b'];
    cloudInstanceState = new CloudInstanceState(context, componentPath);
  });

  it('should create an instance of CloudInstanceState', () => {
    expect(cloudInstanceState).toBeInstanceOf(CloudInstanceState);
  });

  it('should set the component path', () => {
    expect(cloudInstanceState.componentPath).toEqual(componentPath);
  });

  it('should throw when path missing', () => {
    expect(() =>
      cloudInstanceState.handleAnswer('t2.nano' as Answer)
    ).toThrow();
  });

  it('should configure defaults of the node', () => {
    cloudInstanceState.getManifestBuilder().setNodeAtPath(componentPath, {
      defaults: {
        'cloud/vendor': 'aws',
      },
    });
    cloudInstanceState.handleAnswer('t2.nano' as Answer);

    expect(
      cloudInstanceState.getManifestBuilder().build().tree.children.a.children.b
        .defaults
    ).toEqual(
      expect.objectContaining({
        'cloud/instance-type': 't2.nano',
      })
    );
  });

  it('should configure the inputs of the node', () => {
    cloudInstanceState.getManifestBuilder().setNodeAtPath(componentPath, {
      defaults: {
        'cloud/vendor': 'aws',
        'cloud/instance-type': 't2.nano',
      },
      inputs: [],
    });
    cloudInstanceState.handleAnswer('t2.nano' as Answer);

    expect(
      cloudInstanceState.getManifestBuilder().build().tree.children.a.children.b
        .inputs[0]
    ).toEqual(
      expect.objectContaining({
        'cpu/utilization': 'TODO: CPU usage as a percentage (e.g. 80)',
      })
    );
  });
});
