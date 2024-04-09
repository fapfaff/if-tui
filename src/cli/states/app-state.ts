import {CompositeState} from '../state';
import {HasBackendState} from './has-backend-state';

/**
 * State for configuring a mobile or desktop app project.
 */
export class AppState extends CompositeState {
  constructor(context: CompositeState) {
    super(context);
    this.stateQueue.push(new HasBackendState(this, []));
  }
  async beforeStateExecution(): Promise<void> {
    this.getManifestBuilder().setNodeAtPath(['build'], {});
    this.getManifestBuilder().setNodeAtPath(['client'], {});
  }
}
