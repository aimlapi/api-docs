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
      desc: `The model will use the image passed in this parameter as the first frame to generate a video. 
      Supported formats: 
      - URL of the image;
      - base64 encoding of the image.
      Image specifications:
      - format must be JPG, JPEG, or PNG;
      - aspect ratio should be greater than 2:5 and less than 5:2; the shorter side must exceed 300 pixels;
      - file size must not exceed 20MB.`,
    },
    google: {
      desc: `URL of the input image to animate. Should be 720p or higher resolution.`,
    },
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
  },
  ratio: {
    desc: `The aspect ratio of the generated video.`,
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
    minimax: {
      desc: `The dimensions of the video display. 1080p corresponds to 1920 x 1080 pixels, 768p corresponds to 1366 x 768 pixels.`,
    },
    bytedance: {
      desc: `An enumeration where the short side of the video frame determines the resolution.`,
    },
  },
  watermark: {
    desc: `Whether the video contains a watermark`,
  },
  camerafixed: {
    desc: `Whether to fix the camera position.
    true: Fix the camera position. The platform will append instructions to fix the camera position in the user's prompt, but the actual effect is not guaranteed.
    false: Do not fix the camera position.`,
  },
  video_url: {
    desc: `A HTTPS URL pointing to a video or a data URI containing a video`,
  },
  frame_size: {
    desc: `The width and height of the video`,
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
};
