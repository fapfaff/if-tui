import {Answer, isBooleanAnswer} from '../../types/answer';
import {ConfirmQuestion} from '../question';
import {CompositeState, QuestionState, WithComponent} from '../state';
import {BackendState} from './backend-state';
import {MultipleSubcomponentsState} from './multiple-subcomponents-state';
import {TrafficState} from './traffic-state';

/**
 * State that asks whether to add a backend component.
 */
export class HasBackendState extends QuestionState implements WithComponent {
  componentPath: string[];

  /**
   * Creates an instance of HasBackendState.
   * @param context - The CompositeState context.
   * @param componentPath - The path of the component.
   */
  constructor(context: CompositeState, componentPath: string[]) {
    const question = new ConfirmQuestion('Do you want to add a backend?', true);
    super(context, question);
    this.componentPath = componentPath;
  }

  /**
   * Handles the answer provided by the user. If yes a backend and traffic component is added
   * and the corresponding states are enqueued.
   * @param answer - The answer provided by the user.
   * @throws Error if the response type is invalid.
   */
  handleAnswer(answer: Answer): void {
    if (!isBooleanAnswer(answer)) throw new Error('Invalid response type.');

    if (answer) {
      const backendPath = this.componentPath.concat('backend');
      const trafficPath = this.componentPath.concat('traffic');

      this.getManifestBuilder().setNodeAtPath(backendPath, {});
      this.getManifestBuilder().setNodeAtPath(trafficPath, {});

      this.context.unshiftStateToQueue(
        new MultipleSubcomponentsState(
          this.context,
          backendPath,
          'backend',
          (context, path) => new BackendState(context, path)
        )
      );

      this.context.unshiftStateToQueue(
        new TrafficState(this.context, trafficPath)
      );
    }
  }
}
