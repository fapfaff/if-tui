import {CompositeState} from '../state';
import {HasBackendState} from './has-backend-state';

/**
 * State for configuring a iot project.
 */
export class IotState extends CompositeState {
  constructor(context: CompositeState) {
    super(context);
    this.stateQueue.push(new HasBackendState(this, []));
  }

  async beforeStateExecution(): Promise<void> {
    this.getManifestBuilder().setNodeAtPath(['hardware'], {});
    this.getManifestBuilder().setNodeAtPath(['firmware'], {});
  }
}
