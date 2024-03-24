import {NameState} from '../../../../../cli/states/metadata/name-state';
import {TuiManager} from '../../../../../cli/tui-manager';
import {Answer} from '../../../../../types/answer';

describe('NameState', () => {
  let nameState: NameState;
  const context = new TuiManager();

  beforeEach(() => {
    nameState = new NameState(context);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should set the name field in the manifest', () => {
    const answer: Answer = 'My Project';
    nameState.handleAnswer(answer);

    const manifest = nameState.getManifestBuilder().build();
    expect(manifest.name).toBe(answer);
  });

  it('should throw an error for invalid answer type', () => {
    const answer: Answer = 123;
    expect(() => {
      nameState.handleAnswer(answer);
    }).toThrow('Invalid answer type');
  });
});
