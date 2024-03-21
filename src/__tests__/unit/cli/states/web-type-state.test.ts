import {SingleChoiceQuestion} from '../../../../cli/question';
import {WebTypeState} from '../../../../cli/states/web-type-state';
import {TuiManager} from '../../../../cli/tui-manager';

describe('WebTypeState', () => {
  it('should set the prompt and choices correctly', () => {
    const prompt = 'What type of website do you want to create?';
    const choices = [
      {name: 'Static', value: 'static'},
      {name: 'Dynamic', value: 'dynamic'},
    ];
    const question = new SingleChoiceQuestion(prompt, choices);

    const state = new WebTypeState(new TuiManager());

    expect(state.question).toEqual(question);
  });

  it('should add backend and storage component if dynamic site', () => {
    const state = new WebTypeState(new TuiManager());

    state.handleAnswer('dynamic');

    const manifest = state.getManifestBuilder().build();

    expect(manifest.tree.children.backend).toBeDefined();
    expect(manifest.tree.children.storage).toBeDefined();
  });
});
