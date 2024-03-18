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
