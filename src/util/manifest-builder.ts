import {Manifest} from '../types/manifest';
import {Node} from '../types/compute';
import {Category, Complexity, Kind} from '../types/tags';

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
        kind: undefined,
        complexity: undefined,
        category: undefined,
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
   * Sets the category of the manifest.
   *
   * @param category - The category to set.
   * @returns The updated instance of the `ManifestBuilder` class.
   */
  setCategory(category: Category | string): this {
    this.manifest.tags!.category = category.toString();
    return this;
  }

  /**
   * Sets the kind of the manifest.
   *
   * @param kind - The kind of the manifest.
   * @returns The updated instance of the `ManifestBuilder` class.
   */
  setKind(kind: Kind | string): this {
    this.manifest.tags!.kind = kind.toString();
    return this;
  }

  /**
   * Sets the complexity of the manifest.
   *
   * @param complexity - The complexity value to set.
   * @returns The updated instance of the `ManifestBuilder` class.
   */
  setComplexity(complexity: Complexity | string): this {
    this.manifest.tags!.complexity = complexity.toString();
    return this;
  }

  /**
   * Sets the node at the specified path in the manifest tree.
   *
   * @param path - The path to the node in the manifest tree.
   * @param node - The node to set at the specified path.
   * @returns The updated `ManifestBuilder` instance.
   */
  setNodeAtPath(path: string[], node: Node) {
    const last = path.pop();
    let current = this.manifest.tree;
    for (const key of path) {
      if (!current.children) current.children = {};
      if (!current.children[key]) {
        current.children[key] = {};
      }
      current = current.children[key];
    }

    if (!current.children) current.children = {};
    current.children[last!] = node;

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
