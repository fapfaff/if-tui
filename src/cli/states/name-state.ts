import {Answer, isStringAnswer} from '../../types/answer';
import {OpenTextQuestion} from '../question';
import {CompositeState, QuestionState} from '../state';

/**
 * State that asks for the name of the project and sets the name field in the manifest.
 */
export class NameState extends QuestionState {
  /**
   * Constructs a new instance of the NameState class.
   * @param context The context of the state machine.
   */
  constructor(context: CompositeState) {
    super(context, new OpenTextQuestion('What is the name of your project?'));
  }

  /**
   * Handles the user's answer to the question.
   * Sets the name field in the manifest.
   * @param answer The user's answer.
   * @throws Error if the answer is not of type string.
   */
  handleAnswer(answer: Answer): void {
    if (!isStringAnswer(answer)) {
      throw new Error('Invalid answer type');
    }
    this.getManifestBuilder().setName(answer);
  }
}
