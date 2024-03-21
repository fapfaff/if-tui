import {CompositeState} from '../state';
import {WebTypeState} from './web-type-state';

/**
 * State for configuring a web project.
 * Adds build, serve, client and traffic components to the tree.
 */
export class WebState extends CompositeState {
  constructor(context: CompositeState) {
    super(context);
    this.unshiftStateToQueue(new WebTypeState(this));
  }
  async beforeStateExecution(): Promise<void> {
    this.getManifestBuilder().setNodeAtPath(['build'], {});
    this.getManifestBuilder().setNodeAtPath(['serve'], {});
    this.getManifestBuilder().setNodeAtPath(['traffic'], {});
    this.getManifestBuilder().setNodeAtPath(['client'], {});
  }
}
