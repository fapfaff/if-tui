import {CompositeState} from './state';

/**
 * The entrypoiny of the tui. Calling the execute() method will start the tui, which will
 * execute the states in the state queue sequentially.
 */
export class TuiManager extends CompositeState {
  constructor() {
    super(undefined!);
  }
}
