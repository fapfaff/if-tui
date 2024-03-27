import {CompositeState, WithComponent} from '../state';
import {HostingState} from './hosting-state';

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
    this.stateQueue.push(new HostingState(this, componentPath));
  }

  async afterStateExecution(): Promise<void> {
    this.addPlugins();
    this.addPluginsToPipeline();
  }

  /**
   * Adds sci-operational and sci plugins to the initialize section.
   */
  private async addPlugins(): Promise<void> {
    const sciOPlugin = {
      path: '@grnsft/if-plugins',
      method: 'SciO',
    };
    const sciPlugin = {
      path: '@grnsft/if-plugins',
      method: 'Sci',
      'global-config': {
        'functional-unit-time': '5 minutes',
      },
    };

    this.getManifestBuilder().addPlugin('sci-operational', sciOPlugin);
    this.getManifestBuilder().addPlugin('sci', sciPlugin);
  }

  /**
   * Adds sci-operational and sci plugins to the pipeline of the current node in the manifest builder.
   * @returns A Promise that resolves when the plugins are added successfully.
   * @throws An error if the node is not found.
   */
  private async addPluginsToPipeline(): Promise<void> {
    const node = this.getManifestBuilder().getNodeAtPath(this.componentPath);
    if (!node) throw new Error('Node not found');
    if (!node.pipeline) node.pipeline = [];
    node.pipeline.push('sci-operational');
    node.pipeline.push('sci');
  }
}
