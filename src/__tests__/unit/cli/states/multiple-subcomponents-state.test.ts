import {CompositeState} from '../../../../cli/state';
import {BackendState} from '../../../../cli/states/backend-state';
import {MultipleSubcomponentsState} from '../../../../cli/states/multiple-subcomponents-state';
import {TuiManager} from '../../../../cli/tui-manager';
import {OpenTextQuestion} from '../../../../cli/question';

describe('MultipleSubcomponentState', () => {
  let context: CompositeState;
  let componentPath: string[];
  let multipleSubcomponentState: MultipleSubcomponentsState;

  beforeEach(() => {
    context = new TuiManager();
    componentPath = ['a', 'b'];
    multipleSubcomponentState = new MultipleSubcomponentsState(
      context,
      componentPath,
      'backend',
      (ctx, path) => {
        return new BackendState(ctx, path);
      }
    );
    multipleSubcomponentState
      .getManifestBuilder()
      .setNodeAtPath(componentPath, {});
  });

  it('should create an instance of MultipleSubcomponentsState', () => {
    expect(multipleSubcomponentState).toBeInstanceOf(
      MultipleSubcomponentsState
    );
  });

  it('should contain question', () => {
    expect(multipleSubcomponentState.question).toEqual(
      new OpenTextQuestion(
        'How many backend components do you want to add?',
        '1'
      )
    );
  });

  it('should set the component path correctly', () => {
    const componentPath = ['backend'];
    const state = new BackendState(new TuiManager(), componentPath);

    expect(state.componentPath).toEqual(componentPath);
  });

  it('should throw on invalid input', () => {
    expect(() => multipleSubcomponentState.handleAnswer('a')).toThrow();
  });

  it('should add no subcomponent', () => {
    multipleSubcomponentState.handleAnswer('0');

    const manifest = multipleSubcomponentState.getManifestBuilder().build();

    expect(manifest.tree.children).toEqual({
      a: {
        children: {
          b: {},
        },
      },
    });
  });

  it('should add two subcomponents', () => {
    multipleSubcomponentState.handleAnswer('2');

    const manifest = multipleSubcomponentState.getManifestBuilder().build();

    expect(manifest.tree.children).toEqual({
      a: {
        children: {
          b: {
            children: {
              'b-1': {},
              'b-2': {},
            },
          },
        },
      },
    });
  });

  it('should add no state to the queue', () => {
    const pushStateToQueueSpy = jest.spyOn(context, 'pushStateToQueue');
    const unshiftStateToQueueSpy = jest.spyOn(context, 'unshiftStateToQueue');

    multipleSubcomponentState.handleAnswer('0');

    expect(pushStateToQueueSpy).toHaveBeenCalledTimes(0);
    expect(unshiftStateToQueueSpy).toHaveBeenCalledTimes(0);
  });

  it('should add one state to the queue', () => {
    const pushStateToQueueSpy = jest.spyOn(context, 'pushStateToQueue');
    const unshiftStateToQueueSpy = jest.spyOn(context, 'unshiftStateToQueue');

    multipleSubcomponentState.handleAnswer('1');

    expect(pushStateToQueueSpy).toHaveBeenCalledTimes(0);
    expect(unshiftStateToQueueSpy).toHaveBeenCalledTimes(1);

    expect(unshiftStateToQueueSpy).toHaveBeenNthCalledWith(
      1,
      new BackendState(context, ['a', 'b'])
    );
  });

  it('should add two states to the queue', () => {
    const pushStateToQueueSpy = jest.spyOn(context, 'pushStateToQueue');
    const unshiftStateToQueueSpy = jest.spyOn(context, 'unshiftStateToQueue');

    multipleSubcomponentState.handleAnswer('2');

    expect(pushStateToQueueSpy).toHaveBeenCalledTimes(0);
    expect(unshiftStateToQueueSpy).toHaveBeenCalledTimes(2);

    expect(unshiftStateToQueueSpy).toHaveBeenNthCalledWith(
      1,
      new BackendState(context, ['a', 'b', 'b-1'])
    );
    expect(unshiftStateToQueueSpy).toHaveBeenNthCalledWith(
      2,
      new BackendState(context, ['a', 'b', 'b-2'])
    );
  });
});
