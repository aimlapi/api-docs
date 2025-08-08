export default {
  url: {
    desc: `URL of the input audio file.`,
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
    desc: `Enables language detection to identify the dominant language spoken in the submitted audio.`,
  },
  detect_entities: {
    desc: `When Entity Detection is enabled, the Punctuation feature will be enabled by default.`,
  },
  detect_topics: {
    desc: `Detects the most important and relevant topics that are referenced in speech within the audio.`,
  },
  diarize: {
    desc: `Recognizes speaker changes. Each word in the transcript will be assigned a speaker number starting at 0.`,
  },
  dictation: {
    desc: `Identifies and extracts key entities from content in submitted audio.`,
  },
  diarize_version: {
    desc: ``,
  },
  extra: {
    desc: `Arbitrary key-value pairs that are attached to the API response for usage in downstream processing.`,
  },
  filler_words: {
    desc: `Filler Words can help transcribe interruptions in your audio, like “uh” and “um”.`,
  },
  intents: {
    desc: `Recognizes speaker intent throughout a transcript or text.`,
  },
  keywords: {
    desc: `Keywords can boost or suppress specialized terminology and brands.`,
  },
  language: {
    desc: `The BCP-47 language tag that hints at the primary spoken language. Depending on the Model and API endpoint you choose only certain languages are available`,
  },
  measurements: {
    desc: `Spoken measurements will be converted to their corresponding abbreviations`,
  },
  multi_channel: {
    desc: `Transcribes each audio channel independently`,
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
    desc: `Adds punctuation and capitalization to the transcript`,
  },
  search: {
    desc: `Search for terms or phrases in submitted audio`,
  },
  sentiment: {
    desc: `Recognizes the sentiment throughout a transcript or text`,
  },
  smart_format: {
    desc: `Applies formatting to transcript output. When set to true, additional formatting will be applied to transcripts to improve readability`,
  },
  summarize: {
    desc: `Summarizes content. For Listen API, supports string version option. For Read API, accepts boolean only.`,
  },
  tag: {
    desc: `Labels your requests for the purpose of identification during usage reporting`,
  },
  topics: {
    desc: `Detects topics throughout a transcript or text`,
  },
  utterances: {
    desc: `Segments speech into meaningful semantic units`,
  },
  utt_split: {
    desc: `Seconds to wait before detecting a pause between words in submitted audio`,
  },
  audio: {
    desc: `The audio file to transcribe.`,
  },
  audio_start_from: {
    desc: `The point in time, in milliseconds, in the file at which the transcription was started.`,
  },
  audio_end_at: {
    desc: `The point in time, in milliseconds, in the file at which the transcription was terminated.`,
  },
  language_code: {
    desc: `The language of your audio file. Possible values are found in Supported Languages. The default value is 'en_us'.`,
  },
  language_confidence_threshold: {
    desc: `The confidence threshold for the automatically detected language. An error will be returned if the language confidence is below this threshold. Defaults to 0.`,
  },
  language_detection: {
    desc: `Enable Automatic language detection, either true or false. Available for universal model only.`,
  },
  format_text: {
    desc: `Enable Text Formatting, can be true or false.`,
  },
  disfluencies: {
    desc: `Transcribe Filler Words, like "umm", in your media file; can be true or false.`,
  },
  multichannel: {
    desc: `Enable Multichannel transcription, can be true or false.`,
  },
  speaker_labels: {
    desc: `Enable Speaker diarization, can be true or false.`,
  },
  speakers_expected: {
    desc: `Tell the speaker label model how many speakers it should attempt to identify. See Speaker diarization for more details.`,
  },
  content_safety: {
    desc: `Enable Content Moderation, can be true or false.`,
  },
  iab_categories: {
    desc: `Enable Topic Detection, can be true or false.`,
  },
  custom_spelling: {
    desc: `Customize how words are spelled and formatted using to and from values.`,
  },
  auto_highlights: {
    desc: `Enable Key Phrases, either true or false.`,
  },
  word_boost: {
    desc: `The list of custom vocabulary to boost transcription probability for.`,
  },
  boost_param: {
    desc: `How much to boost specified words. Allowed values: low, default, high.`,
  },
  filter_profanity: {
    desc: `Filter profanity from the transcribed text, can be true or false.`,
  },
  redact_pii: {
    desc: `Redact PII from the transcribed text using the Redact PII model, can be true or false.`,
  },
  redact_pii_audio: {
    desc: `Generate a copy of the original media file with spoken PII "beeped" out, can be true or false. See PII redaction for more details.`,
  },
  redact_pii_audio_quality: {
    desc: `Controls the filetype of the audio created by redact_pii_audio. Currently supports mp3 (default) and wav. See PII redaction for more details.`,
  },
  redact_pii_policies: {
    desc: `The list of PII Redaction policies to enable. See PII redaction for more details.`,
  },
  redact_pii_sub: {
    desc: `The replacement logic for detected PII, can be \`entity_type\` or \`hash\`. See PII redaction for more details.`,
  },
  sentiment_analysis: {
    desc: `Enable Sentiment Analysis, can be true or false.`,
  },
  entity_detection: {
    desc: `Enable Entity Detection, can be true or false.`,
  },
  summarization: {
    desc: `Enable Summarization, can be true or false.`,
  },
  summary_model: {
    desc: `The model to summarize the transcript. Allowed values: informative, conversational, catchy.`,
  },
  summary_type: {
    desc: `The type of summary. Allowed values: bullets, bullets_verbose, gist, headline, paragraph.`,
  },
  auto_chapters: {
    desc: `Enable Auto Chapters, either true or false.`,
  },
  speech_threshold: {
    desc: `Reject audio files that contain less than this fraction of speech. Valid values are in the range [0, 1] inclusive.`,
  },
  content_safety_confidence: {
    desc: `The confidence threshold for the Content Moderation model. Values must be between 25 and 100. Defaults to 50.`,
  },
  keyterms_prompt: {
    desc: `Improve accuracy with up to 1000 domain-specific words or phrases (maximum 6 words per phrase). Only supported when the speech_model is specified as slam-1.`,
  },
  speaker_options: {
    desc: `Specify options for speaker diarization.`,
  },
  redact_pii_audio_options: {
    desc: `Specify options for PII redacted audio files.`,
  },
  custom_topics: {
    desc: `Enable custom topics, either true or false.`,
  },
  dual_channel: {
    desc: `Enable Dual Channel transcription, can be true or false.`,
  },
};
