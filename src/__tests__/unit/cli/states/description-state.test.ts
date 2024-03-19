import {DescriptionState} from '../../../../cli/states/description-state';
import {TuiManager} from '../../../../cli/tui-manager';
import {Answer} from '../../../../types/answer';

describe('DescriptionState', () => {
  let descriptionState: DescriptionState;
  const context = new TuiManager();

  beforeEach(() => {
    descriptionState = new DescriptionState(context);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should set the description field in the manifest', () => {
    const answer: Answer = 'Description';
    descriptionState.handleAnswer(answer);

    const manifest = descriptionState.getManifestBuilder().build();
    expect(manifest.description).toBe(answer);
  });

  it('should throw an error for invalid answer type', () => {
    const answer: Answer = 123;
    expect(() => {
      descriptionState.handleAnswer(answer);
    }).toThrow('Invalid answer type');
  });
});
