import {Answer} from '../../../types/answer';
import {OpenTextQuestion} from '../../question';
import {CompositeState, QuestionState, WithComponent} from '../../state';

/**
 * Represents the state for capturing the number of CPU cores.
 * Sets the 'cpu/number-cores' default.
 */
export class CpuCoresState extends QuestionState implements WithComponent {
  componentPath: string[];

  /**
   * Creates an instance of CpuCoresState.
   * @param context - The context of the state machine.
   * @param componentPath - The path of the component being configured.
   */
  constructor(context: CompositeState, componentPath: string[]) {
    super(
      context,
      new OpenTextQuestion('How many cores does the CPU have?', '4')
    );
    this.componentPath = componentPath;
  }

  /**
   * Handles the user's answer.
   * @param answer - The user's answer.
   * @throws {Error} If the answer is not a string or is not a valid number.
   */
  handleAnswer(answer: Answer): void {
    if (typeof answer !== 'string') throw new Error('Invalid answer type');
    if (isNaN(parseInt(answer))) throw new Error('Invalid answer');
    this.configureNode(parseInt(answer));
  }

  /**
   * Configures the node with the specified number of CPU cores.
   * Sets the 'cpu/number-cores' default.
   * @param answer - The number of CPU cores.
   * @throws {Error} If the node is not found.
   */
  private configureNode(answer: number): void {
    const node = this.getManifestBuilder().getNodeAtPath(this.componentPath);
    if (!node) throw new Error('Node not found');

    if (!node.defaults) node.defaults = {};
    node.defaults['cpu/number-cores'] = answer;
  }
}
