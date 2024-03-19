import {isStringAnswer} from '../../types/answer';
import {Kind} from '../../types/tags';
import {SingleChoiceQuestion} from '../question';
import {CompositeState, QuestionState} from '../state';

/**
 * State for selecting the kind of software the project is about.
 */
export class KindState extends QuestionState {
  /**
   * Creates an instance of KindState.
   * @param context The context of the state machine.
   */
  constructor(context: CompositeState) {
    const prompt = 'What kind of software is the project about?';
    const choices = [
      {name: 'Web', value: Kind.Web},
      {name: 'App', value: Kind.App},
      {name: 'IOT', value: Kind.Iot},
      {name: 'Machine Learning', value: Kind.Ml},
    ];
    super(context, new SingleChoiceQuestion(prompt, choices));
  }

  /**
   * Handles the user's answer.
   * Sets the kind field in the manifest.v
   * @param answer The user's answer.
   * @throws Error if the response type is invalid.
   */
  handleAnswer(answer: string): void {
    if (!isStringAnswer) throw new Error('Invalid response type.');
    this.getManifestBuilder().setKind(answer);
  }
}
