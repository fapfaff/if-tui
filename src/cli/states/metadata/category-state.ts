import {Answer, isStringAnswer} from '../../../types/answer';
import {Category} from '../../../types/tags';
import {SingleChoiceQuestion} from '../../question';
import {CompositeState, QuestionState} from '../../state';

/**
 * State for selecting the category of deployment for software.
 */
export class CategoryState extends QuestionState {
  constructor(context: CompositeState) {
    const prompt = 'What kind of deployment does your software utilize?';
    const choices = [
      {name: 'Cloud', value: Category.Cloud},
      {name: 'On-premise', value: Category.OnPremise},
      {name: 'Hybrid', value: Category.Hybrid},
      {name: 'Serverless', value: Category.Serverless},
      {name: 'End-user Device', value: Category.Device},
    ];
    super(context, new SingleChoiceQuestion(prompt, choices));
  }

  /**
   * Handles the answer and sets the category in the manifest.
   * @param answer the user's answer.
   */
  handleAnswer(answer: Answer): void {
    if (!isStringAnswer(answer)) throw new Error('Invalid response type.');

    this.getManifestBuilder().setCategory(answer);
  }
}
