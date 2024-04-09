import {Answer, isStringAnswer} from '../../types/answer';
import {SingleChoiceQuestion} from '../question';
import {CompositeState, QuestionState} from '../state';
import {BackendState} from './backend-state';
import {MultipleSubcomponentsState} from './multiple-subcomponents-state';

/**
 * Represents the state for selecting whether the website is static or dynamic.
 */
export class WebTypeState extends QuestionState {
  /**
   * Constructs a new instance of the WebTypeState class.
   * @param context - The context of the state machine.
   */
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

  /**
   * Handles the user's answer to the question.
   * @param answer - The user's answer whether the website is static or dynamic.
   * @throws Error if the response type is invalid.
   */
  handleAnswer(answer: Answer): void {
    if (!isStringAnswer(answer)) throw new Error('Invalid response type.');

    if (answer === 'dynamic') {
      this.addDynamicComponents();
    } else if (answer === 'static') {
      /* empty */
    } else {
      throw new Error('Invalid answer');
    }
  }

  /**
   * Adds dynamic components to the website.
   * Adds the components 'backend' and 'storage' to the manifest.
   */
  addDynamicComponents() {
    const backendPath = ['backend'];

    this.getManifestBuilder().setNodeAtPath(backendPath, {});
    this.getManifestBuilder().setNodeAtPath(['storage'], {});

    this.context.unshiftStateToQueue(
      new MultipleSubcomponentsState(
        this.context,
        backendPath,
        'backend',
        (context, path) => new BackendState(context, path)
      )
    );
  }
}
