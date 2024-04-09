import {CompositeState, WithComponent} from '../../state';
import {CarbonIntensityState} from '../carbon-intensity-state';
import {CloudInstanceState} from './cloud-instance-state';
import {CloudVendorState} from './cloud-vendor-state';

/**
 * State for configuring a cloud component.
 */
export class CloudState extends CompositeState implements WithComponent {
  componentPath: string[];

  constructor(context: CompositeState, componentPath: string[]) {
    super(context);
    this.componentPath = componentPath;
    this.stateQueue.push(
      new CloudVendorState(this, componentPath),
      new CloudInstanceState(this, componentPath),
      new CarbonIntensityState(this, componentPath)
    );
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
