import {Answer, isStringAnswer} from '../../types/answer';
import {OpenTextQuestion} from '../question';
import {CompositeState, QuestionState, WithComponent} from '../state';

/**
 * State to capture in which country the node is hosted.
 */
export class CountryState extends QuestionState implements WithComponent {
  componentPath: string[];

  /**
   * Creates an instance of the CountryState class.
   * @param context The parent CompositeState instance.
   * @param componentPath The path to the component in the manifest.
   */
  constructor(context: CompositeState, componentPath: string[]) {
    super(
      context,
      new OpenTextQuestion('What country are you in (alpha-3 code)?', 'USA')
    );
    this.componentPath = componentPath;
  }

  /**
   * Handles the user's answer. Sets the country field on the node.
   * @param answer The user's answer.
   * @throws {Error} If the answer is not of type string.
   * @throws {Error} If the country code is not 3 characters long.
   * @throws {Error} If the component node is not found in the manifest.
   */
  handleAnswer(answer: Answer): void {
    if (!isStringAnswer(answer)) throw new Error('Invalid answer type');
    if (answer.length !== 3) throw new Error('Invalid country code');

    const node = this.getManifestBuilder().getNodeAtPath(this.componentPath);
    if (!node) throw new Error('Node not found');

    if (!node?.defaults) node.defaults = {};

    node.defaults['country'] = answer;
  }
}
