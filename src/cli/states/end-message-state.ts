import {Answer} from '../../types/answer';
import {PrintTextQuestion, Question} from '../question';
import {CompositeState, QuestionState} from '../state';
import {STRINGS} from '../../config/strings';

const {MANIFEST_CREATION_COMPLETE} = STRINGS;

export class EndMessageState extends QuestionState {
  question: Question = new PrintTextQuestion('');

  constructor(context: CompositeState) {
    super(context, undefined!);
  }

  async beforeQuestion(): Promise<void> {
    const text = MANIFEST_CREATION_COMPLETE(this.getPluginPaths());
    this.question = new PrintTextQuestion(text);
  }

  private getPluginPaths(): string[] {
    const plugins = this.getManifestBuilder().getPlugins();
    let paths = Object.values(plugins)
      .map(p => p.path)
      .filter(p => p !== 'builtin');
    paths = paths.filter((item, index) => paths.indexOf(item) === index);
    return paths;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleAnswer(_answer: Answer): void {}
}
