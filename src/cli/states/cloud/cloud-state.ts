import {CompositeState, WithComponent} from '../../state';
import {CloudInstanceState} from './cloud-instance-state';
import {CloudVendorState} from './cloud-vendor-state';

/**
 * State for configuring a cloud component.
 */
export class CloudState extends CompositeState implements WithComponent {
  componentPath: string[];

  constructor(context: CompositeState, componentPath: string[]) {
    super(context);
    this.componentPath = componentPath;
    this.stateQueue.push(
      new CloudVendorState(this, componentPath),
      new CloudInstanceState(this, componentPath)
    );
  }
}
