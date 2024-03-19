import {SingleChoiceQuestion} from '../../../../cli/question';
import {KindState} from '../../../../cli/states/kind-state';
import {TuiManager} from '../../../../cli/tui-manager';
import {Kind} from '../../../../types/tags';
import {ManifestBuilder} from '../../../../util/manifest-builder';

describe('KindState', () => {
  let kindState: KindState;

  beforeEach(() => {
    kindState = new KindState(new TuiManager());
  });

  it('should create an instance of KindState', () => {
    expect(kindState).toBeInstanceOf(KindState);
  });

  it('should set the prompt and choices correctly', () => {
    const prompt = 'What kind of software is the project about?';
    const choices = [
      {name: 'Web', value: Kind.Web},
      {name: 'App', value: Kind.App},
      {name: 'IOT', value: Kind.Iot},
      {name: 'Machine Learning', value: Kind.Ml},
    ];
    const question = new SingleChoiceQuestion(prompt, choices);

    expect(kindState.question).toEqual(question);
  });

  it('should handle the answer and set the category in the manifest', () => {
    const answer = 'App';
    const manifestBuilder = new ManifestBuilder();
    const setKindSpy = jest.spyOn(manifestBuilder, 'setKind');

    kindState.getManifestBuilder = jest.fn().mockReturnValue(manifestBuilder);
    kindState.handleAnswer(answer);

    expect(setKindSpy).toHaveBeenCalledWith(answer);
  });
});
