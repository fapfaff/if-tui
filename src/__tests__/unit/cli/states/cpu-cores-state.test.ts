import {CompositeState} from '../../../../cli/state';
import {CpuCoresState} from '../../../../cli/states/cpu-cores-state';
import {TuiManager} from '../../../../cli/tui-manager';
import {Answer} from '../../../../types/answer';

describe('CpuCoresState', () => {
  let context: CompositeState;
  let componentPath: string[];
  let cpuCoresState: CpuCoresState;

  beforeEach(() => {
    context = new TuiManager();
    componentPath = ['a', 'b'];
    cpuCoresState = new CpuCoresState(context, componentPath);
  });

  it('should create an instance of CpuCoresState', () => {
    expect(cpuCoresState).toBeInstanceOf(CpuCoresState);
  });

  it('should set the component path', () => {
    expect(cpuCoresState.componentPath).toEqual(componentPath);
  });

  it('should throw when path missing', () => {
    expect(() => cpuCoresState.handleAnswer('16' as Answer)).toThrow();
  });

  it('should throw when answer is not a number', () => {
    expect(() => cpuCoresState.handleAnswer('sixteen' as Answer)).toThrow();
  });

  it('should configure defaults of the node', () => {
    cpuCoresState.getManifestBuilder().setNodeAtPath(componentPath, {});
    cpuCoresState.handleAnswer('16' as Answer);

    expect(
      cpuCoresState.getManifestBuilder().build().tree.children.a.children.b
        .defaults
    ).toEqual({
      'cpu/number-cores': 16,
    });
  });
});
