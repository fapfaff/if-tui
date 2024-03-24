import {Answer, isStringAnswer} from '../../../types/answer';
import {Complexity} from '../../../types/tags';
import {SingleChoiceQuestion} from '../../question';
import {CompositeState, QuestionState} from '../../state';

/**
 * State for selecting the complexity of the software.
 */
export class ComplexityState extends QuestionState {
  constructor(context: CompositeState) {
    const prompt = 'What is the complexity of the software?';
    const choices = [
      {name: 'Simple', value: Complexity.Simple},
      {name: 'Moderate', value: Complexity.Moderate},
      {name: 'Complex', value: Complexity.Complex},
    ];
    super(context, new SingleChoiceQuestion(prompt, choices));
  }

  /**
   * Handles the answer and sets the complexity in the manifest.
   * @param answer the user's answer.
   */
  handleAnswer(answer: Answer): void {
    if (!isStringAnswer(answer)) throw new Error('Invalid response type.');

    this.getManifestBuilder().setComplexity(answer);
  }
}
