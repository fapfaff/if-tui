import {CompositeState} from '../../../../../cli/state';
import {MemoryState} from '../../../../../cli/states/on-premise/memory-state';
import {TuiManager} from '../../../../../cli/tui-manager';

describe('MemoryState', () => {
  let context: CompositeState;
  let componentPath: string[];
  let memoryState: MemoryState;

  beforeEach(() => {
    context = new TuiManager();
    componentPath = ['a', 'b'];
    memoryState = new MemoryState(context, componentPath);
    memoryState.getManifestBuilder().setNodeAtPath(componentPath, {});
  });

  it('should create an instance of MemoryState', () => {
    expect(memoryState).toBeInstanceOf(MemoryState);
  });

  it('should set the component path correctly', () => {
    expect(memoryState.componentPath).toEqual(componentPath);
  });

  it('should add e-mem plugin to the initialize section of the manifest', () => {
    memoryState.handleAnswer('16');
    const manifest = memoryState.getManifestBuilder().build();

    expect(manifest.initialize.plugins).toEqual(
      expect.objectContaining({
        'e-mem': {
          path: '@grnsft/if-plugins',
          method: 'EMem',
          'global-config': {
            'energy-per-gb': 0.000392,
          },
        },
      })
    );
  });

  it('should add e-mem plugin to the pipeline of the current node', () => {
    memoryState.handleAnswer('16');
    const manifest = memoryState.getManifestBuilder().build();

    expect(manifest.tree.children).toEqual(
      expect.objectContaining({
        a: expect.objectContaining({
          children: {
            b: expect.objectContaining({
              pipeline: ['e-mem'],
            }),
          },
        }),
      })
    );
  });

  it('should add the memory utilization to the component inputs', () => {
    memoryState.handleAnswer('16');
    const manifest = memoryState.getManifestBuilder().build();

    expect(manifest.tree.children.a.children.b.inputs[0]).toEqual(
      expect.objectContaining({
        'memory/utilization': 'TODO: memory utilization in percent',
      })
    );
  });

  it('should add the memory capacity to the component defaults', () => {
    memoryState.handleAnswer('16');
    const manifest = memoryState.getManifestBuilder().build();

    expect(manifest.tree.children.a.children.b.defaults).toEqual(
      expect.objectContaining({
        'memory/capacity': 16,
      })
    );
  });
});
