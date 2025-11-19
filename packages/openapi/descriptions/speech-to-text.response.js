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
};
