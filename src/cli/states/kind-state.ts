import {isStringAnswer} from '../../types/answer';
import {Kind} from '../../types/tags';
import {SingleChoiceQuestion} from '../question';
import {CompositeState, QuestionState, State} from '../state';
import {AppState} from './app-state';
import {IotState} from './iot-state';
import {MlState} from './ml-state';
import {WebState} from './web-state';

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
    this.addStateToQueue(answer);
  }

  /**
   * Adds a state to the context based on the provided answer.
   * @param answer - The kind of state to add.
   */
  addStateToQueue(answer: Kind | string) {
    let state: State;
    switch (answer) {
      case Kind.Web:
        state = new WebState(this.context);
        break;
      case Kind.App:
        state = new AppState(this.context);
        break;
      case Kind.Iot:
        state = new IotState(this.context);
        break;
      case Kind.Ml:
        state = new MlState(this.context);
        break;
      default:
        return;
    }
    this.context.unshiftStateToQueue(state);
  }
}
