export default {
  metadata: {
    desc: `Metadata about the transcription response, including timing, models, and IDs.`,
  },
  transaction_key: {
    desc: `A unique transaction key; currently always “deprecated”.`,
  },
  request_id: {
    desc: `A UUID identifying this specific transcription request.`,
  },
  sha256: {
    desc: `The SHA-256 hash of the submitted audio file (for pre-recorded requests).`,
  },
  created: {
    desc: `ISO-8601 timestamp.`,
  },
  duration: {
    desc: `Length of the audio in seconds.`,
  },
  channels: {
    desc: `Number of independent audio channels detected/submitted.`,
  },
  models: {
    desc: `List of model UUIDs used for this transcription`,
  },
  model_info: {
    desc: `Mapping from each model UUID (in 'models') to detailed info: its name, version, and architecture.`,
    name: {
      desc: `The human-readable name of the model — identifies which model was used.`,
    },
    version: {
      desc: `The specific version of the model.`,
    },
    arch: {
      desc: `The architecture of the model — describes the model family / generation.`,
    },
  },
  status: {
    desc: `The current status of the generation task.`,
  },
  channels: {
    desc: `The top-level results object containing per-channel transcription alternatives.`,
  },
  alternatives: {
    desc: `List of possible transcription hypotheses (“alternatives”) for each channel.`,
  },
  transcript: {
    desc: `The full transcript text for this alternative.`,
  },
  confidence: {
    desc: `Overall confidence score (0-1) that assigns to this transcript alternative.`,
  },
  words: {
    desc: `List of word-level timing, confidence, and punctuation details.`,
    word: {
      desc: `The raw recognized word, without punctuation or capitalization.`,
    },
    start: {
      desc: `Start timestamp of the word (in seconds, from beginning of audio).`,
    },
    end: {
      desc: `End timestamp of the word (in seconds).`,
    },
    confidence: {
      desc: `Confidence score (0-1) for this individual word.`,
    },
    punctuated_word: {
      desc: `The same word but with punctuation/capitalization applied (if smart_format is enabled).`,
    },
  },
  paragraphs: {
    desc: `An array of paragraph objects, present when the paragraphs feature is enabled.`,
    transcript: {
      desc: `The transcript split into paragraphs (with line breaks), when paragraphing is enabled.`,
    },
    paragraphs: {
      desc: `Structure describing each paragraph: its timespan, word count, and sentence breakdown.`,
      sentences: {
        desc: `List of sentences in this paragraph, with start/end times.`,
        text: {
          desc: `Text of a single sentence in the paragraph.`,
        },
        start: {
          desc: `Start time of the sentence (in seconds).`,
        },
        end: {
          desc: `End time of the sentence (in seconds).`,
        },
      },
      num_words: {
        desc: `Number of words in this paragraph.`,
      },
      start: {
        desc: `Start time of the paragraph (in seconds).`,
      },
      end: {
        desc: `End time of the paragraph (in seconds).`,
      },
    },
  },
};
