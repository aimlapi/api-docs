export default {
  "prompt": {
    "desc": "The prompt to generate an image from"
  },
  "num_images": { "desc": "The number of images to generate" },
  "seed": {
    "desc": "The same seed and the same prompt given to the same version of the model will output the same image every time"
  },
  "image_size": {
    "width_height_32": {
      "desc": "For both height and width, the value must be a multiple of 32."
    },
    "enum": { "desc": "The size of the generated image" }
  },
  "num_inference_steps": { "desc": "The number of inference steps to perform" },
  "enable_safety_checker": {
    "desc": "If set to true, the safety checker will be enabled"
  },
  "guidance_scale": {
    "desc": "The CFG (Classifier Free Guidance) scale is a measure of how close you want the model to stick to your prompt when looking for a related image to show you"
  },
  "safety_tolerance": {
    "desc": "The safety tolerance level for the generated image. 1 being the most strict and 5 being the most permissive"
  },
  "output_format": { "desc": "The format of the generated image" },
  "aspect_ratio": { "desc": "The aspect ratio of the generated image" },
  "strength": {
    "desc": "Determines how much the prompt influences the generated image."
  },
  "negative_prompt": {
    "desc": "The description of elements to avoid in the generated image"
  },
  "prompt_expansion": {
    "desc": "If set to true, prompt will be upsampled with more details"
  },
  "image_url": { "desc": "The URL of the image to generate an image from." },
  "image_url_triposr": { "desc": "Path for the image file to be processed" },
  "do_remove_background": {
    "desc": "Whether to remove the background from the input image."
  },
  "foreground_ratio": {
    "desc": "Ratio of the foreground image to the original image."
  },
  "mc_resolution": {
    "desc": "Resolution of the marching cubes. Above 512 is not recommended."
  }
}
