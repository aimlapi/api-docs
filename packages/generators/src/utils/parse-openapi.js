const _ = require('lodash');

const aliasesMap = {}

const extractModels = (schema, schemaById) => {
  if (schema.properties?.model?.enum) {
    return schema.properties.model.enum;
  }

  if (Array.isArray(schema.anyOf)) {
    return schema.anyOf.flatMap((v) => extractModels(v, schemaById));
  }

  if (Array.isArray(schema.oneOf)) {
    return schema.oneOf.flatMap((v) => extractModels(v, schemaById));
  }

  if (Array.isArray(schema.allOf)) {
    return schema.allOf.flatMap((v) => extractModels(v, schemaById));
  }

  if (schema.$ref) {
    return extractModels(schemaById[schema.$ref.split('/').at(-1)], schemaById);
  }

  return [];
};

const extractUnion = (model, schema, schemaById) => {
  if (schema.properties?.model?.enum) {
    if (schema.properties.model.enum.includes(model)) {
      const cloned = _.cloneDeep(schema);
      cloned.properties = {
        ...cloned.properties,
        model: { ...cloned.properties.model, enum: aliasesMap[model] ? aliasesMap[model] : [model] },
      };

      return cloned;
    }
  }

  if (Array.isArray(schema.anyOf)) {
    for (const inner of schema.anyOf) {
      const extracted = extractUnion(model, inner, schemaById);
      if (extracted) {
        return extracted;
      }
    }
  }

  if (Array.isArray(schema.oneOf)) {
    for (const inner of schema.oneOf) {
      const extracted = extractUnion(model, inner, schemaById);
      if (extracted) {
        return extracted;
      }
    }
  }

  if (Array.isArray(schema.allOf)) {
    return schema;
  }

  if (schema.$ref) {
    return extractUnion(model, schemaById[schema.$ref.split('/').at(-1)], schemaById);
  }

  return null;
};

const getVersionFromUrl = (url) => {
  const match = url.match(/\/v(\d+)\//);
  return match ? parseInt(match[1], 10) : null;
}
const VERSION_MAP = {

}
const parseOpenapi = (openapi, fetchedModels) => {
  for (const model of fetchedModels) {
    if (aliasesMap[model.alias]) {
      aliasesMap[model.alias].push(model.name)
    } else {
      aliasesMap[model.alias] = [model.name]
    }
  }
  
  const byModel = {};
  const schemaById = openapi.components.schemas;

  for (const path in openapi.paths) {
    for (const method in openapi.paths[path]) {
      if (method !== 'post') {
        continue;
      }
      const version = getVersionFromUrl(path)
      const basePath = path.replace(/\/v\d+\//, '/');
      if (VERSION_MAP[basePath] === 1) {
        console.log(VERSION_MAP)
        continue
      }
      VERSION_MAP[basePath] = version
      const operation = openapi.paths[path][method];

      const refId = openapi.paths[path][method].requestBody?.content?.['application/json']?.schema?.$ref
        .split('/')
        .at(-1);
      const schema = schemaById[refId];
      const models = extractModels(schema, schemaById);

      for (const model of models) {
        const union = extractUnion(model, schema, schemaById);

        const { paths, ...rest } = openapi;

        const transformed = {
          paths: {
            [path]: {
              [method]: {
                ...operation,
                requestBody: {
                  ...operation.requestBody,
                  content: {
                    ['application/json']: {
                      schema: union,
                    },
                  },
                },
              },
            },
          },
          ...rest,
        };

        byModel[model] = { path, schema: transformed };
      }
    }
  }

  return { byModel };
};

module.exports = parseOpenapi;
