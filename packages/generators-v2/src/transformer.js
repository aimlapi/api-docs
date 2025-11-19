import * as codeSamples from './code-samples/index.js';

export function transformSchema(schema, options) {
  const updatedSchema = { ...schema };
  if (!updatedSchema.components) {
    updatedSchema.components = {};
  }
  updatedSchema.components = {
    securitySchemes: {
      'access-token': {
        scheme: 'bearer',
        bearerFormat: '<YOUR_AIMLAPI_KEY>',
        type: 'http',
        description: 'Bearer key',
      },
    },
  };
  if (!options.hideTryItPanel || options.hideTryItPanel === true) {
    Object.entries(updatedSchema.paths).map(([path, operation]) => {
      for (const method of ['get', 'post']) {
        if (operation[method]) {
          updatedSchema.paths[path][method]['x-hideTryItPanel'] = true;
        }
      }
    });
  }
  if (options.codeSamples === 'hide') {
    Object.entries(updatedSchema.paths).map(([path, operation]) => {
      for (const method of ['get', 'post']) {
        if (operation[method]) {
          updatedSchema.paths[path][method]['x-codeSamples'] = [];
        }
      }
    });
  }
  let codeSample;
  if (options.codeSamples === 'chat-completion') {
    codeSample = codeSamples.chatCompletionSample(options);
  } else if (options.codeSamples === 'chat-completion-audio') {
    codeSample = codeSamples.chatCompletionAudioSample(options);
  } else if (options.codeSamples === 'text-to-image') {
    codeSample = codeSamples.textToImageSample(options);
  } else if (options.codeSamples === 'image-to-image') {
    codeSample = codeSamples.imageToImageSample(options, schema);
  } else if (options.codeSamples === 'gpt-image-edit') {
    codeSample = codeSamples.gptImageEditSample(options);
  } else if (options.codeSamples === 'custom' && options.customParams) {
    codeSample = codeSamples.customSample(options);
  }

  Object.entries(updatedSchema.paths).map(([path, operation]) => {
    if (operation.post) {
      if (codeSample) {
        updatedSchema.paths[path].post['x-codeSamples'] = codeSample;
      }
      if (options.models?.length) {
        const newModels = [
          ...new Set([
            ...(updatedSchema.paths[path]?.post?.requestBody?.content[
              'application/json'
            ]?.schema?.properties?.model?.enum || []),
            ...options.models,
          ]),
        ];
        try {
          updatedSchema.paths[path].post.requestBody.content[
            'application/json'
          ].schema.properties.model.enum = newModels;
        } catch (e) {
          console.error(e);
        }
      }
      if (
        updatedSchema.paths[path]?.post?.responses?.['200']?.content?.[
          'application/json'
        ]?.schema?.properties?.model
      ) {
        updatedSchema.paths[path].post.responses['200'].content[
          'application/json'
        ].schema.properties.model.example = options.name;
      }
    }
  });

  return updatedSchema;
}
