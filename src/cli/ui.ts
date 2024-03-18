import {Response} from '../types/response';
import {Question} from './question';

/**
 * Represents the User Interface.
 */
export interface Ui {
  /**
   * Asks a question and returns a promise that resolves to the response.
   * @param question The question to ask.
   * @returns A promise that resolves to the response.
   */
  askQuestion(question: Question): Promise<Response>;
}
