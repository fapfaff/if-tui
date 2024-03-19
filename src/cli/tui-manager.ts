import {ManifestBuilder} from '../util/manifest-builder';
import {CompositeState} from './state';
import {NameState} from './states/name-state';

/**
 * The entrypoiny of the tui. Calling the execute() method will start the tui, which will
 * execute the states in the state queue sequentially.
 */
export class TuiManager extends CompositeState {
  manifestBuilder: ManifestBuilder;

  constructor() {
    super(undefined!);
    this.manifestBuilder = new ManifestBuilder();
    this.pushStateToQueue(new NameState(this));
  }

  public getManifestBuilder(): ManifestBuilder {
    return this.manifestBuilder;
  }
}
