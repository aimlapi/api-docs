const fs = require('fs');
const path = require('path');

const readTemplate = (name) => {
  const content = fs.readFileSync(path.join(__dirname, `./${name}.hbs`), 'utf8');

  return `[#references:start]: <> ({ "template": "${name}" })
${content}
[#references:end]: <> ({})`;
};

const replaceTemplate =
  (name, replacer = (match, next) => match.replace(match, next)) =>
  (prev, next) => {
    if (!prev.trim()) {
      return next;
    }

    const expr = /^\[#references:start\]:\s<>\s\(({.+?})\)(.+)\[#references:end\].+?$/gms;
    if([TEMPLATE.openapi, TEMPLATE.modelsData].includes(name)){
      return prev.replace(expr, (match, payload, content) => {
        const config = JSON.parse(payload);
        
        if (config.template === name) {
          const updatedContent = replacer(content, next);

          if (updatedContent.includes('[#references:start]:')) {
            return updatedContent
          }
          return `[#references:start]: <> (${payload})${updatedContent}\n\n[#references:end]: <> ({})`;
        } 
        return match; 
      });
    }
    
    return prev.replace(expr, (match, payload, content) => {

      const config = JSON.parse(payload);
      const replaced =
        config.template === name ? match.replace(content, '\n' + replacer(content, next) + '\n') : content;
      return replaced;
    });
  };

const summaryReplacer = (match, next) => {
  const { path, provider } = next;

  const summary = SummaryParserMap.parse(match);

  summary[provider] = {
    ...summary[provider],
    key: provider,
    value: path,
    children: { ...summary[provider]?.children },
  };

  const stringified = SummaryParserMap.stringify(summary);

  return `## Generated\n${stringified}`;
};

const escapeRegExp = (str) => {
  return str.replace(/\$/g, '$$$$');
};

const TEMPLATE = {
  openapi: 'openapi',
  summary: 'summary',
  models: 'models',
  modelsData: 'modelsData',
};

const SECTION = {
  references: 'references',
  generator: 'generator',
}

CATEGORY_MAPPING = {
  "text-models-llm": "Text Models (LLM)", 
  "image-models": "Image Models",
  "video-models": "Video Models",
  "embedding-models": "Embedding Models",
  "speech-voice-models/tts": "Voice/Speech Models",
  "speech-voice-models/stt": "Voice/Speech Models",
  "stt": "Speech-to-Text",//"Voice/Speech Models" / "STT",
  "tts": "Text-to-Speech",//"Voice/Speech Models" / "TTS",
  "speech-voice-models": "Voice/Speech Models",
  "music-models": "Music Models",
  "vision-models": "Vision Models",
  "vision-models/ocr": "Vision Models",
  "vision-models/ofr": "Vision Models", // ADD FOLDER ofr and acr in summary
  "ocr": "OCR",
  "ofr": "OFR",
  "moderation-safety-models": "Content Moderation Models",
  "3d-generating-models": "3D-Generating Models",
  'web-search-models': 'Web Search Models',
}
const VENDORS_PATH_MAP = new Map()
const ALIAS_PATH_MAP = new Map()
const ALIAS_MAP = {}

/*
[name modal]: {alias: string, path: string, category: string, offsite_name: string}
*/
const MODELS_TO_ALIAS_MAP = {}

const CATEGORY_SET = new Set([
  "text-models-llm",
  "image-models",
  "video-models",
  "embedding-models",
  "speech-voice-models/tts",
  "speech-voice-models/stt",
  "music-models",
  "vision-models/ocr",
  "vision-models/ofr",
  "moderation-safety-models",
  "3d-generating-models",
  'web-search-models',
])

const NO_PARSE_MODAL = ['bagoodex/bagoodex-search-v1']

module.exports = { readTemplate, replaceTemplate, TEMPLATE, CATEGORY_MAPPING, SECTION, CATEGORY_SET, VENDORS_PATH_MAP, ALIAS_PATH_MAP, ALIAS_MAP, MODELS_TO_ALIAS_MAP, NO_PARSE_MODAL };
