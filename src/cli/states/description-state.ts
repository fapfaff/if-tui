import {Answer, isStringAnswer} from '../../types/answer';
import {OpenTextQuestion} from '../question';
import {CompositeState, QuestionState} from '../state';

/**
 * State that asks for the description of the project and sets the description field in the manifest.
 */
export class DescriptionState extends QuestionState {
  /**
   * Constructs a new instance of the DescriptionState class.
   * @param context The context of the state machine.
   */
  constructor(context: CompositeState) {
    super(
      context,
      new OpenTextQuestion('What is the description of your project?')
    );
  }

  /**
   * Handles the user's answer to the question.
   * Sets the description field in the manifest.
   * @param answer The user's answer.
   * @throws Error if the answer is not of type string.
   */
  handleAnswer(answer: Answer): void {
    if (!isStringAnswer(answer)) {
      throw new Error('Invalid answer type');
    }
    this.getManifestBuilder().setDescription(answer);
  }
}
