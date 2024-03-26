import {CompositeState} from '../../../../../cli/state';
import {CountryState} from '../../../../../cli/states/country-state';
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
    expect(boaviztaCpuState.stateQueue[3]).toEqual(expect.any(CountryState));
  });

  it('should add inputs to the node', () => {
    boaviztaCpuState.getManifestBuilder().setNodeAtPath(componentPath, {});

    boaviztaCpuState.beforeStateExecution();

    const manifest = boaviztaCpuState.getManifestBuilder().build();
    expect(
      manifest.tree.children.a.children.b.inputs[0]['cpu/utilization']
    ).toBeDefined();
  });
});
