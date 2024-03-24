import {Answer, isStringAnswer} from '../../../types/answer';
import {OpenTextQuestion} from '../../question';
import {CompositeState, QuestionState, WithComponent} from '../../state';

export class CpuLifespanState extends QuestionState implements WithComponent {
  componentPath: string[];

  constructor(context: CompositeState, componentPath: string[]) {
    super(
      context,
      new OpenTextQuestion(
        'How many years do you plan to use this CPU? (leave blank to skip)'
      )
    );
    this.componentPath = componentPath;
  }

  handleAnswer(answer: Answer): void {
    if (answer === '') return; // skip lifespan
    if (!isStringAnswer(answer)) throw new Error('Invalid response type.');
    if (isNaN(parseFloat(answer))) throw new Error('Invalid response type.');
    const lifespanYears = parseFloat(answer);
    const lifespanSeconds = lifespanYears * 365 * 24 * 60 * 60;

    const node = this.getManifestBuilder().getNodeAtPath(this.componentPath);
    if (!node) throw new Error('Node not found');
    if (!node?.defaults) node.defaults = {};
    node.defaults['cpu/lifespan'] = lifespanSeconds;
  }
}
