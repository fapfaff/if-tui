import {CompositeState} from '../../../../cli/state';
import {CountryState} from '../../../../cli/states/country-state';
import {TuiManager} from '../../../../cli/tui-manager';
import {Answer} from '../../../../types/answer';

describe('CountryState', () => {
  let context: CompositeState;
  let componentPath: string[];
  let countryState: CountryState;

  beforeEach(() => {
    context = new TuiManager();
    componentPath = ['a', 'b'];
    countryState = new CountryState(context, componentPath);
  });

  it('should create an instance of CountryState', () => {
    expect(countryState).toBeInstanceOf(CountryState);
  });

  it('should set the component path', () => {
    expect(countryState.componentPath).toEqual(componentPath);
  });

  it('should throw when path missing', () => {
    expect(() =>
      countryState.handleAnswer('Intel® Core™ i7-1185G7' as Answer)
    ).toThrow();
  });

  it('should configure defaults of the node', () => {
    countryState.getManifestBuilder().setNodeAtPath(componentPath, {});
    countryState.handleAnswer('DEU' as Answer);

    expect(
      countryState.getManifestBuilder().build().tree.children.a.children.b
        .defaults
    ).toEqual({
      country: 'DEU',
    });
  });

  it('should throw when answer is not a string', () => {
    expect(() => countryState.handleAnswer(16 as Answer)).toThrow();
  });

  it('should throw when answer is not a valid country code', () => {
    expect(() => countryState.handleAnswer('Deutschland' as Answer)).toThrow();
    expect(() => countryState.handleAnswer('DE' as Answer)).toThrow();
  });
});
