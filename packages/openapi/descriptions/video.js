export default {
  prompt: {
    desc: `The text description of the scene, subject, or action to generate in the video.`,
  },
  image_url: {
    default: {
      desc: `A direct link to an online image or a Base64-encoded local image that will serve as the visual base or the first frame for the video.`,
    },
    runway: {
      desc: `A HTTPS URL or data URI containing an encoded image to be used as the first frame of the generated video.`,
    },
    kling_effects: {
      desc: `For hug, kiss, and heart_gesture effects, pass an array containing exactly two image URLs. For squish or expansion, only one image URL is required.`,
    },
    minimax: {
      desc: `A direct link to an online image or a Base64-encoded local image that will serve as the first frame for the video.
Image specifications: 
- format must be JPG, JPEG, or PNG; 
- aspect ratio should be greater than 2:5 and less than 5:2; 
- the shorter side must exceed 300 pixels; 
- file size must not exceed 20MB.`,
    },
    google: {
      desc: `URL of the input image to animate. Should be 720p or higher resolution.`,
    },
    images: {
      desc: `Reference images for dual-character effects (Base64 encoded or URL).`,
    },
    sora: {
      desc: `A URL or a Base64-encoded image file used as the initial frame for video generation.
The image dimensions must match the selected video resolution and aspect ratio.
Supported configurations include:
720p with aspect ratios:
- 16:9 — 1280x720
- 9:16 — 720x1280

1080p with aspect ratios:
- 16:9 — 1792x1024
- 9:16 — 1024x1792`,
    },
  },
  first_image_url: {
    desc: `URL of the image to be used as the first frame of the video.`,
  },
  last_image_url: {
    default: {
      desc: `A direct link to an online image or a Base64-encoded local image to be used as the last frame of the video.`,
    },
    runway: {
      desc: `A HTTPS URL or data URI containing an encoded image to be used as the last frame of the generated video.`,
    },
  },
  duration: {
    desc: `The length of the output video in seconds.`,
    pixverse: {
      desc: `The output video length in seconds. The 1080p quality option does not support 8-second videos.`,
    },
  },
  ratio: {
    desc: `The aspect ratio of the generated video.`,
    veo_3_1: {
      desc: `The aspect ratio of the generated video. The value 1:1 is only available when the resolution parameter is set to 720p.`,
    },
  },
  seed: {
    desc: `Varying the seed integer is a way to get different results for the same other request parameters. Using the same value for an identical request will produce similar results. If unspecified, a random number is chosen.`,
  },
  camera_control: {
    desc: `Camera control parameters.`,
  },
  advanced_camera_control: {
    desc: `Advanced camera control parameters.`,
    movement_type: {
      desc: `The type of camera movement.`,
    },
    movement_value: {
      desc: `The value of the camera movement.`,
    },
  },
  negative_prompt: {
    desc: `The description of elements to avoid in the generated video.`,
  },
  cfg_scale: {
    desc: `The CFG (Classifier Free Guidance) scale is a measure of how close you want the model to stick to your prompt.`,
  },
  static_mask_url: {
    desc: `URL of the image for Static Brush Application Area (Mask image created by users using the motion brush).`,
  },
  dynamic_masks: {
    desc: `List of dynamic masks.`,
    mask_url: {
      desc: `URL of the image for Dynamic Brush Application Area (Mask image created by users using the motion brush).`,
    },
    trajectories: {
      desc: `List of trajectories.`,
      x: {
        desc: `X coordinate of the motion trajectory.`,
      },
      y: {
        desc: `Y coordinate of the motion trajectory.`,
      },
    },
  },
  effect_scene: {
    desc: `The effect scene to use for the video generation.`,
  },
  prompt_optimizer: {
    desc: `If True, the incoming prompt will be automatically optimized to improve generation quality when needed. For more precise control, set it to False — the model will then follow the instructions more strictly.`,
  },
  inference_steps: {
    desc: `Number of inference steps for sampling. Higher values give better quality but take longer.`,
  },
  guidance_scale: {
    desc: `Classifier-free guidance scale. Controls prompt adherence / creativity.`,
  },
  shift: {
    desc: `Noise schedule shift parameter. Affects temporal dynamics.`,
  },
  sampler: {
    desc: `The sampler to use for generation.`,
  },
  enable_safety_checker: {
    desc: `If set to true, the safety checker will be enabled.`,
  },
  enable_prompt_expansion: {
    desc: `Whether to enable prompt expansion.`,
  },
  expand_prompt: {
    desc: `If set to true, the prompt will be expanded with additional prompts.`,
  },
  enhance_prompt: {
    desc: `Whether to enhance the video generation.`,
  },
  generate_audio: {
    desc: `Whether to generate audio for the video.`,
  },
  webhook: {
    desc: `The URL to receive a one-time notification when the task is completed. If set, the server will send an HTTP POST request with the final result when the task ends.`,
  },
  resolution: {
    default: {
      desc: `The resolution of the output video, where the number refers to the short side in pixels.`,
    },
    minimax: {
      desc: `The dimensions of the video display. 1080p corresponds to 1920 x 1080 pixels, 768p corresponds to 1366 x 768 pixels.`,
    },
    bytedance: {
      desc: `An enumeration where the short side of the video frame determines the resolution.`,
    },
    veed: {
      desc: `The resolution of the generated video. Available options are 480p, and 720p.`,
    },
  },
  watermark: {
    desc: `Whether the video contains a watermark.`,
  },
  camerafixed: {
    desc: `Whether to fix the camera position.
- true: Fix the camera position. The platform will append instructions to fix the camera position in the user's prompt, but the actual effect is not guaranteed.
- false: Do not fix the camera position.`,
  },
  video_url: {
    desc: `A HTTPS URL pointing to a video or a data URI containing a video. This video will be used as a reference during generation.`,
  },
  audio_url: {
    desc: `The URL of the audio file. Supported formats: MP3, WAV, M4A, AAC. Maximum file size: 5 MB.`,
    omnihuman: {
      desc: `The URL of the audio file for lip-sync animation. The model detects spoken parts and syncs the character's mouth to them. Audio must be under 30s long.`,
    },
  },
  frame_size: {
    desc: `The width and height of the video.`,
  },
  references: {
    image: {
      desc: `Passing an image reference allows the model to emulate the style or content of the reference in the output.`,
    },
    video: {
      desc: `Passing a video reference allows the model to emulate the style or content of the reference in the output.`,
    },
  },
  character: {
    desc: `The character to control. You can either provide a video or an image. A visually recognizable face must be visible and stay within the frame.`,
    character_video: {
      desc: `A video of your character. In the output, the character will use the reference video performance in its original animated environment and some of the character's own movements.`,
    },
    character_image: {
      desc: `An image of your character. In the output, the character will use the reference video performance in its original static environment.`,
    },
  },
  body_control: {
    desc: `A boolean indicating whether to enable body control. When enabled, non-facial movements and gestures will be applied to the character in addition to facial expressions.`,
  },
  expression_intensity: {
    desc: `An integer between 1 and 5 (inclusive). A larger value increases the intensity of the character's expression.`,
  },
  style: {
    desc: `The style of the generated video.`,
  },
  num_frames: {
    desc: `Number of frames to generate. Must be between 81 to 241 (inclusive).`,
    krea: {
      desc: `Number of frames to generate. Must be a multiple of 12 plus 6, for example 18, 30, 42, etc.`,
    },
  },
  match_input_frames_per_second: {
    desc: `Whether to match the input video's frames per second (FPS).`,
  },
  frames_per_second: {
    desc: `Frames per second of the generated video. Must be between 5 to 30.`,
  },
  preprocess: {
    desc: `Whether to preprocess the input video.`,
  },
  acceleration: {
    desc: `Acceleration to use for inference. None or regular are available.`,
  },
  video_quality: {
    desc: `The quality of the generated video.`,
  },
  video_write_mode: {
    desc: `The method used to write the video. Fast, balanced, small are available.`,
  },
  num_interpolated_frames: {
    desc: `Number of frames to interpolate between the original frames.`,
  },
  temporal_downsample_factor: {
    desc: `Temporal downsample factor for the video.`,
  },
  enable_auto_downsample: {
    desc: `The minimum frames per second to downsample the video to.`,
  },
  auto_downsample_min_fps: {
    desc: `The minimum frames per second to downsample the video to.`,
  },
  interpolator_model: {
    desc: `The model to use for interpolation. Rife, or film are available.`,
  },
  sync_mode: {
    desc: `The synchronization mode for audio and video. Loose or tight are available.`,
  },
  image_list: {
    desc: `Array of image URLs (2-4 images) for multi-image-to-video generation.`,
  },
  auto_fix: {
    desc: `Whether to automatically attempt to fix prompts that fail content policy or other validation checks by rewriting them.`,
  },
  strength: {
    desc: `Denoising strength for the video-to-video generation. 0.0 preserves the original, 1.0 completely remakes the video.`,
  },
};
