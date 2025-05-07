export default {
  text: {
    desc: `The text content to be converted to speech.`,
  },
  container: {
    desc: `The file format wrapper for the output audio. The available options depend on the encoding type.`,
  },
  encoding: {
    desc: `Specifies the expected encoding of your audio output`,
  },
  sample_rate: {
    desc: `The sample rate for the output audio. Based on the encoding, different sample rates are supported. For some encodings, the sample rate is not configurable`,
  },
};
