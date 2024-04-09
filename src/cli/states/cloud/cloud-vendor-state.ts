import {Answer} from '../../../types/answer';
import {Node} from '../../../types/compute';
import {PluginOptions} from '../../../types/manifest';
import {SingleChoiceQuestion} from '../../question';
import {CompositeState, QuestionState, WithComponent} from '../../state';

/**
 * Represents the state for selecting a cloud vendor.
 * Uses the CloudCarbonFootprint plugin.
 */
export class CloudVendorState extends QuestionState implements WithComponent {
  componentPath: string[];

  /**
   * Constructs a new instance of the CloudVendorState class.
   * @param context The composite state context.
   * @param componentPath The path to the component.
   */
  constructor(context: CompositeState, componentPath: string[]) {
    const choices = [
      {name: 'AWS', value: 'aws'},
      {name: 'Azure', value: 'azure'},
      {name: 'Google Cloud', value: 'gcp'},
    ];
    const question = new SingleChoiceQuestion(
      'Which cloud vendor are you using?',
      choices
    );
    super(context, question);
    this.componentPath = componentPath;
  }

  /**
   * Handles the user's answer.
   * @param answer The user's answer.
   * @throws Error if the answer is of an invalid type.
   */
  handleAnswer(answer: Answer): void {
    if (typeof answer !== 'string') throw new Error('Invalid answer type');

    this.addCcfPlugin();
    this.configureNode(answer);
  }

  /**
   * Adds the CloudCarbonFootprint plugin to the manifest builder.
   */
  private addCcfPlugin(): void {
    const ccfPlugin: PluginOptions = {
      path: '@grnsft/if-unofficial-plugins',
      method: 'CloudCarbonFootprint',
    };

    this.getManifestBuilder().addPlugin('ccf', ccfPlugin);
  }

  /**
   * Configures the node with the specified vendor.
   * @param vendor The cloud vendor.
   * @throws Error if the node is not found at the specified path.
   */
  private configureNode(vendor: string): void {
    const node = this.getManifestBuilder().getNodeAtPath(this.componentPath);
    if (!node) throw new Error('Node not found at path');
    this.configurePipeline(node);
    this.configureDefaults(node, vendor);
  }

  /**
   * Configures the pipeline of the specified node.
   * @param node The node to configure.
   * @returns The configured node.
   */
  private configurePipeline(node: Node): Node {
    if (!node.pipeline) {
      node.pipeline = [];
    }
    node.pipeline.push('ccf');
    return node;
  }

  /**
   * Configures the defaults of the specified node with the specified vendor.
   * @param node The node to configure.
   * @param vendor The cloud vendor.
   * @returns The configured node.
   */
  private configureDefaults(node: Node, vendor: string): Node {
    if (!node.defaults) {
      node.defaults = {};
    }
    node.defaults['cloud/vendor'] = vendor;

    return node;
  }
}
