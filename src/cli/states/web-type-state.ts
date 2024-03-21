import {Answer} from '../../types/answer';
import {CompositeState, QuestionState} from '../state';

export class WebTypeState extends QuestionState {
  constructor(context: CompositeState) {
    super(context, undefined!);
  }

  handleAnswer(_answer: Answer): void {
    throw new Error('Method not implemented.');
  }
}
