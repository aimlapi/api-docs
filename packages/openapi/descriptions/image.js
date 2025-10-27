export default {
  prompt: {
    desc: `The text prompt describing the content, style, or composition of the image to be generated.`,
  },
  num_images: {
    default: {
      desc: `The number of images to generate.`,
    },
    flux_kontext: {
      desc: `Number of image variations to generate. Each image is a different attempt to combine the reference images (from the image_url parameter) according to the prompt.`,
    },
    flux_realism: {
      desc: `The number of images to generate. This is always set to 1 for streaming output. Default value: 1.`,
    },
  },
  seed: {
    desc: `The same seed and the same prompt given to the same version of the model will output the same image every time.`,
    topaz: {
      desc: `Optional fixed seed for repeatable results.`,
    },
  },
  image_size: {
    width_height_32: {
      desc: `For both height and width, the value must be a multiple of 32.`,
    },
    bytedance: {
      default: {
        desc: `Specifies the dimensions (width x height in pixels) of the generated image. Must be between [512x512, 2048x2048].`,
      },
      adaptive: {
        desc: `The model checks the size of the input picture against its internal size table and picks the closest match as the output picture size.`,
      },
    },
    default: { desc: `The size of the generated image.` },
  },
  num_inference_steps: { desc: `The number of inference steps to perform.` },
  enable_safety_checker: {
    desc: `If set to True, the safety checker will be enabled.`,
  },
  guidance_scale: {
    desc: `The CFG (Classifier Free Guidance) scale is a measure of how close you want the model to stick to your prompt when looking for a related image to show you.`,
  },
  safety_tolerance: {
    desc: `The safety tolerance level for the generated image. 1 being the most strict and 5 being the most permissive.`,
  },
  output_format: { desc: `The format of the generated image.` },
  aspect_ratio: { desc: `The aspect ratio of the generated image.` },
  strength: {
    desc: `Determines how much the prompt influences the generated image.`,
    topaz: {
      desc: `Defines the overall intensity of the sharpening effect. Increases details. Too much sharpening can create an unrealistic result.`,
    },
  },
  negative_prompt: {
    desc: `The description of elements to avoid in the generated image.`,
  },
  prompt_expansion: {
    desc: `If set to True, prompt will be upsampled with more details.`,
  },
  image_url: {
    default: {
      desc: `The URL of the reference image.`,
    },
    flux_kontext: {
      desc: `One or more image URLs used as visual references. The model merges them into a single image following the prompt instructions.`,
    },
  },
  image_urls: {
    default: {
      desc: `List of URLs or local Base64 encoded images to edit.`,
    },
    uso: {
      desc: `An array of up to 3 image URLs. The first image is always treated as the primary input for image-to-image generation, while the remaining images (if provided) serve as visual style references for the output.`,
    },
  },
  do_remove_background: {
    desc: `Enables removing the background from the input image.`,
  },
  foreground_ratio: {
    desc: `Ratio of the foreground image to the original image.`,
  },
  subject_detection: {
    desc: `Specifies which subjects to detect and process. Options: 'All' (detect all subjects), 'Foreground' (detect only foreground subjects), 'Background' (detect background subjects).`,
  },
  face_enhancement: {
    desc: `Whether to enhance faces in the image. When true, the model applies face-specific improvements.`,
  },
  face_enhancement_creativity: {
    desc: `Level of creativity for face enhancement (0-1). Higher values allow more creative, less conservative changes.`,
  },
  face_enhancement_strength: {
    desc: `How sharp enhanced faces are relative to background (0-1). Lower values blend changes subtly; higher values make faces more pronounced.`,
  },
  source_id: {
    desc: `Unique identifier for the source image.`,
  },
  mc_resolution: {
    desc: `Resolution of the marching cubes. Above 512 is not recommended.`,
  },
  quality: {
    desc: `The quality of the image that will be generated.`,
  },
  style: { desc: `The style of the generated images.` },
  response_format: {
    desc: `The format in which the generated images are returned.`,
  },
  raw: { desc: `Generate less processed, more natural-looking images.` },
  colors: { desc: `An array of preferred colors.` },
  convert_base64_to_url: {
    desc: `If True, the URL to the image will be returned; otherwise, the file will be provided in base64 format.`,
  },
  enhance_prompt: {
    desc: `Optional parameter to use an LLM-based prompt rewriting feature for higher-quality images that better match the original prompt. Disabling it may affect image quality and prompt alignment.`,
  },
  person_generation: { desc: `Allow generation of people.` },
  safety_setting: { desc: `Adds a filter level to safety filtering.` },
  add_watermark: {
    desc: `Add an invisible watermark to the generated images.`,
  },
  background: {
    desc: `Allows to set transparency for the background of the generated image(s). When auto is used, the model will automatically determine the best background for the image.
If transparent, the output format needs to support transparency, so it should be set to either png (default value) or webp.`,
  },
  moderation: {
    desc: `Control the content-moderation level for images.`,
  },
  output_compression: {
    desc: `The compression level (0-100%) for the generated images.`,
  },
  image: {
    default: {
      desc: `The image(s) to edit. Must be a supported image file or an array of images. Each image should be a png, webp, or jpg file less than 50MB. You can provide up to 16 images.`,
    },
    seededit: {
      desc: `The image to be edited. Enter the Base64 encoding of the picture or an accessible URL. Image URL: Make sure that the image URL is accessible. Base64-encoded content: The format must be in lowercase.`,
    },
  },
  mask: {
    desc: `An additional image whose fully transparent areas (e.g. where alpha is zero) indicate where image should be edited. If there are multiple images provided, the mask will be applied on the first image. Must be a valid PNG file, less than 4MB, and have the same dimensions as image.`,
  },
  sync_mode: {
    desc: `If set to true, the function will wait for the image to be generated and uploaded before returning the response. This will increase the latency of the function but it allows you to get the image directly in the response without going through the CDN.`,
  },
  acceleration: {
    desc: `The speed of the generation. The higher the speed, the faster the generation.`,
  },
  minor_denoise: {
    desc: `Removes noisy pixels to increase clarity. Can slightly increase image sharpness.`,
  },
  focus_boost: {
    desc: `Corrects images that are missing detail by downscaling your image then upscaling the results back to the original size. Use on very blurry images!`,
  },
  detail: {
    topaz: {
      desc: `Removes noisy pixels to increase clarity. Can slightly increase image sharpness.`,
    },
  },
};
