import {promises} from 'fs';
import * as yaml from 'js-yaml';
import {ManifestBuilder} from '../util/manifest-builder';
import {CompositeState} from './state';
import {DescriptionState} from './states/metadata/description-state';
import {FileNameState} from './states/file-name-state';
import {NameState} from './states/metadata/name-state';
import {CategoryState} from './states/metadata/category-state';
import {ComplexityState} from './states/metadata/complexity-state';
import {KindState} from './states/metadata/kind-state';
import {TimeSyncState} from './states/timesync-state';

/**
 * The entrypoiny of the tui. Calling the execute() method will start the tui, which will
 * execute the states in the state queue sequentially.
 */
export class TuiManager extends CompositeState {
  manifestBuilder: ManifestBuilder;
  manifestFileName = '';

  constructor() {
    super(undefined!);
    this.manifestBuilder = new ManifestBuilder();
    this.pushStateToQueue(new NameState(this));
    this.pushStateToQueue(new DescriptionState(this));
    this.pushStateToQueue(new CategoryState(this));
    this.pushStateToQueue(new ComplexityState(this));
    this.pushStateToQueue(new KindState(this));
    this.pushStateToQueue(new TimeSyncState(this));
    this.pushStateToQueue(new FileNameState(this));
  }

  /**
   * Builds the manifest and writes it to a file.
   */
  async afterStateExecution(): Promise<void> {
    const manifest = this.manifestBuilder.build();
    await promises.writeFile(this.manifestFileName, yaml.dump(manifest));
  }

  /**
   * Gets the manifest builder.
   * @returns The manifest builder.
   */
  public getManifestBuilder(): ManifestBuilder {
    return this.manifestBuilder;
  }

  /**
   * Sets the name of the manifest file.
   * @param fileName the name of the manifest file.
   */
  public setManifestFileName(fileName: string): void {
    this.manifestFileName = fileName;
  }
}
