import {SingleChoiceQuestion} from '../../../../../cli/question';
import {ComplexityState} from '../../../../../cli/states/metadata/complexity-state';
import {TuiManager} from '../../../../../cli/tui-manager';
import {Complexity} from '../../../../../types/tags';
import {ManifestBuilder} from '../../../../../util/manifest-builder';

describe('ComplexityState', () => {
  let complexityState: ComplexityState;

  beforeEach(() => {
    complexityState = new ComplexityState(new TuiManager());
  });

  it('should create an instance of ComplexityState', () => {
    expect(complexityState).toBeInstanceOf(ComplexityState);
  });

  it('should set the prompt and choices correctly', () => {
    const prompt = 'What is the complexity of the software?';
    const choices = [
      {name: 'Simple', value: Complexity.Simple},
      {name: 'Moderate', value: Complexity.Moderate},
      {name: 'Complex', value: Complexity.Complex},
    ];
    const question = new SingleChoiceQuestion(prompt, choices);

    expect(complexityState.question).toEqual(question);
  });

  it('should handle the answer and set the category in the manifest', () => {
    const answer = 'simple';
    const manifestBuilder = new ManifestBuilder();
    const setComplexitySpy = jest.spyOn(manifestBuilder, 'setComplexity');

    complexityState.getManifestBuilder = jest
      .fn()
      .mockReturnValue(manifestBuilder);
    complexityState.handleAnswer(answer);

    expect(setComplexitySpy).toHaveBeenCalledWith(answer);
  });
});
