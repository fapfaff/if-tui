import {input} from '@inquirer/prompts';
import {Response} from '../types/response';
import {OpenTextQuestion, Question} from './question';
import {Ui} from './ui';

/**
 * Represents a user interface for asking questions and receiving responses.
 */
export class InquirerUi implements Ui {
  /**
   * Asks a question and returns a promise that resolves to the user's response.
   * @param question The question to ask.
   * @returns A promise that resolves to the user's response.
   * @throws {Error} If the question type is not supported.
   */
  askQuestion(question: Question): Promise<Response> {
    if (question instanceof OpenTextQuestion) {
      return this.askOpenTextQuestion(question);
    }
    throw new Error('Unsupported question type');
  }

  /**
   * Asks an open text question and returns a promise that resolves to the user's response.
   * @param question The open text question to ask.
   * @returns A promise that resolves to the user's response.
   */
  async askOpenTextQuestion(question: OpenTextQuestion): Promise<Response> {
    return input({
      message: question.prompt,
      default: question.defaultValue,
    }).then(res => {
      return res as Response;
    });
  }
}
