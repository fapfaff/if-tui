import {CompositeState} from '../../../../../cli/state';
import {CpuNameState} from '../../../../../cli/states/on-premise/cpu-name-state';
import {TuiManager} from '../../../../../cli/tui-manager';
import {Answer} from '../../../../../types/answer';

describe('CpuNameState', () => {
  let context: CompositeState;
  let componentPath: string[];
  let cpuNameState: CpuNameState;

  beforeEach(() => {
    context = new TuiManager();
    componentPath = ['a', 'b'];
    cpuNameState = new CpuNameState(context, componentPath);
  });

  it('should create an instance of CpuNameState', () => {
    expect(cpuNameState).toBeInstanceOf(CpuNameState);
  });

  it('should set the component path', () => {
    expect(cpuNameState.componentPath).toEqual(componentPath);
  });

  it('should throw when path missing', () => {
    expect(() =>
      cpuNameState.handleAnswer('Intel® Core™ i7-1185G7' as Answer)
    ).toThrow();
  });

  it('should configure defaults of the node', () => {
    cpuNameState.getManifestBuilder().setNodeAtPath(componentPath, {});
    cpuNameState.handleAnswer('Intel® Core™ i7-1185G7' as Answer);

    expect(
      cpuNameState.getManifestBuilder().build().tree.children.a.children.b
        .defaults
    ).toEqual({
      'cpu/name': 'Intel® Core™ i7-1185G7',
    });
  });
});
