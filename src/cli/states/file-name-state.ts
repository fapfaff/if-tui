import {Answer, isStringAnswer} from '../../types/answer';
import {OpenTextQuestion} from '../question';
import {CompositeState, QuestionState} from '../state';

/**
 * State that prompts the user to enter a file name for the manifest file.
 * The default fileName is 'manifest.yml'.
 */
export class FileNameState extends QuestionState {
  constructor(context: CompositeState) {
    super(
      context,
      new OpenTextQuestion(
        'How should the manifest file be named?',
        'manifest.yml'
      )
    );
  }

  /**
   * Handles the user's answer and updates the filename.
   * @param answer The user's answer.
   */
  handleAnswer(answer: Answer): void {
    if (!isStringAnswer(answer)) {
      throw new Error('Invalid answer type');
    }
    this.setManifestFileName(answer);
  }
}
