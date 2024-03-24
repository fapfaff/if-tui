import {SingleChoiceQuestion} from '../../../../../cli/question';
import {CategoryState} from '../../../../../cli/states/metadata/category-state';
import {TuiManager} from '../../../../../cli/tui-manager';
import {Category} from '../../../../../types/tags';
import {ManifestBuilder} from '../../../../../util/manifest-builder';

describe('CategoryState', () => {
  let categoryState: CategoryState;

  beforeEach(() => {
    categoryState = new CategoryState(new TuiManager());
  });

  it('should create an instance of CategoryState', () => {
    expect(categoryState).toBeInstanceOf(CategoryState);
  });

  it('should set the prompt and choices correctly', () => {
    const prompt = 'What kind of deployment does your software utilize?';
    const choices = [
      {name: 'Cloud', value: Category.Cloud},
      {name: 'On-premise', value: Category.OnPremise},
      {name: 'Hybrid', value: Category.Hybrid},
      {name: 'Serverless', value: Category.Serverless},
      {name: 'End-user Device', value: Category.Device},
    ];
    const question = new SingleChoiceQuestion(prompt, choices);

    expect(categoryState.question).toEqual(question);
  });

  it('should handle the answer and set the category in the manifest', () => {
    const answer = 'Cloud';
    const manifestBuilder = new ManifestBuilder();
    const setCategorySpy = jest.spyOn(manifestBuilder, 'setCategory');

    categoryState.getManifestBuilder = jest
      .fn()
      .mockReturnValue(manifestBuilder);
    categoryState.handleAnswer(answer);

    expect(setCategorySpy).toHaveBeenCalledWith(answer);
  });
});
