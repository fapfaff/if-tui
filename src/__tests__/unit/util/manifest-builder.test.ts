import {Category, Complexity, Kind} from '../../../types/tags';
import {ManifestBuilder} from '../../../util/manifest-builder';

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
});
