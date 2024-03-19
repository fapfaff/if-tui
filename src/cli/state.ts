import {Answer} from '../types/answer';
import {ManifestBuilder} from '../util/manifest-builder';
import {Question} from './question';
import {Ui} from './ui';

/**
 * Represents an abstract state.
 */
export abstract class State {
  context: CompositeState;

  /**
   * Creates a new instance of the State class.
   * @param context The context in which the state is being executed.
   */
  constructor(context: CompositeState) {
    this.context = context;
  }

  /**
   * Executes the state logic.
   * @param ui The user interface.
   * @returns A Promise that resolves when the state execution is complete.
   */
  public abstract execute(ui: Ui): Promise<void>;

  /**
   * Retrieves the manifest builder from the current context.
   * @returns The manifest builder.
   */
  public getManifestBuilder(): ManifestBuilder {
    return this.context.getManifestBuilder();
  }
}

/**
 * Represents an abstract class for composite states.
 * Composite states are states that contain a queue of other states to be executed sequentially.
 */
export abstract class CompositeState extends State {
  stateQueue: State[] = [];

  /**
   * Creates a new instance of the CompositeState class.
   * @param context The context of the composite state.
   */
  constructor(context: CompositeState) {
    super(context);
  }

  /**
   * Executes the composite state.
   * @param ui The user interface.
   */
  public async execute(ui: Ui): Promise<void> {
    this.beforeStateExecution();
    while (this.stateQueue.length > 0) {
      const currentState = this.stateQueue.shift();
      if (currentState) {
        await currentState.execute(ui);
      }
    }
    this.afterStateExecution();
  }

  /**
   * Pushes a state to the end of the state queue.
   * @param state The state to be pushed.
   */
  public pushStateToQueue(state: State): void {
    this.stateQueue.push(state);
  }

  /**
   * Pushes a state to the beginning of the state queue.
   * @param state The state to be pushed.
   */
  public unshiftStateToQueue(state: State): void {
    this.stateQueue.unshift(state);
  }

  /**
   * Executes before the states in the stateQueue are executed.
   */
  beforeStateExecution(): void {}

  /**
   * Executes after the states in the stateQueue are executed.
   */
  afterStateExecution(): void {}
}

/**
 * Represents an abstract class for question states.
 */
export abstract class QuestionState extends State {
  question: Question;

  /**
   * Creates an instance of QuestionState.
   * @param context The context of the state machine.
   * @param question The question to be asked.
   */
  constructor(context: CompositeState, question: Question) {
    super(context);
    this.question = question;
  }

  /**
   * Asks the question and handles the answer.
   * @param ui The user interface.
   * @returns A promise that resolves when the execution is complete.
   */
  async execute(ui: Ui): Promise<void> {
    const res = await ui.askQuestion(this.question);
    this.handleAnswer(res);
  }

  /**
   * Handles the answer to the question.
   * @param answer The answer to the question.
   */
  abstract handleAnswer(answer: Answer): void;
}
