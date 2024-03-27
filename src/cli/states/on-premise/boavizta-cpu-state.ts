import {Node} from '../../../types/compute';
import {CompositeState, WithComponent} from '../../state';
import {CpuCoresState} from './cpu-cores-state';
import {CpuLifespanState} from './cpu-lifespan-state';
import {CpuNameState} from './cpu-name-state';

/**
 * Represents the state to calculate the operational and embodied emissions of the CPU.
 * Uses the boavizta plugin.
 */
export class BoaviztaCpuState extends CompositeState implements WithComponent {
  componentPath: string[];

  constructor(context: CompositeState, componentPath: string[]) {
    super(context);
    this.componentPath = componentPath;
    this.stateQueue.push(new CpuNameState(this, componentPath));
    this.stateQueue.push(new CpuCoresState(this, componentPath));
    this.stateQueue.push(new CpuLifespanState(this, componentPath));
  }

  /**
   * Executes after the state is executed.
   * Adds the 'boavizta' plugin to initialize and pipeline. Adds required inputs
   * @returns A promise that resolves when the method completes.
   */
  async afterStateExecution(): Promise<void> {
    const boaviztaPlugin = {
      path: '@grnsft/if-unofficial-plugins',
      method: 'BoaviztaCpuOutput',
      'global-config': {
        allocation: 'linear',
        verbose: true,
      },
    };
    this.getManifestBuilder().addPlugin('boavizta-cpu', boaviztaPlugin);

    const node = this.getManifestBuilder().getNodeAtPath(this.componentPath);
    if (!node) throw new Error('Node not found');
    this.addInputs(node);
    this.addBoaviztaToPipeline(node);
  }

  private addInputs(node: Node): void {
    if (!node.inputs) node.inputs = [];

    if (!node.inputs[0]) node.inputs[0] = {};
    node.inputs[0]['timestamp'] = 'TODO: Timestamp of the measurement';
    node.inputs[0]['duration'] = 'TODO: Duration of the measurement';
    node.inputs[0]['cpu/utilization'] =
      'TODO: CPU usage as a percentage (e.g. 80)';
    // node.inputs[0]['gpu-util'] = 'TODO: GPU usage';
    // node.inputs[0]['ram-util'] = 'TODO: RAM usage';
  }

  /**
   * Adds 'boavizta' plugin to the pipeline of a given node.
   * @param node - The node to add 'boavizta' to its pipeline.
   */
  private addBoaviztaToPipeline(node: Node): void {
    if (!node.pipeline) {
      node.pipeline = [];
    }
    node.pipeline.push('boavizta-cpu');
  }
}
