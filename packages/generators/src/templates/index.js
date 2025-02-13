const fs = require('fs');
const path = require('path');

const readTemplate = (name, section) => {
  const content = fs.readFileSync(path.join(__dirname, `./${name}.hbs`), 'utf8');

  return `[#references:start]: <> ({ "template": "${name}" })
${content}
[#references:end]: <> ({})`;
};

const replaceTemplate =
  (name, section, replacer = (match, next) => match.replace(match, next)) =>
  (prev, next) => {
    if (!prev.trim()) {
      return next;
    }
    
    // const expr = new RegExp(
    //   `^\\[#${section}:start\\]:\\s<>\\s\\(({.+?})\\)(.+?)\\[#${section}:end\\].+?$`,
    //   "gms"
    // );
    const expr = /^\[#references:start\]:\s<>\s\(({.+?})\)(.+)\[#references:end\].+?$/gms;

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
  "speech-voice-models/stt": 'Speech Models', //"Voice/Speech Models" / "STT",
  "speech-voice-models/tts": 'Speech Models', //"Voice/Speech Models" / "TTS",
  "music-models": "Music Models",
  "ocr": "Vision Models" / "OCR",
  "ofr": "Vision Models" / "OFR",
  "moderation-safety-models": "Content Moderation/Safety Models",
  "3d-generating-models": "3D-Generating Models"
}

const CATEGORY_SET = new Set(["Text Models (LLM)", "Image Models", "Video Models", "Embedding Models", "Voice/Speech Models", "STT", 'Speech Models', "Voice/Speech Models", "TTS", "Music Models", "Vision Models", "Vision Models" ,  "Content Moderation/Safety Models", "3D-Generating Models"])

module.exports = { readTemplate, replaceTemplate, TEMPLATE, CATEGORY_MAPPING, SECTION, CATEGORY_SET };
