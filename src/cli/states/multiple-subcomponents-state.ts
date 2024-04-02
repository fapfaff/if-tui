import {Answer} from '../../types/answer';
import {OpenTextQuestion} from '../question';
import {CompositeState, QuestionState, State, WithComponent} from '../state';

type StateConstructor = (
  context: CompositeState,
  componentPath: string[]
) => State;

export class MultipleSubcomponentsState
  extends QuestionState
  implements WithComponent
{
  componentPath: string[];

  constructor(
    context: CompositeState,
    componentPath: string[],
    componentName: string,
    private stateConstructor: StateConstructor
  ) {
    super(
      context,
      new OpenTextQuestion(
        `How many ${componentName} components do you want to add?`,
        '1'
      )
    );
    this.componentPath = componentPath;
  }

  handleAnswer(answer: Answer): void {
    if (typeof answer !== 'string') throw new Error('Invalid answer type');
    if (isNaN(parseInt(answer))) throw new Error('Invalid answer type');

    this.addSubcomponents(parseInt(answer));
  }

  /**
   * Adds the specified number of subcomponents to the current component.
   * The subcomponents are added to the manifest and the state queue.
   * If only one instance is specified, no subcomponents are added.
   * @param amount - The number of subcomponents to add.
   * @throws {Error} If the component path is not found.
   */
  addSubcomponents(amount: number) {
    if (amount === 0) return;
    if (!this.componentPath) throw new Error('Component path not found');
    if (amount === 1) {
      this.context.unshiftStateToQueue(
        this.stateConstructor(this.context, this.componentPath)
      );
      return;
    }

    const parentName = this.componentPath?.[this.componentPath.length - 1];

    for (let i = 1; i <= amount; i++) {
      const subcomponentPath = this.componentPath.concat(`${parentName}-${i}`);
      this.getManifestBuilder().setNodeAtPath(subcomponentPath, {});
      this.context.unshiftStateToQueue(
        this.stateConstructor(this.context, subcomponentPath)
      );
    }
  }
}
