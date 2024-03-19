import {Answer} from '../types/answer';
import {Question} from './question';

/**
 * Represents the User Interface.
 */
export interface Ui {
  /**
   * Asks a question and returns a promise that resolves to the response.
   * @param question The question to ask.
   * @returns A promise that resolves to the answer.
   */
  askQuestion(question: Question): Promise<Answer>;
}
