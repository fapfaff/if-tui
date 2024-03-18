/**
 * Represents a question in a command-line interface.
 */
export abstract class Question {
  prompt: string;

  constructor(prompt: string) {
    this.prompt = prompt;
  }
}
