import {Answer, isStringAnswer} from '../../types/answer';
import {OpenTextQuestion} from '../question';
import {CompositeState, QuestionState, WithComponent} from '../state';

/**
 * State for directly specifying the the carbon intensity of the electricity used.
 * Sets the grid/carbon-intensity field in the manifest.
 */
export class CarbonIntensityState
  extends QuestionState
  implements WithComponent
{
  componentPath: string[];

  /**
   * Creates an instance of CarbonIntensityState.
   * @param context The context of the state machine.
   * @param componentPath The path to the component in the manifest.
   */
  constructor(context: CompositeState, componentPath: string[]) {
    super(
      context,
      new OpenTextQuestion(
        'What is the carbon intensity of the electricity used in the data center (in gCO2e/kWh)?'
      )
    );
    this.componentPath = componentPath;
  }

  /**
   * Handles the user's answer. Sets the grid/carbon-intensity field in the manifest.
   * @param answer The user's answer.
   * @throws {Error} If the response type is invalid.
   */
  handleAnswer(answer: Answer): void {
    if (!isStringAnswer(answer)) throw new Error('Invalid response type.');
    if (isNaN(parseFloat(answer))) throw new Error('Invalid response type.');
    const carbonIntensity = parseFloat(answer);

    const node = this.getManifestBuilder().getNodeAtPath(this.componentPath);
    if (!node) throw new Error('Node not found');
    if (!node?.defaults) node.defaults = {};
    node.defaults['grid/carbon-intensity'] = carbonIntensity;
  }
}
