import {Answer, isStringAnswer} from '../../types/answer';
import {SingleChoiceQuestion} from '../question';
import {CompositeState, QuestionState} from '../state';

export class WebTypeState extends QuestionState {
  constructor(context: CompositeState) {
    const choices = [
      {name: 'Static', value: 'static'},
      {name: 'Dynamic', value: 'dynamic'},
    ];
    super(
      context,
      new SingleChoiceQuestion(
        'What type of website do you want to create?',
        choices
      )
    );
  }

  handleAnswer(answer: Answer): void {
    if (!isStringAnswer(answer)) throw new Error('Invalid response type.');

    if (answer === 'dynamic') {
      this.addDynamicComponents();
    } else {
      throw new Error('Invalid answer');
    }
  }

  addDynamicComponents() {
    this.getManifestBuilder().setNodeAtPath(['backend'], {});
    this.getManifestBuilder().setNodeAtPath(['storage'], {});
  }
}
