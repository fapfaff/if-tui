import {CompositeState} from '../state';

/**
 * State for configuring a machine learning project.
 */
export class MlState extends CompositeState {
  constructor(context: CompositeState) {
    super(context);
  }

  async beforeStateExecution(): Promise<void> {
    this.getManifestBuilder().setNodeAtPath(['data'], {});
    this.getManifestBuilder().setNodeAtPath(['training'], {});
    this.getManifestBuilder().setNodeAtPath(['inference'], {});
  }
}
