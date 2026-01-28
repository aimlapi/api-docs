# continue.dev

## About

continue.dev is an open-source AI coding assistant that runs directly in your IDE (VS Code, JetBrains, etc). You can use AI/ML API models with Continue via the built-in OpenAI-compatible provider — no plugins required.

## Configuration

You can configure Continue by editing either `~/.continue/config.json` or `~/.continue/config.yaml`.

#### Option 1: `config.json`

```json
{
  "models": [
    {
      "name": "AI/ML API",
      "provider": "openai",
      "model": "gpt-3.5-turbo",
      "apiBase": "<https://api.aimlapi.com/v1>",
      "apiKey": "<YOUR_AIMLAPI_KEY>"
    }
  ]
}
```

#### Option 2: `config.yaml`

{% code overflow="wrap" %}
```yaml
models:
  - name: AI/ML API
    provider: openai
    model: gpt-3.5-turbo
    apiBase: <https://api.aimlapi.com/v1>
    apiKey: <YOUR_AIMLAPI_KEY>
```
{% endcode %}

✅ `provider: openai` — uses Continue’s native OpenAI-compatible interface\
✅ `apiBase` — must be `<https://api.aimlapi.com/v1`> for AI/ML API\
✅ `model` — any valid model from our [text model list](../api-references/text-models-llm/#complete-text-model-list).

***

### Advanced Options (Optional)

To disable compression or configure extra body parameters, use requestOptions.extraBodyProperties.

#### JSON Example

```json
{
  "models": [
    {
      "name": "AI/ML API",
      "provider": "openai",
      "model": "gpt-3.5-turbo",
      "apiBase": "<https://api.aimlapi.com/v1>",
      "apiKey": "<YOUR_AIMLAPI_KEY>",
      "requestOptions": {
        "extraBodyProperties": {
          "transforms": []
        }
      }
    }
  ]
}
```

#### YAML Example

```yaml
models:
  - name: AI/ML API
    provider: openai
    model: gpt-3.5-turbo
    apiBase: <https://api.aimlapi.com/v1>
    apiKey: <YOUR_API_KEY>
    requestOptions:
      extraBodyProperties:
        transforms: []
```

### GUI

continue.dev provides an intuitive graphical interface for interacting with a chat model.

<div align="left"><figure><img src="../.gitbook/assets/Untitled.png" alt=""><figcaption></figcaption></figure></div>

### Supported Models

You can use any of [our text models](../api-references/text-models-llm/#complete-text-model-list), including:

* [gpt-3.5-turbo](../api-references/text-models-llm/OpenAI/gpt-3.5-turbo.md)
* [gpt-4-turbo](../api-references/text-models-llm/OpenAI/gpt-4-turbo.md)
* [claude-3-5-sonnet-20240521](broken-reference/)
* [google/gemini-2.0-flash](../api-references/text-models-llm/google/gemini-2.0-flash.md)
* [and many others](../api-references/model-database.md).
