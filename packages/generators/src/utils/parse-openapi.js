const _ = require('lodash');
const { ALIAS_MAP, MODELS_TO_ALIAS_MAP } = require('../templates');

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

const getVersionFromPath = (path) => {
  const match = path.match(/\/v(\d+)\//);
  return match ? parseInt(match[1], 10) : null;
};
const version_map = {};
const EXCEPTIONS_PAIR_MAP = {
  '/v2/generate/audio/minimax/upload': '/v2/generate/audio/minimax/generate',
  '/v2/generate/audio/minimax/generate': '/v2/generate/audio/minimax/upload'
};
const parseOpenapi = (openapi, fetchedModels) => {
  for (const model of fetchedModels) {
    if (ALIAS_MAP[model.alias]) {
      ALIAS_MAP[model.alias].push(model.name);
    } else {
      ALIAS_MAP[model.alias] = [model.name];
    }
    MODELS_TO_ALIAS_MAP[model.name] = {alias: model.alias, path: '', category: model.category, offsite_name: model.offsite_name};
  }
  
  const byModel = {};
  const pairs = {};
  const schemaById = openapi.components.schemas;

  for (const path in openapi.paths) {
    for (const method in openapi.paths[path]) {
      if (method !== 'post') {
        continue;
      }

      const version = getVersionFromPath(path);
      const basePath = path.replace(/\/v\d+\//, '/');
      if (version_map[basePath] === 1) {
        continue
      }
      version_map[basePath] = version;

      const pairData = {
        has: false,
        path: '', 
        schema: undefined,
        operation: undefined, 
        method: '',
      };
      // Some models require two requests to be displayed on the page. Typically these are get and post requests. Exceptions are entered separately in EXCEPTIONS_PAIR_MAP.
      if (EXCEPTIONS_PAIR_MAP[path] || (openapi.paths[path]['get'] && (path.includes('/generate/audio') || path.includes('/generate/video')) && version)) {
        if(EXCEPTIONS_PAIR_MAP[path]) {
          pairs[path] = EXCEPTIONS_PAIR_MAP[path]
          pairData.has = true
          pairData.method = 'post'
          pairData.path = EXCEPTIONS_PAIR_MAP[path]
        } else {
          pairs[path] = path
          pairData.has = true
          pairData.method = 'get'
          pairData.path =  path
        }
      }
     
      const operation = openapi.paths[path][method];

      const refId = openapi.paths[path][method].requestBody?.content?.['application/json']?.schema?.$ref
        .split('/')
        .at(-1);
      const schema = schemaById[refId];
      const models = extractModels(schema, schemaById);

      if (pairData.has) {        
        const operation = openapi.paths[pairData.path][pairData.method];

        const refId = openapi.paths[pairData.path][method].requestBody?.content?.['application/json']?.schema?.$ref
          .split('/')
          .at(-1);
        const schema = schemaById[refId];
        pairData.operation = operation
        pairData.schema = schema
      }

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

        const pair = {
          has: false,
          path: '',
          schema: undefined,
          method: ''
        };

        if (pairData.has) {
          const unionPair = extractUnion(model, pairData.schema, schemaById);
  
          const transformedPair = {
            paths: {
              [pairData.path]: {
                [pairData.method]: {
                  ...pairData.operation,
                  requestBody: {
                    ...pairData.operation.requestBody,
                    content: {
                      ['application/json']: {
                        schema: unionPair,
                      },
                    },
                  },
                },
              },
            },
            ...rest,
          };
          pair.has = true;
          pair.path = pairData.path;
          pair.method = pairData.method;
          pair.schema = transformedPair;
        }

        byModel[model] = { path, schema: transformed, method, pair };
      }
    }
  }

  return { byModel };
};

module.exports = parseOpenapi;
