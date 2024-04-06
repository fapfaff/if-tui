import {ConfirmQuestion} from '../../../../cli/question';
import {CompositeState} from '../../../../cli/state';
import {HasBackendState} from '../../../../cli/states/has-backend-state';
import {TuiManager} from '../../../../cli/tui-manager';

describe('HasBackendState', () => {
  let context: CompositeState;
  let componentPath: string[];
  let hasBackendState: HasBackendState;

  beforeEach(() => {
    context = new TuiManager();
    componentPath = ['a', 'b'];
    hasBackendState = new HasBackendState(context, componentPath);
    hasBackendState.getManifestBuilder().setNodeAtPath(componentPath, {});
  });

  it('should create an instance of HasBackendState', () => {
    expect(hasBackendState).toBeInstanceOf(HasBackendState);
  });

  it('should set the component path correctly', () => {
    const componentPath = ['backend'];
    const state = new HasBackendState(new TuiManager(), componentPath);

    expect(state.componentPath).toEqual(componentPath);
  });

  it('should contain question', () => {
    expect(hasBackendState.question).toEqual(
      new ConfirmQuestion('Do you want to add a backend?', true)
    );
  });

  it('should throw on invalid input', () => {
    expect(() => hasBackendState.handleAnswer('a')).toThrow();
  });
});
