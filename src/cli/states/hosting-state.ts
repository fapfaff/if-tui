import {Answer} from '../../types/answer';
import {Category} from '../../types/tags';
import {SingleChoiceQuestion} from '../question';
import {CompositeState, QuestionState, WithComponent} from '../state';
import {CloudState} from './cloud-state';
import {OnPremiseState} from './onpremise-state';

/**
 * Represents the state for selecting the hosting type of a component.
 */
export class HostingState extends QuestionState implements WithComponent {
  componentPath: string[];

  /**
   * Creates an instance of HostingState.
   * @param context - The composite state context.
   * @param componentPath - The path of the component.
   */
  constructor(context: CompositeState, componentPath: string[]) {
    const prompt = 'How is the component hosted?';
    const options = [
      {name: 'Cloud', value: Category.Cloud},
      {name: 'On-Premise', value: Category.OnPremise},
      {name: 'Hybrid', value: Category.Hybrid},
    ];

    super(context, new SingleChoiceQuestion(prompt, options));
    this.componentPath = componentPath;
  }

  /**
   * Handles the answer and enqueues the corresponding state.
   * @param answer The selected hosting type.
   */
  handleAnswer(answer: Answer): void {
    if (typeof answer !== 'string') throw new Error('Invalid response type.');

    switch (answer) {
      case Category.Cloud:
        this.context.unshiftStateToQueue(
          new CloudState(this.context, this.componentPath)
        );
        break;
      case Category.OnPremise:
        this.context.unshiftStateToQueue(
          new OnPremiseState(this.context, this.componentPath)
        );
        break;
      case Category.Hybrid:
        this.addHybridComponents();
        break;
      default:
        throw new Error(`Invalid answer '${answer}'`);
    }
  }

  /**
   * Add subcomponents and enqueue states for hybrid hosting.
   */
  addHybridComponents() {
    const cloudPath = this.componentPath.concat(['cloud']);
    const onPremisePath = this.componentPath.concat(['onPremise']);

    this.getManifestBuilder().setNodeAtPath(cloudPath, {});
    this.getManifestBuilder().setNodeAtPath(onPremisePath, {});

    this.context.unshiftStateToQueue(new CloudState(this.context, cloudPath));
    this.context.unshiftStateToQueue(
      new OnPremiseState(this.context, onPremisePath)
    );
  }
}
