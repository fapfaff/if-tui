import {CompositeState, WithComponent} from '../state';
import {CarbonIntensityState} from './carbon-intensity-state';

/**
 * State that configures a node by adding inbound and outbound traffic inputs.
 */
export class TrafficState extends CompositeState implements WithComponent {
  componentPath: string[];

  /**
   * Constructs a new instance of the TrafficState class.
   * @param context The context of the composite state.
   * @param componentPath The path of the component.
   */
  constructor(context: CompositeState, componentPath: string[]) {
    super(context);
    this.componentPath = componentPath;
    this.stateQueue.push(new CarbonIntensityState(this, componentPath));
  }

  /**
   * Executes after the state execution.
   * Adds plugins, configures pipeline, and adds inputs.
   * @returns A promise that resolves when the execution is complete.
   */
  async afterStateExecution(): Promise<void> {
    this.addPlugins();
    this.configurePipeline();
    this.addInputs();
  }

  /**
   * Adds inputs to the component node.
   * If the node or inputs do not exist, they are created.
   */
  private addInputs() {
    const node = this.getManifestBuilder().getNodeAtPath(this.componentPath);
    if (!node) throw new Error('Node not found');

    if (!node.inputs) node.inputs = [];
    if (!node.inputs[0]) node.inputs[0] = {};

    node.inputs[0]['timestamp'] = 'TODO: Timestamp of the measurement';
    node.inputs[0]['duration'] = 'TODO: Duration of the measurement';
    node.inputs[0]['network/data-in'] =
      'TODO: Inbound Traffic in GB during duration (e.g. 100)';
    node.inputs[0]['network/data-out'] =
      'TODO: Outbound Traffic in GB during duration (e.g. 100)';
  }

  /**
   * Add e-net, sciO, sciE and sci plugins to the manifest.
   */
  private addPlugins() {
    const eNetPlugin = {
      path: '@grnsft/if-plugins',
      method: 'ENet',
    };
    const sciEnergyPlugin = {
      path: '@grnsft/if-plugins',
      method: 'SciE',
    };
    const sciOperationalPlugin = {
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

    this.getManifestBuilder().addPlugin('e-net', eNetPlugin);
    this.getManifestBuilder().addPlugin('sci-energy', sciEnergyPlugin);
    this.getManifestBuilder().addPlugin(
      'sci-operational',
      sciOperationalPlugin
    );
    this.getManifestBuilder().addPlugin('sci', sciPlugin);
  }

  /**
   * Add  e-net, sciO, sciE and sci to the pipeline of the node.
   */
  private configurePipeline() {
    const node = this.getManifestBuilder().getNodeAtPath(this.componentPath);
    if (!node) throw new Error('Node not found');

    if (!node.pipeline) node.pipeline = [];
    node.pipeline.push('e-net');
    node.pipeline.push('sci-energy');
    node.pipeline.push('sci-operational');
    node.pipeline.push('sci');
  }
}
