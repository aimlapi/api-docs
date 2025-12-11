# OpenAPI JSON Schema Generator

This application generates OpenAPI JSON schemas based on configuration data from a single input file.

## 🚀 To Run the Generator

```
npm run generate --prefix packages/generators-v2
```

The script will process data from the json_for-docs_generation.json file and produce schema files accordingly.

## Input File Structure

The generator reads configuration from a JSON file named json_for-docs_generation.json, which should follow this structure:

```json
[
  {
    "name": "modelName",
    "url": "https://ai.aimlapi.com/docs-json?endpoint=openai/chat-completions&model=o1-pro&source=openai",
    "alias": "alias",
    "category": "text-models-llm",
    "vendor": "OpenAI",
    "codeSamples": "chat-completion",
    "customUrlApi": "https://api.aimlapi.com/v1/images/generations",
    "customParams": {
      "text_param": "text",
      "object_param": {
        "name": "object",
        "type": "string"
      },
      "array_param": ["param1", 212],
      "object_array_param": [
        {
          "name": "object1",
          "type": "string"
        },
        {
          "name": 21212,
          "type": "string"
        }
      ]
    },
    "hideTryItPanel": true
  }
]
```

### Field Descriptions

|   Field   |   Type   | Required  |  Description  |
| --------- | -------- | --------- | ------------- |
| **name**  | `string` | ✅ | Model name (required if using a ready-made code sample).|
| **url**   | `string` | ✅ | URL to the JSON documentation endpoint. |
| **alias** | `string` | ✅ | The output filename (used when saving the generated schema).|
| **category** | `string` | ✅ | The category under which the schema is grouped (e.g. `text-models-llm`).|
| **vendor** | `string`  | ✅ | Model vendor name (e.g. `OpenAI`).|
| **codeSamples** | `string` | ❌ | Optional. Determines which predefined code samples to include. Options: <br>• `chat-completion` <br>• `chat-completion-audio` <br>• `image-models:prompt` <br>• `image-models:image_url(s)` <br>• `image-models:image` <br>• `video:video` <br>• `video:lipsync` <br>•`responses` <br>• `hide` (if your want hide codeSample) <br>• `custom` (requires `customUrlApi` and `customParams`) |
| **customUrlApi**   | `string`  | ❌       | Used when `codeSamples` is set to `"custom"`. Specifies a custom API endpoint.                                                                                                                                                                                |
| **customParams**   | `object`  | ❌       | Custom parameters for the API request. Supports simple, object, array, and object-array formats.                                                                                                                                                              |
| **hideTryItPanel** | `boolean` | ❌       | If set to true, hides the “Try It” panel in the generated documentation. Useful for endpoints that are not meant to be interactive.                                                                                                                           |
## Example Usage
### Example 1 — Ready-made code sample
```json
{
  "name": "gpt-4o",
  "url": "https://ai.aimlapi.com/docs-json?endpoint=openai/chat-completions&model=gpt-4o&source=openai",
  "alias": "gpt-4o",
  "category": "text-models-llm",
  "vendor": "OpenAI",
  "codeSamples": "chat-completion",
  "hideTryItPanel": true
}
```
### Example 2 — Custom API configuration
```json
{
  "name": "flux/dev",
  "url": "https://ai.aimlapi.com/docs-json?endpoint=internal/image-generations&model=flux/dev&source=falai",
  "alias": "flux-dev",
  "category": "image-models",
  "vendor": "Black-Forest-Labs",
  "codeSamples": "custom",
  "customUrlApi": "https://api.aimlapi.com/v1/images/generations",
  "customParams": {
    "prompt": "text",
    "style": "string",
    "size": ["512x512", "1024x1024"]
  },
  "hideTryItPanel": false
}
```
### Пример 3 — Gitbook auto-generated examples with a full set of model parameters
```json
{
  "name": "flux/dev",
  "url": "https://ai.aimlapi.com/docs-json?endpoint=internal/image-generations&model=flux/dev&source=falai",
  "alias": "flux-dev",
  "category": "image-models",
  "vendor": "Black-Forest-Labs",
  "hideTryItPanel": false
}
```
## Output

Each schema is generated and saved under a filename based on its category, vendor and alias (e.g., category/vendor/alias.json) inside /docs/api-references.