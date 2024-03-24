import {CompositeState, WithComponent} from '../../state';
import {BoaviztaCpuState} from './boavizta-cpu-state';

/**
 * State for configuring an on-premise component.
 */
export class OnPremiseState extends CompositeState implements WithComponent {
  componentPath: string[];

  constructor(context: CompositeState, componentPath: string[]) {
    super(context);
    this.componentPath = componentPath;
    this.stateQueue.push(new BoaviztaCpuState(this, componentPath));
  }
}
