import {Question} from '../../../cli/question';
import {CompositeState, QuestionState, State} from '../../../cli/state';
import {TuiManager} from '../../../cli/tui-manager';
import {Ui} from '../../../cli/ui';
import {Answer} from '../../../types/answer';

class TestState extends State {
  constructor(context: CompositeState) {
    super(context);
  }

  execute = jest.fn();
}

class TestCompositeState extends CompositeState {}

const RESPONSE: Answer = 'res';

class TestUi implements Ui {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  askQuestion(_question: Question): Promise<Answer> {
    return Promise.resolve(RESPONSE);
  }
}

class TestQuestionState extends QuestionState {
  constructor() {
    super(undefined!, {prompt: 'Test question'});
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleAnswer(_response: Answer): void {
    return;
  }
}

describe('State', () => {
  let state: TestState;

  beforeEach(() => {
    state = new TestState(new TuiManager());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should execute the state', async () => {
    const ui = new TestUi();
    await state.execute(ui);
    expect(state.execute).toHaveBeenCalled();
  });

  it('should get ManifestBuilder', () => {});
});

describe('CompositeState', () => {
  let compositeState: TestCompositeState;
  const ui = new TestUi();

  beforeEach(() => {
    compositeState = new TestCompositeState(undefined!);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should execute states in the state queue', async () => {
    const state1 = new TestState(compositeState);
    const state2 = new TestState(compositeState);
    compositeState.pushStateToQueue(state1);
    compositeState.unshiftStateToQueue(state2);

    await compositeState.execute(ui);

    expect(state1.execute).toHaveBeenCalled();
    expect(state2.execute).toHaveBeenCalled();
  });

  it('should call beforeStateExecution and afterStateExecution', async () => {
    const beforeStateExecution = jest.spyOn(
      compositeState,
      'beforeStateExecution'
    );
    const afterStateExecution = jest.spyOn(
      compositeState,
      'afterStateExecution'
    );

    const state = new TestState(compositeState);
    compositeState.pushStateToQueue(state);

    await compositeState.execute(ui);

    expect(beforeStateExecution).toHaveBeenCalled();
    expect(state.execute).toHaveBeenCalled();
    expect(afterStateExecution).toHaveBeenCalled();
  });
});
describe('QuestionState', () => {
  let questionState: TestQuestionState;
  const ui = new TestUi();

  beforeEach(() => {
    questionState = new TestQuestionState();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should ask the question and handle the response', async () => {
    const handleAnswer = jest.spyOn(questionState, 'handleAnswer');
    const askQuestion = jest.spyOn(ui, 'askQuestion');

    await questionState.execute(ui);

    expect(askQuestion).toHaveBeenCalledWith(questionState.question);
    expect(handleAnswer).toHaveBeenCalledWith(RESPONSE);
  });
});
