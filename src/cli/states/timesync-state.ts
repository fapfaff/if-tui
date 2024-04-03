import {Node} from '../../types/compute';
import {CompositeState} from '../state';

export class TimeSyncState extends CompositeState {
  constructor(context: CompositeState) {
    super(context);
  }

  async afterStateExecution(): Promise<void> {
    this.addTimeSyncPlugin();
    this.addTimeSyncToPipelines();
  }

  /**
   * Add the TimeSync plugin to the initialize section of the manifest.
   */
  private addTimeSyncPlugin() {
    const timeSyncPlugin = {
      path: 'builtin',
      method: 'TimeSync',
      'global-config': {
        'start-time':
          'TODO: Start time for evaluation as ISO timestamp (e.g. 2023-12-12T00:00:00.000Z)',
        'end-time':
          'TODO: End time for evaluation as ISO timestamp (e.g. 2023-12-12T00:01:00.000Z)',
        interval: 5,
      },
    };
    this.getManifestBuilder().addPlugin('timesync', timeSyncPlugin);
  }

  private addTimeSyncToPipelines() {
    const root = this.getManifestBuilder().getNodeAtPath([]);
    if (!root) throw new Error('Root node not found');
    this.addTimeSyncToPipelineRecursive(root);
  }

  private addTimeSyncToPipelineRecursive(node: Node) {
    if (node.pipeline) {
      //   add plugin before the sci plugin
      const sciIndex = node.pipeline.indexOf('sci');
      if (sciIndex !== -1) {
        node.pipeline.splice(sciIndex, 0, 'timesync');
        return;
      }
      node.pipeline.push('timesync');
    }

    if (!node.children) return;
    for (const child of Object.values(node.children)) {
      this.addTimeSyncToPipelineRecursive(child as Node);
    }
  }
}
