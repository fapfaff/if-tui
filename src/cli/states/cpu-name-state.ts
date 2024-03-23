import {Answer} from '../../types/answer';
import {OpenTextQuestion} from '../question';
import {CompositeState, QuestionState, WithComponent} from '../state';

/**
 * Represents the state for capturing the name of the CPU.
 * Sets the 'cpu/name' default.
 */
export class CpuNameState extends QuestionState implements WithComponent {
  componentPath: string[];

  /**
   * Creates an instance of CpuNameState.
   * @param context - The parent state context.
   * @param componentPath - The path to the component.
   */
  constructor(context: CompositeState, componentPath: string[]) {
    const question = new OpenTextQuestion(
      'What is the name of the CPU?',
      'Intel® Core™ i7-1185G7'
    );
    super(context, question);
    this.componentPath = componentPath;
  }

  /**
   * Handles the user's answer.
   * @param answer - The user's answer.
   * @throws {Error} - If the answer is of an invalid type.
   */
  handleAnswer(answer: Answer): void {
    if (typeof answer !== 'string') throw new Error('Invalid answer type');
    this.configureNode(answer);
  }

  /**
   * Configures the node with the provided CPU name.
   * Sets the 'cpu/name' default.
   * @param answer - The CPU name.
   * @throws {Error} - If the node is not found.
   */
  private configureNode(answer: string): void {
    const node = this.getManifestBuilder().getNodeAtPath(this.componentPath);
    if (!node) throw new Error('Node not found');

    if (!node.defaults) node.defaults = {};
    node.defaults['cpu/name'] = answer;
  }
}
