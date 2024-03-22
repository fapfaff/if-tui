import {CompositeState, WithComponent} from '../state';

/**
 * State to configure a backend component.
 */
export class BackendState extends CompositeState implements WithComponent {
  componentPath: string[];

  /**
   * Creates a new instance of the BackendState class.
   * @param context The context of the state.
   * @param componentPath The path of the backend component.
   */
  constructor(context: CompositeState, componentPath: string[]) {
    super(context);
    this.componentPath = componentPath;
  }
}
