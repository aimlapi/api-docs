const { OPENAPI_URL: SWAGGER_URL } = require('../config');
const PageGenerator = require('./common/page');
const PathPlugin = require('./plugins/path');

const FEATURE_TO_PATH = {
  'anthropic/message-completion': '/v1/messages',
  'anthropic/message-completion.function': '/v1/messages',
  'anthropic/message-completion.vision': '/v1/messages',
  'openai/chat-assistant': '/v1/assistants',
  'openai/chat-completion': '/v1/chat/completions',
  'openai/chat-completion.function': '/v1/chat/completions',
  'openai/chat-completion.vision': '/v1/chat/completions',
  'openai/completion': '/v1/completions',
};

class ModelPageGenerator extends PageGenerator {
  featureToPath(feature) {
    return [FEATURE_TO_PATH][feature];
  }

  *generate() {
    const { next: _, effects: __, model, swagger, ...rest } = this.config;

    const { byModel } = swagger;

    const { path, schema } = byModel[model.name];

    if (!path) {
      console.warn(`Model '${model.name}' path not found.`);
    }

    yield this.done(
      {
        ...rest,
        swagger: {
          ...rest.swagger,
          url: SWAGGER_URL,
          path,
          method: 'post',
          schema,
        },
        model: this.config.model.name,
      },
      PathPlugin.traverse(`/${this.config.model.name.replaceAll('/', ' ')}`),
    );
  }
}

module.exports = ModelPageGenerator;
