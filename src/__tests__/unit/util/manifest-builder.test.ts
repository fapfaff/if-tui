import {Category, Complexity, Kind} from '../../../types/tags';
import {ManifestBuilder} from '../../../util/manifest-builder';
import {Node} from '../../../types/compute';
import {PluginOptions} from '../../../types/manifest';

describe('ManifestBuilder', () => {
  let manifestBuilder: ManifestBuilder;

  beforeEach(() => {
    manifestBuilder = new ManifestBuilder();
  });

  it('should set the name of the project', () => {
    const name = 'My Project';
    const result = manifestBuilder.setName(name);

    expect(result).toBe(manifestBuilder);
    expect(manifestBuilder.build().name).toBe(name);
  });

  it('should set the description of the project', () => {
    const description = 'This is a test project';
    const result = manifestBuilder.setDescription(description);

    expect(result).toBe(manifestBuilder);
    expect(manifestBuilder.build().description).toBe(description);
  });

  it('should set the category of the manifest', () => {
    const category = Category.Cloud;

    const result = manifestBuilder.setCategory(category).build();

    expect(result.tags!.category).toBe(category);
  });

  it('should set the kind of the manifest', () => {
    const kind = Kind.App;

    const result = manifestBuilder.setKind(kind).build();

    expect(result.tags!.kind).toBe(kind);
  });

  it('should set the complexity of the manifest', () => {
    const complexity = Complexity.Simple;

    const result = manifestBuilder.setComplexity(complexity).build();

    expect(result.tags!.complexity).toBe(complexity);
  });

  it('should build the manifest', () => {
    const name = 'My Project';
    const description = 'This is a test project';

    const result = manifestBuilder
      .setName(name)
      .setDescription(description)
      .build();

    expect(result.name).toBe(name);
    expect(result.description).toBe(description);
  });
  it('should not set tags if not provided', () => {
    const result = manifestBuilder.build();

    expect(result.tags?.category).toBeUndefined();
    expect(result.tags?.kind).toBeUndefined();
    expect(result.tags?.complexity).toBeUndefined();
  });

  describe('setNodeAtPath', () => {
    it('should create a new node with a single path', () => {
      const path = ['a'];
      const node: Node = {
        pipeline: ['element1', 'element2'],
      };
      manifestBuilder.setNodeAtPath(path, node);

      const result = manifestBuilder.build();
      expect(result.tree.children.a).toEqual(node);
    });
    it('should add empty nodes when path not existing', () => {
      const path = ['a', 'b'];
      const node: Node = {
        pipeline: ['element1', 'element2'],
      };
      manifestBuilder.setNodeAtPath(path, node);

      const result = manifestBuilder.build();

      expect(result.tree).toEqual({children: {a: {children: {b: node}}}});
    });
    it('should add a node as a children of an existing node', () => {
      const node1: Node = {
        pipeline: ['element1', 'element2'],
      };
      const node2: Node = {
        pipeline: ['element3', 'element4'],
      };
      manifestBuilder.setNodeAtPath(['a'], node1);

      manifestBuilder.setNodeAtPath(['a', 'b'], node2);
      const result = manifestBuilder.build();

      expect(result.tree).toEqual({
        children: {
          a: {children: {b: node2}, pipeline: ['element1', 'element2']},
        },
      });
    });
    it('should not delete other children when adding a new node', () => {
      const node1: Node = {
        pipeline: ['element1', 'element2'],
        children: {
          b: {
            pipeline: ['element5', 'element6'],
          },
        },
      };
      const node2: Node = {
        pipeline: ['element3', 'element4'],
      };
      manifestBuilder.setNodeAtPath(['a'], node1);

      manifestBuilder.setNodeAtPath(['a', 'c'], node2);
      const result = manifestBuilder.build();

      expect(result.tree).toEqual({
        children: {
          a: {
            children: {
              b: {
                pipeline: ['element5', 'element6'],
              },
              c: node2,
            },
            pipeline: ['element1', 'element2'],
          },
        },
      });
    });
    it('should override an existing node', () => {
      const node1: Node = {
        pipeline: ['element1', 'element2'],
        children: {
          b: {
            pipeline: ['element5', 'element6'],
          },
        },
      };
      const node2: Node = {
        pipeline: ['element3', 'element4'],
      };
      manifestBuilder.setNodeAtPath(['a'], node1);

      manifestBuilder.setNodeAtPath(['a'], node2);
      const result = manifestBuilder.build();

      expect(result.tree).toEqual({
        children: {
          a: {pipeline: ['element3', 'element4']},
        },
      });
    });
    it('should not modify the path array', () => {
      const path = ['a', 'b'];
      const node: Node = {
        pipeline: ['element1', 'element2'],
      };
      manifestBuilder.setNodeAtPath(path, node);

      expect(path).toEqual(['a', 'b']);
    });
  });
  describe('addPlugin', () => {
    const operationalCarbon: PluginOptions = {
      path: '@grnsft/if-plugins',
      method: 'Multiply',
      'global-config': {
        'input-parameters': ['cpu/energy', 'grid/carbon-intensity'],
        'output-parameter': 'carbon',
      },
    };
    const teadsCurve: PluginOptions = {
      path: '@grnsft/if-unofficial-plugins',
      method: 'TeadsCurve',
      'global-config': {
        interpolation: 'spline',
      },
    };
    it('should add a plugin to the manifest', () => {
      manifestBuilder.addPlugin('operational-carbon', operationalCarbon);

      const result = manifestBuilder.build();

      expect(result.initialize.plugins).toEqual({
        'operational-carbon': operationalCarbon,
      });
    });
    it('should add multiple plugins to the manifest', () => {
      manifestBuilder.addPlugin('operational-carbon', operationalCarbon);
      manifestBuilder.addPlugin('teads-curve', teadsCurve);

      const result = manifestBuilder.build();

      expect(result.initialize.plugins).toEqual({
        'operational-carbon': operationalCarbon,
        'teads-curve': teadsCurve,
      });
    });
    it('should ignore if the plugin already exists with the same config', () => {
      manifestBuilder.addPlugin('operational-carbon', operationalCarbon);

      manifestBuilder.addPlugin('operational-carbon', operationalCarbon);
      const result = manifestBuilder.build();

      expect(result.initialize.plugins).toEqual({
        'operational-carbon': operationalCarbon,
      });
    });
    it('should throw an error if the plugin name already exists with a different config', () => {
      manifestBuilder.addPlugin('operational-carbon', operationalCarbon);

      expect(() => {
        manifestBuilder.addPlugin('operational-carbon', teadsCurve);
      }).toThrow('There is already a plugin configured with this name.');
    });
    it('should throw an error if the plugin name is invalid', () => {
      expect(() => {
        manifestBuilder.addPlugin('', operationalCarbon);
      }).toThrow('Invalid plugin name.');
    });
  });
});
