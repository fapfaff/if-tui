import {Manifest} from '../types/manifest';

/**
 * Represents a builder for creating a manifest object.
 */
export class ManifestBuilder {
  private manifest: Manifest;

  constructor() {
    this.manifest = {
      name: '',
      description: '',
      tags: {
        kind: '',
        complexity: '',
        category: '',
      },
      aggregation: {
        metrics: [],
        type: 'both',
      },
      params: [],
      initialize: {
        plugins: {},
        outputs: [],
      },
      tree: {},
      'if-version': '',
    };
  }

  /**
   * Sets the name of the project.
   *
   * @param name - The name to set for the project.
   * @returns The current instance of the `ManifestBuilder` class.
   */
  setName(name: string): this {
    this.manifest.name = name;
    return this;
  }

  /**
   * Sets the description of the project.
   *
   * @param description - The description to set for the project.
   * @returns The current instance of the `ManifestBuilder` class.
   */
  setDescription(description: string): this {
    this.manifest.description = description;
    return this;
  }

  /**
   * Builds the manifest.
   *
   * @returns The built manifest.
   */
  build(): Manifest {
    return this.manifest;
  }
}
