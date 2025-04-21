export default {
  prompt: {
    desc: `The text description of the scene, subject, or action to generate in the video.`,
  },
  image_url: {
    default: {
      desc: `A direct link to the image that will be used as the visual base or keyframe for the video.`,
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
    - URL of the image
    - base64 encoding of the image
    Image specifications:
    - format must be JPG, JPEG, or PNG;
    - aspect ratio should be greater than 2:5 and less than 5:2; the shorter side must exceed 300 pixels
    - file size must not exceed 20MB.`,
    },
    google: {
      desc: `URL of the input image to animate. Should be 720p or higher resolution.`,
    },
  },
  last_image_url: {
    standard: {
      desc: `URL of the image to be used for the end of the video.`,
    },
    runway: {
      desc: `A HTTPS URL or data URI containing an encoded image to be used as the last frame of the generated video.`,
    },
  },
  duration: {
    desc: `The number of seconds of duration for the output video.`,
  },
  ratio: {
    desc: `The aspect ratio of the generated video.`,
  },
  seed: {
    desc: `If unspecified, a random number is chosen. Varying the seed integer is a way to get different results for the same other request parameters. Using the same seed integer for an identical request will produce similar results.`,
  },
  camera_control: {
    desc: `Camera control parameters.`,
  },
  advanced_camera_control: {
    desc: `Advanced Camera control parameters.`,
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
    desc: `The model will automatically optimize the incoming prompt to improve the generation quality If necessary. For more precise control, this parameter can be set to False, and the model will follow the instructions more strictly. At this time It is recommended to provide finer prompts for best results.`,
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
    desc: `Whether to expand the prompt`,
  },
};
