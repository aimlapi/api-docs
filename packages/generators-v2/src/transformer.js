export function transformSchema(schema, options) {
  const updatedSchema = { ...schema };
  if (!options.hideTryItPanel || options.hideTryItPanel === true) {
    Object.entries(updatedSchema.paths).map(([path, operation]) => {
      for (const method of ['get', 'post']) {
        if (operation[method]) {
          updatedSchema.paths[path][method]['x-hideTryItPanel'] = true;
        }
      }
    });
  }
  if (options.codeSamples === undefined) {
    Object.entries(updatedSchema.paths).map(([path, operation]) => {
      for (const method of ['get', 'post']) {
        if (operation[method]) {
          updatedSchema.paths[path][method]['x-codeSamples'] = [];
        }
      }
    });
  }

  return updatedSchema;
}
