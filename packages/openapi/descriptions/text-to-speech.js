export default {
  text: {
    desc: `The text content to be converted to speech.`,
  },
  container: {
    desc: `Container specifies the file format wrapper for the output audio. The available options depend on the encoding type.`,
  },
  encoding: {
    desc: `Encoding allows you to specify the expected encoding of your audio output`,
  },
  sample_rate: {
    desc: `Sample Rate specifies the sample rate for the output audio. Based on the encoding, different sample rates are supported. For some encodings, the sample rate is not configurable`,
  },
};
