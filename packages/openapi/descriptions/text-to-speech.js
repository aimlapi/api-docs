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
  voice: {
    desc: `Name of the voice to be used`,
  },
  apply_language_text_normalization: {
    desc: 
      `This parameter controls language text normalization. This helps with proper pronunciation of text in some supported languages. WARNING: This parameter can heavily increase the latency of the request. Currently only supported for Japanese.`,
  },
  apply_text_normalization: {
    desc: 
      `This parameter controls text normalization with three modes: 'auto', 'on', and 'off'. When set to 'auto', the system will automatically decide whether to apply text normalization (e.g., spelling out numbers). With 'on', text normalization will always be applied, while with 'off', it will be skipped.`,
  },
  next_text: {
    desc: 
      `The text that comes after the text of the current request. Can be used to improve the speech's continuity when concatenating together multiple generations or to influence the speech's continuity in the current generation.`,
  },
  previous_text: {
    desc: 
      `The text that came before the text of the current request. Can be used to improve the speech's continuity when concatenating together multiple generations or to influence the speech's continuity in the current generation.`,
  },
  output_format: {
    desc: 
      `Output format of the generated audio. Formatted as codec_sample_rate_bitrate. So an mp3 with 22.05kHz sample rate at 32kbs is represented as mp3_22050_32`,
  },
  voice_settings: {
    desc: 
      `Voice settings overriding stored settings for the given voice. They are applied only on the given request.`,
    stability: {
      desc: `Determines how stable the voice is and the randomness between each generation. Lower values introduce broader emotional range for the voice. Higher values can result in a monotonous voice with limited emotion.`,
    },
    use_speaker_boost: {
      desc: `This setting boosts the similarity to the original speaker. Using this setting requires a slightly higher computational load, which in turn increases latency.`,
    },
    similarity_boost: {
      desc: `Determines how closely the AI should adhere to the original voice when attempting to replicate it.`,
    },
    style: {
      desc: `Determines the style exaggeration of the voice. This setting attempts to amplify the style of the original speaker. It does consume additional computational resources and might increase latency if set to anything other than 0.`,
    },
    speed: {
      desc: `Adjusts the speed of the voice. A value of 1.0 is the default speed, while values less than 1.0 slow down the speech, and values greater than 1.0 speed it up.`,
    },
    vol: {
      desc: `The volume of the generated speech. Range: (0, 10]. Larger values indicate larger volumes.`,
    },
    pitch: {
      desc: `The pitch of the generated speech. Range: [-12, 12]. 0 = default voice output.`,
    },
  },
  voice_modify: {
    desc: `Voice modification settings for adjusting pitch, intensity, timbre, and applying sound effects to customize the voice characteristics.`,
    pitch: {
      desc: `Adjusts voice pitch. Range: [-100, 100]. -100: deeper, 100: lighter`,
    },
    intensity: {
      desc: `Adjusts voice intensity. Range: [-100, 100]. -100: stronger, 100: softer`,
    },
    timbre: {
      desc: `Adjusts voice timbre. Range: [-100, 100]. -100: increased nasality, 100: crisper`,
    },
  },
  seed: {
    desc: `If specified, our system will make a best effort to sample deterministically, such that repeated requests with the same seed and parameters should return the same result. Determinism is not guaranteed.`,
  },
  voice_id: {
    desc: `Voice identifier for text-to-speech synthesis. Supports both predefined system voices and custom cloned voice IDs. `,
  },
  emotion: {
    desc: `Emotional tone to apply to the synthesized speech. Controls the emotional expression of the generated voice output.`,
  },
  sample_rate: {
    desc: `Audio sample rate in Hz.`,
  },
  bitrate: {
    desc: `Audio bitrate in bits per second. Controls the compression level and audio quality. Higher bitrates provide better quality but larger file sizes.`,
  },
  format: {
    desc: `Audio output format. MP3 provides good compression and compatibility, PCM offers uncompressed high quality, and FLAC provides lossless compression.`,
  },
  channel: {
    desc: `Number of audio channels. 1 for mono (single channel), 2 for stereo (dual channel) output.`,
  },
  sound_effects: {
    desc: `Audio effects to apply to the synthesized speech. Includes options like spacious_echo, auditorium_echo, lofi_telephone, and robotic effects.`,
  },
  language_boost: {
    desc: `Language recognition enhancement option.`,
  },
  output_format: {
    desc: `Format of the output content for non-streaming requests. Controls how the generated audio data is encoded in the response.`,
  },
  timbre_weights: {
    desc: `Voice mixing configuration allowing combination of up to 4 different voices with specified weights. Each voice contributes to the final output based on its weight value (1-100).`,
  },
  pronunciation_dict: {
    desc: `Custom pronunciation dictionary for handling specific words or phrases. Allows fine-tuning of how certain text should be pronounced using phonetic representations.`,
  },
  stream: {
    desc: `Enable streaming mode for real-time audio generation. When enabled, audio is generated and delivered in chunks as it's processed.`,
  },
  subtitle_enable: {
    desc: `Enable subtitle generation service. Only available for non-streaming requests. Generates timing information for the synthesized speech.`,
  },
  text_normalization: {
    desc: `English text normalization support. Improves number-reading but increases latency.`,
  },
  speakers: {
    desc: `List of speakers to use for the script. If not provided, will be inferred from the script or voice samples.`
  },
  script: {
    desc: `The script to convert to speech. Can be formatted with "Speaker X:" prefixes for multi-speaker dialogues.`
  }
};
