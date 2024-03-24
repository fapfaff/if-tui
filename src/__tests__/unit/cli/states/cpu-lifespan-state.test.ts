import {CompositeState} from '../../../../cli/state';
import {CpuLifespanState} from '../../../../cli/states/cpu-lifespan-state';
import {TuiManager} from '../../../../cli/tui-manager';
import {Answer} from '../../../../types/answer';

describe('CpuLifespanState', () => {
  let context: CompositeState;
  let componentPath: string[];
  let cpuLifespanState: CpuLifespanState;

  beforeEach(() => {
    context = new TuiManager();
    componentPath = ['a', 'b'];
    cpuLifespanState = new CpuLifespanState(context, componentPath);
  });

  it('should create an instance of CpuLifespanState', () => {
    expect(cpuLifespanState).toBeInstanceOf(CpuLifespanState);
  });

  it('should set the component path', () => {
    expect(cpuLifespanState.componentPath).toEqual(componentPath);
  });

  it('should throw when path missing', () => {
    expect(() => cpuLifespanState.handleAnswer('16' as Answer)).toThrow();
  });

  it('should throw when answer is not a number', () => {
    expect(() => cpuLifespanState.handleAnswer('sixteen' as Answer)).toThrow();
  });

  it('should configure the lifespan in seconds as default in the node', () => {
    cpuLifespanState.getManifestBuilder().setNodeAtPath(componentPath, {});
    cpuLifespanState.handleAnswer('16' as Answer);

    expect(
      cpuLifespanState.getManifestBuilder().build().tree.children.a.children.b
        .defaults
    ).toEqual({
      'cpu/lifespan': 16 * 365 * 24 * 60 * 60,
    });
  });

  it('should skip the lifespan configuration if the answer is empty', () => {
    cpuLifespanState
      .getManifestBuilder()
      .setNodeAtPath(componentPath, {defaults: {}});
    cpuLifespanState.handleAnswer('' as Answer);

    expect(
      cpuLifespanState.getManifestBuilder().build().tree.children.a.children.b
        .defaults
    ).toEqual({});
  });
});
