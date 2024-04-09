import {InquirerUi} from '../../../cli/inquirer-ui';

class MockQuestion {
  constructor(public prompt: string) {
    this.prompt = prompt;
  }
}

describe('InquirerUi', () => {
  let inquirerUi: InquirerUi;

  beforeEach(() => {
    inquirerUi = new InquirerUi();
  });

  it('should throw an error for unsupported question type', async () => {
    const question = new MockQuestion('question');

    await expect(() => inquirerUi.askQuestion(question)).toThrow(
      'Unsupported question type'
    );
  });
});
