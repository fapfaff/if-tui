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
   * Executes before the state is executed.
   * Adds the 'boavizta' plugin.
   * @returns A promise that resolves when the method completes.
   */
  async beforeStateExecution(): Promise<void> {
    const boaviztaPlugin = {
      path: '@grnsft/if-unofficial-plugins',
      method: 'BoaviztaCpuOutput',
      'global-config': {
        allocation: 'linear',
        verbose: true,
      },
    };
    this.getManifestBuilder().addPlugin('boavizta', boaviztaPlugin);

    const node = this.getManifestBuilder().getNodeAtPath(this.componentPath);
    if (!node) throw new Error('Node not found');
  }
}
