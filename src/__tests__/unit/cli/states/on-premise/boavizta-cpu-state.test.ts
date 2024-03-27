import {CompositeState} from '../../../../../cli/state';
import {BoaviztaCpuState} from '../../../../../cli/states/on-premise/boavizta-cpu-state';
import {CpuCoresState} from '../../../../../cli/states/on-premise/cpu-cores-state';
import {CpuLifespanState} from '../../../../../cli/states/on-premise/cpu-lifespan-state';
import {CpuNameState} from '../../../../../cli/states/on-premise/cpu-name-state';
import {TuiManager} from '../../../../../cli/tui-manager';

describe('BoaviztaCpuState', () => {
  let context: CompositeState;
  let componentPath: string[];
  let boaviztaCpuState: BoaviztaCpuState;

  beforeEach(() => {
    context = new TuiManager();
    componentPath = ['a', 'b'];
    boaviztaCpuState = new BoaviztaCpuState(context, componentPath);
    boaviztaCpuState.getManifestBuilder().setNodeAtPath(componentPath, {});
  });

  it('should create an instance of BoaviztaCpuState', () => {
    expect(boaviztaCpuState).toBeInstanceOf(BoaviztaCpuState);
  });

  it('should add states to the queue', () => {
    expect(boaviztaCpuState.stateQueue[0]).toEqual(expect.any(CpuNameState));
    expect(boaviztaCpuState.stateQueue[1]).toEqual(expect.any(CpuCoresState));
    expect(boaviztaCpuState.stateQueue[2]).toEqual(
      expect.any(CpuLifespanState)
    );
  });

  it('should add inputs to the node', () => {
    boaviztaCpuState.afterStateExecution();

    const manifest = boaviztaCpuState.getManifestBuilder().build();
    expect(
      manifest.tree.children.a.children.b.inputs[0]['cpu/utilization']
    ).toBeDefined();
  });

  it('should set cpu/utilization as input of the node', () => {
    boaviztaCpuState.afterStateExecution();

    const manifest = boaviztaCpuState.getManifestBuilder().build();
    expect(
      manifest.tree.children.a.children.b.inputs[0]['cpu/utilization']
    ).toBeDefined();
  });

  it('should set timestamp and duration as input of the node', () => {
    boaviztaCpuState.afterStateExecution();

    const manifest = boaviztaCpuState.getManifestBuilder().build();
    expect(
      manifest.tree.children.a.children.b.inputs[0].timestamp
    ).toBeDefined();
    expect(
      manifest.tree.children.a.children.b.inputs[0].duration
    ).toBeDefined();
  });

  it('should add boavizta-cpu to the initialization', () => {
    const boaviztaPlugin = {
      path: '@grnsft/if-unofficial-plugins',
      method: 'BoaviztaCpuOutput',
      'global-config': {
        allocation: 'linear',
        verbose: true,
      },
    };

    boaviztaCpuState.afterStateExecution();

    const manifest = boaviztaCpuState.getManifestBuilder().build();
    expect(manifest.initialize.plugins).toEqual(
      expect.objectContaining({'boavizta-cpu': boaviztaPlugin})
    );
  });

  it('should add boavizta to the pipeline', () => {
    boaviztaCpuState.afterStateExecution();

    const manifest = boaviztaCpuState.getManifestBuilder().build();
    expect(manifest.tree.children.a.children.b.pipeline).toContain(
      'boavizta-cpu'
    );
  });
});
