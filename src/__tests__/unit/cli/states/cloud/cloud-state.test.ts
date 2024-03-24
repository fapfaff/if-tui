import {CompositeState} from '../../../../../cli/state';
import {CloudInstanceState} from '../../../../../cli/states/cloud/cloud-instance-state';
import {CloudState} from '../../../../../cli/states/cloud/cloud-state';
import {CloudVendorState} from '../../../../../cli/states/cloud/cloud-vendor-state';
import {TuiManager} from '../../../../../cli/tui-manager';

describe('CloudState', () => {
  let context: CompositeState;
  let componentPath: string[];
  let cloudInstanceState: CloudState;

  beforeEach(() => {
    context = new TuiManager();
    componentPath = ['a', 'b'];
    cloudInstanceState = new CloudState(context, componentPath);
  });

  it('should create an instance of CloudVendorState', () => {
    expect(cloudInstanceState).toBeInstanceOf(CloudState);
  });

  it('should set the component path', () => {
    expect(cloudInstanceState.componentPath).toEqual(componentPath);
  });

  it('should add the CloudVendorState and CloudInstanceState to the state queue', () => {
    expect(cloudInstanceState.stateQueue).toHaveLength(2);
    expect(cloudInstanceState.stateQueue[0]).toBeInstanceOf(CloudVendorState);
    expect(cloudInstanceState.stateQueue[1]).toBeInstanceOf(CloudInstanceState);
  });
});
