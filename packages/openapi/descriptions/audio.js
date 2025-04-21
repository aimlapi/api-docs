export default {
  prompt: {
    default: {
      desc: `The prompt to generate audio from.`,
    },
    minimax: {
      desc: `Lyrics with optional formatting. You can use a newline to separate each line of lyrics. You can use two newlines to add a pause between lines. You can use double hash marks (##) at the beginning and end of the lyrics to add accompaniment. Maximum 600 characters.`,
    },
  },
  reference_audio_url: {
    desc: `Reference song, should contain music and vocals. Must be a .wav or .mp3 file longer than 15 seconds.`,
  },
  seconds_start: {
    desc: `The start point of the audio clip to generate.`,
  },
  seconds_total: {
    desc: `The duration of the audio clip to generate.`,
  },
  steps: {
    desc: `The number of steps to denoise the audio.`,
  },
};
