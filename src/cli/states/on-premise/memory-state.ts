import {Answer, isStringAnswer} from '../../../types/answer';
import {OpenTextQuestion} from '../../question';
import {CompositeState, QuestionState, WithComponent} from '../../state';

/**
 * Represents the state for capturing the memory information of a component.
 */
export class MemoryState extends QuestionState implements WithComponent {
  componentPath: string[];

  /**
   * Creates an instance of the `MemoryState` class.
   * @param context - The parent state context.
   * @param componentPath - The path of the component.
   */
  constructor(context: CompositeState, componentPath: string[]) {
    const question = new OpenTextQuestion(
      'How much memory does your component have? (in GB)',
      '16'
    );
    super(context, question);
    this.componentPath = componentPath;
  }

  /**
   * Handles the user's answer and updates the component's memory information.
   *
   * @param answer - The user's answer.
   * @throws {Error} If the answer is not a string or cannot be parsed as a number.
   * @throws {Error} If the component path is not found.
   */
  handleAnswer(answer: Answer) {
    if (!isStringAnswer(answer)) throw new Error('Invalid answer type');
    if (isNaN(parseInt(answer))) throw new Error('Invalid answer type');

    this.addPlugin();
    this.configureNode(parseInt(answer));
  }

  /**
   * Configures the component's memory capcacity, utilization and adds the e-mem plugin to the pipeline.
   */
  configureNode(capcacity: number) {
    const node = this.getManifestBuilder().getNodeAtPath(this.componentPath);

    if (!node) throw new Error('Component path not found');
    if (!node.defaults) node.defaults = {};

    node.defaults['memory/capacity'] = capcacity;

    if (!node.inputs) node.inputs = [];
    if (!node.inputs[0]) node.inputs.push({});

    node.inputs[0]['memory/utilization'] =
      'TODO: memory utilization in percent';

    if (!node.pipeline) node.pipeline = [];
    node.pipeline.push('e-mem');
  }

  /**
   * Adds the e-mem plugin to the initialize section of the manifest.
   */
  addPlugin() {
    const plugin = {
      path: '@grnsft/if-plugins',
      method: 'EMem',
      'global-config': {
        'energy-per-gb': 0.000392,
      },
    };
    this.getManifestBuilder().addPlugin('e-mem', plugin);
  }
}
