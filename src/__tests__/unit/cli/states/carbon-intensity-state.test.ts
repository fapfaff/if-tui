import {CompositeState} from '../../../../cli/state';
import {CarbonIntensityState} from '../../../../cli/states/carbon-intensity-state';
import {TuiManager} from '../../../../cli/tui-manager';
import {Answer} from '../../../../types/answer';

describe('CpuLifespanState', () => {
  let context: CompositeState;
  let componentPath: string[];
  let carbonIntensityState: CarbonIntensityState;

  beforeEach(() => {
    context = new TuiManager();
    componentPath = ['a', 'b'];
    carbonIntensityState = new CarbonIntensityState(context, componentPath);
  });

  it('should create an instance of CarbonIntensityState', () => {
    expect(carbonIntensityState).toBeInstanceOf(CarbonIntensityState);
  });

  it('should set the component path', () => {
    expect(carbonIntensityState.componentPath).toEqual(componentPath);
  });

  it('should throw when path missing', () => {
    expect(() => carbonIntensityState.handleAnswer('16' as Answer)).toThrow();
  });

  it('should throw when answer is not a number', () => {
    expect(() =>
      carbonIntensityState.handleAnswer('sixteen' as Answer)
    ).toThrow();
  });

  it('should configure the grid/carbon-intensity as default in the node', () => {
    carbonIntensityState.getManifestBuilder().setNodeAtPath(componentPath, {});
    carbonIntensityState.handleAnswer('16' as Answer);

    expect(
      carbonIntensityState.getManifestBuilder().build().tree.children.a.children
        .b.defaults
    ).toEqual({
      'grid/carbon-intensity': 16,
    });
  });
});
