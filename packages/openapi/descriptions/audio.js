export default {
  prompt: {
    default: {
      desc: `The prompt to generate audio.`,
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
  sample_rate: {
    desc: `The sampling rate of the generated music.`,
  },
  bitrate: {
    desc: `The bit rate of the generated music.`,
  },
  format: {
    desc: `The format of the generated music.`,
  },
  refer_voice: {
    desc: `voice_id.
  At least one of refer_voice or refer_instrumental is required. When only refer_voice is provided, the system can still output music data. The generated music will be an a cappella vocal hum that aligns with the provided refer_voice and the generated lyrics, without any instrumental accompaniment.`,
  },
  refer_instrumental: {
    desc: `instrumental_id.
  At least one of refer_voice or refer_instrumental is required. When only refer_instrumental is provided, the system can still output music data. The generated music will be a purely instrumental track that aligns with the provided refer_instrumental, without any vocals.`,
  },
  purpose: {
    desc: `1. If purpose is song:
  - You need to upload a music file containing both acapella (vocals) and accompaniment.
  - The acapella must be in singing form; normal speech is not supported.
  - Outputs: voice_id and instrumental_id.
  2. If purpose is voice:
  - You need to upload a file containing only acapella in singing form (normal speech audio is not supported).
  - Output: voice_id.
  3. If purpose is instrumental:
  - You need to upload a file containing only accompaniment.
  - Output: instrumental_id.`,
  },
  file: {
    minimax: {
      desc: `Audio file local path, supports WAV and MP3 formats. The audio duration must be longer than 10s and no more than 10 minutes.`,
    },
  },
  negative_prompt: {
    desc: `A description of what to exclude from the generated audio`,
  },
  seed: {
    desc: `A seed for deterministic generation. If provided, the model will attempt to produce the same audio given the same prompt and other parameters.`,
  },
  music_length_ms: {
    elevenlabs: {
      desc: `The length of the song to generate in milliseconds. This parameter may not always be respected by the model, and the actual audio length can differ.`,
    },
  },
};
