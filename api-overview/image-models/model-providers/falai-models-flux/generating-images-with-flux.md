---
icon: book-open
---

# Generating Images with FLUX

## Example Input

```json
{
  "prompt": "Extreme close-up of a single tiger eye, direct frontal view. Detailed iris and pupil. Sharp focus on eye texture and color. Natural lighting to capture authentic eye shine and depth. The word \"FLUX\" is painted over it in big, white brush strokes with visible texture.",
  "image_size": "landscape_4_3",
  "num_inference_steps": 28,
  "guidance_scale": 3.5,
  "num_images": 1,
  "safety_tolerance": "2"
}

```

### Input Parameters

When making a request to the API to generate images, the following input parameters are used:

**`prompt` (string) - **_**Required**_

* **Description**: The text prompt to generate an image from. This is the core input that the AI model uses to create the visual content.
* **Example**: `"A futuristic city skyline at sunset"`

**`image_size` (ImageSize | Enum)**

* **Description**: Specifies the size of the generated image.
* **Default Value**: `landscape_4_3`
* **Possible Values**:
  * `"square_hd"`: High-definition square image.
  * `"square"`: Standard square image.
  * `"portrait_4_3"`: Portrait image with a 4:3 aspect ratio.
  * `"portrait_16_9"`: Portrait image with a 16:9 aspect ratio.
  * `"landscape_4_3"`: Landscape image with a 4:3 aspect ratio.
  * `"landscape_16_9"`: Landscape image with a 16:9 aspect ratio.

**`num_inference_steps` (integer)**

* **Description**: The number of inference steps to perform during image generation. Higher values may lead to more detailed images.
* **Default Value**: `28`
* **Example**: `35`

**`seed` (integer)**

* **Description**: The seed value ensures consistency in image generation. The same seed with the same prompt will generate the same image every time.
* **Example**: `12345`

**`guidance_scale` (float)**

* **Description**: The CFG (Classifier Free Guidance) scale determines how closely the model should adhere to the given prompt when generating the image.
* **Default Value**: `3.5`
* **Example**: `7.0`

**`sync_mode` (boolean)**

* **Description**: If set to `true`, the function will wait for the image to be fully generated and uploaded before returning a response. This will increase latency but allows direct access to the image in the response.
* **Default Value**: `false`
* **Example**: `true`

**`num_images` (integer)**

* **Description**: The number of images to generate for the given prompt.
* **Default Value**: `1`
* **Example**: `5`

**`safety_tolerance` (SafetyToleranceEnum)**

* **Description**: The safety tolerance level for the generated image, determining how strict the safety checks are.
* **Default Value**: `"2"`
* **Possible Values**:
  * `"1"`: Most strict.
  * `"2"`: Default strictness.
  * `"3"`
  * `"4"`
  * `"5"`
  * `"6"`: Most permissive.
