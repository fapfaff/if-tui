import {CompositeState} from '../../../../cli/state';
import {OnPremiseState} from '../../../../cli/states/onpremise-state';
import {TuiManager} from '../../../../cli/tui-manager';
import {BoaviztaCpuState} from '../../../../cli/states/boavizta-cpu-state';

describe('CpuNameState', () => {
  let context: CompositeState;
  let componentPath: string[];
  let onPremiseState: OnPremiseState;

  beforeEach(() => {
    context = new TuiManager();
    componentPath = ['a', 'b'];
    onPremiseState = new OnPremiseState(context, componentPath);
  });

  it('should create an instance of OnPremiseState', () => {
    expect(onPremiseState).toBeInstanceOf(OnPremiseState);
  });

  it('should add states to the queue', () => {
    expect(onPremiseState.stateQueue[0]).toEqual(expect.any(BoaviztaCpuState));
  });
});
