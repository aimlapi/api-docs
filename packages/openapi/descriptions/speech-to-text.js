export default {
  url: {
    desc: `The url parameter specifies the publicly accessible location of an audio file`,
  },
  custom_intent: {
    desc: `A custom intent you want the model to detect within your input audio if present. Submit up to 100.`,
  },
  custom_topic: {
    desc: `A custom topic you want the model to detect within your input audio if present. Submit up to 100.`,
  },
  custom_intent_mode: {
    desc: `Sets how the model will interpret strings submitted to the custom_intent param. When strict, the model will only return intents submitted using the custom_intent param. When extended, the model will return its own detected intents in addition those submitted using the custom_intents param.`,
  },
  custom_topic_mode: {
    desc: `Sets how the model will interpret strings submitted to the custom_topic param. When strict, the model will only return topics submitted using the custom_topic param. When extended, the model will return its own detected topics in addition to those submitted using the custom_topic param.`,
  },
  detect_language: {
    desc: `Enable Language Detection. Language Detection identifies the dominant language spoken in submitted audio.`,
  },
  detect_entities: {
    desc: `When Entity Detection is enabled, the Punctuation feature will be enabled by default.`,
  },
  detect_topics: {
    desc: `Topic Detection enables users to detect the most important and relevant topics that are referenced in speech within the audio`,
  },
  diarize: {
    desc: `Recognize speaker changes. Each word in the transcript will be assigned a speaker number starting at 0`,
  },
  dictation: {
    desc: `Identify and extract key entities from content in submitted audio`,
  },
  diarize_version: {
    desc: ``,
  },
  extra: {
    desc: `Arbitrary key-value pairs that are attached to the API response for usage in downstream processing`,
  },
  filler_words: {
    desc: `Filler Words can help transcribe interruptions in your audio, like “uh” and “um”`,
  },
  intents: {
    desc: `Recognizes speaker intent throughout a transcript or text`,
  },
  keywords: {
    desc: `Keywords can boost or suppress specialized terminology and brands`,
  },
  language: {
    desc: `The BCP-47 language tag that hints at the primary spoken language. Depending on the Model and API endpoint you choose only certain languages are available`,
  },
  measurements: {
    desc: `Spoken measurements will be converted to their corresponding abbreviations`,
  },
  multi_channel: {
    desc: `Transcribe each audio channel independently`,
  },
  numerals: {
    desc: `Numerals converts numbers from written format to numerical format`,
  },
  paragraphs: {
    desc: `Splits audio into paragraphs to improve transcript readability`,
  },
  profanity_filter: {
    desc: `Profanity Filter looks for recognized profanity and converts it to the nearest recognized non-profane word or removes it from the transcript completely`,
  },
  punctuate: {
    desc: `Add punctuation and capitalization to the transcript`,
  },
  search: {
    desc: `Search for terms or phrases in submitted audio`,
  },
  sentiment: {
    desc: `Recognizes the sentiment throughout a transcript or text`,
  },
  smart_format: {
    desc: `Apply formatting to transcript output. When set to true, additional formatting will be applied to transcripts to improve readability`,
  },
  summarize: {
    desc: `Summarize content. For Listen API, supports string version option. For Read API, accepts boolean only.`,
  },
  tag: {
    desc: `Label your requests for the purpose of identification during usage reporting`,
  },
  topics: {
    desc: `Detect topics throughout a transcript or text`,
  },
  utterances: {
    desc: `Segments speech into meaningful semantic units`,
  },
  utt_split: {
    desc: `Seconds to wait before detecting a pause between words in submitted audio`,
  },
};
