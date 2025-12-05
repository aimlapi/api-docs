import * as codeSamples from './code-samples/index.js';

export function transformSchema(schema, options) {
  options.name = options.models?.[0] || options.name;
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
  } else if (options.codeSamples === 'responses') {
    codeSample = codeSamples.responsesSample(options);
  } else if (options.codeSamples === 'custom' && options.customParams) {
    codeSample = codeSamples.customSample(options);
  }

  // Remove unnecessary path because it's not needed (too large file)
  if (updatedSchema.paths?.['/responses']) {
    delete updatedSchema.paths['/responses'];
  }
  if (updatedSchema.paths?.['/images/generations']) {
    delete updatedSchema.paths['/images/generations'];
  }
  if (updatedSchema.paths?.['/v1/video/generations']) {
    delete updatedSchema.paths['/v1/video/generations'];
  }
  if (updatedSchema.paths?.['/video/generations']) {
    delete updatedSchema.paths['/video/generations'];
  }

  Object.entries(updatedSchema.paths).map(([path, operation]) => {
    if (operation.post) {
      if (codeSample) {
        updatedSchema.paths[path].post['x-codeSamples'] = codeSample;
      }
      if (options.models?.length) {
        let newModels = options.models;
        const defaultModel =
          updatedSchema?.paths?.[path]?.post?.requestBody?.content?.[
            'application/json'
          ]?.schema?.properties?.model?.enum?.[0];
        if (defaultModel && !newModels.includes(defaultModel)) {
          newModels = [defaultModel, ...newModels];
        }
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
