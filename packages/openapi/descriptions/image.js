export default {
  prompt: {
    desc: `The text prompt describing the content, style, or composition of the image to be generated.`,
  },
  num_images: { 
    default: {
      desc: `The number of images to generate.` 
    },
    flux_kontext: {
      desc: `Number of image variations to generate. Each image is a different attempt to combine the reference images (from the image_url parameter) according to the prompt.`,
    },
  },
  seed: {
    desc: `The same seed and the same prompt given to the same version of the model will output the same image every time.`,
  },
  image_size: {
    width_height_32: {
      desc: `For both height and width, the value must be a multiple of 32.`,
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
  do_remove_background: {
    desc: `Enables removing the background from the input image.`,
  },
  foreground_ratio: {
    desc: `Ratio of the foreground image to the original image.`,
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
    desc: `Control the content-moderation level for images`,
  },
  output_compression: {
    desc: `The compression level (0-100%) for the generated images.`,
  },
  image: {
    desc: `The image(s) to edit. Must be a supported image file or an array of images. Each image should be a png, webp, or jpg file less than 50MB. You can provide up to 16 images.`
  },
  mask: {
    desc: `An additional image whose fully transparent areas (e.g. where alpha is zero) indicate where image should be edited. If there are multiple images provided, the mask will be applied on the first image. Must be a valid PNG file, less than 4MB, and have the same dimensions as image.`
  }
};
