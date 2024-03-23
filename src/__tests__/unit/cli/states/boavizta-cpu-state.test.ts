import {CompositeState} from '../../../../cli/state';
import {BoaviztaCpuState} from '../../../../cli/states/boavizta-cpu-state';
import {CpuNameState} from '../../../../cli/states/cpu-name-state';
import {TuiManager} from '../../../../cli/tui-manager';

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
  });
});
