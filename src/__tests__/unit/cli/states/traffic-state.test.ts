import {CompositeState} from '../../../../cli/state';
import {TrafficState} from '../../../../cli/states/traffic-state';
import {TuiManager} from '../../../../cli/tui-manager';

describe('BackendState', () => {
  let context: CompositeState;
  let componentPath: string[];
  let trafficState: TrafficState;

  beforeEach(() => {
    context = new TuiManager();
    componentPath = ['a', 'b'];
    trafficState = new TrafficState(context, componentPath);
    trafficState.getManifestBuilder().setNodeAtPath(componentPath, {});
  });

  it('should create an instance of TrafficState', () => {
    expect(trafficState).toBeInstanceOf(TrafficState);
  });

  it('should set the component path correctly', () => {
    const componentPath = ['backend'];
    const state = new TrafficState(new TuiManager(), componentPath);

    expect(state.componentPath).toEqual(componentPath);
  });

  it('should add network inputs to the node', () => {
    trafficState.afterStateExecution();

    expect(
      trafficState.getManifestBuilder().build().tree.children.a.children.b
        .inputs[0]
    ).toEqual(
      expect.objectContaining({
        'network/data-in':
          'TODO: Inbound Traffic in GB during duration (e.g. 100)',
        'network/data-out':
          'TODO: Outbound Traffic in GB during duration (e.g. 100)',
        timestamp: 'TODO: Timestamp of the measurement',
        duration: 'TODO: Duration of the measurement',
      })
    );
  });

  it('should add plugins to the pipeline', () => {
    trafficState.afterStateExecution();

    const manifest = trafficState.getManifestBuilder().build();
    expect(manifest.tree.children.a.children.b.pipeline).toEqual([
      'e-net',
      'sci-energy',
      'sci-operational',
      'operational-to-carbon',
      'sci',
    ]);
  });
});
