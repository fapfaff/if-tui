import {Question} from '../../../cli/question';
import {CompositeState, State} from '../../../cli/state';
import {Ui} from '../../../cli/ui';
import {Response} from '../../../types/response';

class TestState extends State {
  execute = jest.fn();
}

class TestCompositeState extends CompositeState {}

class TestUi implements Ui {
  askQuestion(question: Question): Promise<Response> {
    return Promise.resolve(question.prompt as Response);
  }
}

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
