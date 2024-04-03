import {CompositeState} from '../../../../cli/state';
import {TimeSyncState} from '../../../../cli/states/timesync-state';
import {TuiManager} from '../../../../cli/tui-manager';

describe('TimeSyncState', () => {
  let context: CompositeState;
  let timeSyncState: TimeSyncState;

  beforeEach(() => {
    context = new TuiManager();
    timeSyncState = new TimeSyncState(context);

    const tree = {
      children: {
        build: {},
        traffic: {
          pipeline: ['e-net', 'sci-energy', 'sci-operational', 'sci'],
          inputs: [
            {
              timestamp: '2023-12-12T00:00:00.000Z',
              duration: 1,
            },
          ],
        },
        client: {},
        backend: {
          children: {
            'backend-1': {
              defaults: {
                'cpu/name': 'Intel® Core™ i7-1185G7',
              },
              inputs: [
                {
                  timestamp: '2023-12-12T00:00:00.000Z',
                  duration: 1,
                },
              ],
              pipeline: [
                'boavizta-cpu',
                'e-mem',
                'sci-operational',
                'timesync',
                'sci',
              ],
            },
            'backend-2': {
              pipeline: ['sci'],
              inputs: [
                {
                  timestamp: '2023-12-12T00:00:00.000Z',
                  duration: 1,
                },
              ],
            },
          },
        },
      },
    };

    timeSyncState.getManifestBuilder().setNodeAtPath([], tree);
  });

  it('should create an instance of TimeSyncState', () => {
    expect(timeSyncState).toBeInstanceOf(TimeSyncState);
  });

  it('should not contain substates', () => {
    expect(timeSyncState.stateQueue).toEqual([]);
  });

  it('should add to every non-empty components pipeline', () => {
    timeSyncState.getManifestBuilder().setNodeAtPath(['backend'], {
      children: {
        'backend-1': {
          pipeline: ['boavizta-cpu', 'e-mem', 'sci-operational', 'sci'],
        },
        'backend-2': {
          pipeline: ['sci'],
        },
        empty: {},
      },
    });

    timeSyncState.afterStateExecution();

    const manifest = timeSyncState.getManifestBuilder().build();
    console.log(manifest);
    expect(
      manifest.tree.children.backend.children['backend-1'].pipeline
    ).toEqual(['boavizta-cpu', 'e-mem', 'sci-operational', 'timesync', 'sci']);
    expect(
      manifest.tree.children.backend.children['backend-2'].pipeline
    ).toEqual(['timesync', 'sci']);
    expect(
      manifest.tree.children.backend.children.empty.pipeline
    ).toBeUndefined();
  });

  it('should add timesync before sci plugin', () => {
    timeSyncState.getManifestBuilder().setNodeAtPath(['traffic'], {
      pipeline: ['e-net', 'sci-energy', 'sci-operational', 'sci'],
    });
    timeSyncState.afterStateExecution();

    const manifest = timeSyncState.getManifestBuilder().build();
    expect(manifest.tree.children.traffic.pipeline).toEqual([
      'e-net',
      'sci-energy',
      'sci-operational',
      'timesync',
      'sci',
    ]);
  });

  it('should add the TimeSync plugin to the initialize section of the manifest', () => {
    timeSyncState.afterStateExecution();

    const manifest = timeSyncState.getManifestBuilder().build();
    expect(manifest.initialize.plugins).toEqual(
      expect.objectContaining({
        timesync: {
          path: 'builtin',
          method: 'TimeSync',
          'global-config': {
            'start-time':
              'TODO: Start time for evaluation as ISO timestamp (e.g. 2023-12-12T00:00:00.000Z)',
            'end-time':
              'TODO: End time for evaluation as ISO timestamp (e.g. 2023-12-12T00:01:00.000Z)',
            interval: 5,
          },
        },
      })
    );
  });
});
