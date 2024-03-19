import {input, select} from '@inquirer/prompts';
import {Answer} from '../types/answer';
import {OpenTextQuestion, Question, SingleChoiceQuestion} from './question';
import {Ui} from './ui';

/**
 * Represents a user interface for asking questions and receiving responses.
 */
export class InquirerUi implements Ui {
  /**
   * Asks a question and returns a promise that resolves to the user's response.
   * @param question The question to ask.
   * @returns A promise that resolves to the user's answer.
   * @throws {Error} If the question type is not supported.
   */
  askQuestion(question: Question): Promise<Answer> {
    if (question instanceof OpenTextQuestion) {
      return this.askOpenTextQuestion(question);
    } else if (question instanceof SingleChoiceQuestion) {
      return this.askSingleChoiceQuestion(question);
    }
    throw new Error('Unsupported question type');
  }

  /**
   * Asks an open text question and returns a promise that resolves to the user's answer.
   * @param question The open text question to ask.
   * @returns A promise that resolves to the user's answer.
   */
  async askOpenTextQuestion(question: OpenTextQuestion): Promise<Answer> {
    return input({
      message: question.prompt,
      default: question.defaultValue,
    }).then(res => {
      return res as Answer;
    });
  }

  /**
   * Asks a single choice question to the user and returns the selected answer.
   * @param question - The single choice question to ask.
   * @returns A promise that resolves to the selected answer.
   */
  async askSingleChoiceQuestion(
    question: SingleChoiceQuestion
  ): Promise<Answer> {
    return select({
      message: question.prompt,
      choices: question.choices,
    }).then(res => {
      return res as Answer;
    });
  }
}
