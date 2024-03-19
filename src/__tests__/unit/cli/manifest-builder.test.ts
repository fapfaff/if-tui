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
});
