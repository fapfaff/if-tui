import {Choice} from '../types/choice';

/**
 * Represents a question in a command-line interface.
 */
export abstract class Question {
  prompt: string;

  constructor(prompt: string) {
    this.prompt = prompt;
  }
}

/**
 * Represents a confirmation question.
 */
/**
 * Represents a confirm question that prompts the user for a yes or no answer.
 */
export class ConfirmQuestion extends Question {
  prompt: string;
  defaultValue: boolean;

  /**
   * Creates a new instance of the ConfirmQuestion class.
   * @param prompt The prompt message displayed to the user.
   * @param defaultValue The default value for the confirm question.
   */
  constructor(prompt: string, defaultValue: boolean) {
    super(prompt);
    this.prompt = prompt;
    this.defaultValue = defaultValue;
  }
}

/**
 * Represents an open text question that prompts the user for input.
 */
export class OpenTextQuestion extends Question {
  prompt: string;
  defaultValue: string | undefined;

  /**
   * Creates a new instance of the OpenTextQuestion class.
   * @param prompt The prompt message for the question.
   * @param defaultValue The default value for the question (optional).
   */
  constructor(prompt: string, defaultValue?: string) {
    super(prompt);
    this.prompt = prompt;
    this.defaultValue = defaultValue;
  }
}

/**
 * Represents a single choice question.
 */
export class SingleChoiceQuestion extends Question {
  prompt: string;
  defaultValue: string | undefined;
  choices: Choice[];

  /**
   * Creates a new instance of SingleChoiceQuestion.
   * @param prompt The prompt for the question.
   * @param choices The choices for the question.
   * @param defaultValue The default value for the question (optional).
   */
  constructor(prompt: string, choices: Choice[], defaultValue?: string) {
    super(prompt);
    this.prompt = prompt;
    this.defaultValue = defaultValue;
    this.choices = choices;
  }
}

/**
 * Just prints a text to the console.
 */
export class PrintTextQuestion extends Question {
  prompt: string;

  /**
   * Creates a new instance of the PrintTextQuestion class.
   * @param prompt The text to print.
   */
  constructor(prompt: string) {
    super(prompt);
    this.prompt = prompt;
  }
}
