import {Answer} from '../../../types/answer';
import {OpenTextQuestion} from '../../question';
import {CompositeState, QuestionState, WithComponent} from '../../state';

/**
 * Represents the state for configuring the specific cloud instance.
 * Sets the cloud/instance-type and cpu/utilization inputs.
 */
export class CloudInstanceState extends QuestionState implements WithComponent {
  componentPath: string[];

  /**
   * Creates an instance of CloudInstanceState.
   * @param context - The context of the state machine.
   * @param componentPath - The path of the component to configure.
   */
  constructor(context: CompositeState, componentPath: string[]) {
    const question = new OpenTextQuestion(
      'What is the name of the cloud instance?',
      'm5n.large'
    );

    super(context, question);
    this.componentPath = componentPath;
  }

  /**
   * Handles the answer provided by the user.
   * @param answer - The answer provided by the user.
   * @throws {Error} - If the answer type is invalid.
   */
  handleAnswer(answer: Answer): void {
    if (typeof answer !== 'string') throw new Error('Invalid answer type');

    this.configureNode(answer);
  }

  /**
   * Configures the node with the provided instance name.
   * @param instanceName - The name of the cloud instance.
   * @throws {Error} - If the node is not found.
   */
  private configureNode(instanceName: string): void {
    const node = this.getManifestBuilder().getNodeAtPath(this.componentPath);
    if (!node) throw new Error('Node not found');

    if (!node.defaults) node.defaults = {};
    node.defaults['cloud/instance-type'] = instanceName;

    if (!node.inputs) node.inputs = [{}];
    if (!node.inputs[0]) node.inputs[0] = {};

    node.inputs[0]['timestamp'] = 'TODO: Timestamp of the measurement';
    node.inputs[0]['duration'] = 'TODO: Duration of the measurement';
    node.inputs[0]['cpu/utilization'] =
      'TODO: CPU usage as a percentage (e.g. 80)';
  }
}
