import {Manifest, PluginOptions} from '../types/manifest';
import {Node} from '../types/compute';
import {Category, Complexity, Kind} from '../types/tags';
import equal = require('fast-deep-equal');
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
        metrics: ['carbon'],
        type: 'both',
      },
      initialize: {
        plugins: {},
      },
      tree: {},
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
   * Retrieves the node at the specified path in the manifest tree.
   * @param path - An array of strings representing the path to the desired node.
   * @returns The node at the specified path, or undefined if the node does not exist.
   */
  getNodeAtPath(path: string[]): Node | undefined {
    let current = this.manifest.tree;
    for (let i = 0; i < path.length; i++) {
      const key = path[i];
      if (!current.children) return undefined;
      if (!current.children[key]) return undefined;
      current = current.children[key];
    }

    return current;
  }

  /**
   * Get the plugins from the manifest.
   * @returns The plugins from the manifest.
   */
  getPlugins() {
    return this.manifest.initialize.plugins;
  }

  /**
   * Adds a plugin to the manifest builder.
   * @param pluginName - The name of the plugin.
   * @param pluginOptions - The options for the plugin.
   * @throws {Error} If there is already a plugin configured with the same name.
   */
  addPlugin(pluginName: string, pluginOptions: PluginOptions) {
    if (pluginName === '') throw new Error('Invalid plugin name.');
    if (this.manifest.initialize.plugins[pluginName]) {
      if (equal(this.manifest.initialize.plugins[pluginName], pluginOptions)) {
        return;
      }
      throw new Error('There is already a plugin configured with this name.');
    }

    this.manifest.initialize.plugins[pluginName] = pluginOptions;
  }

  /**
   * Sets the node at the specified path in the manifest tree.
   *
   * @param path - The path to the node in the manifest tree.
   * @param node - The node to set at the specified path.
   * @returns The updated `ManifestBuilder` instance.
   */
  setNodeAtPath(path: string[], node: Node) {
    let current = this.manifest.tree;
    for (let i = 0; i < path.length - 1; i++) {
      const key = path[i];
      if (!current.children) current.children = {};
      if (!current.children[key]) {
        current.children[key] = {};
      }
      current = current.children[key];
    }

    if (!current.children) current.children = {};

    const last = path[path.length - 1];
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
