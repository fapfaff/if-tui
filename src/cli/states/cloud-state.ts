import {CompositeState, WithComponent} from '../state';

/**
 * State for configuring a cloud component.
 */
export class CloudState extends CompositeState implements WithComponent {
  componentPath: string[];

  constructor(context: CompositeState, componentPath: string[]) {
    super(context);
    this.componentPath = componentPath;
    // TODO
  }
}
