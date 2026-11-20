---
description: >-
  Call chat models that support function calling through the Anthropic Messages
  API and the OpenAI Responses API, not only Chat Completions: which models,
  how to call them, what maps and what does not.
icon: right-left
---

# Messages and Responses APIs

You can call chat models on AI/ML API through three APIs:

| API                | Endpoint                    |
| ------------------ | --------------------------- |
| Chat Completions   | `POST /v1/chat/completions` |
| OpenAI Responses   | `POST /v1/responses`        |
| Anthropic Messages | `POST /v1/messages`         |

A model does not have to speak the Messages or Responses API natively. When it does not, AI/ML API translates your request into a Chat Completions request for the model, and translates the answer back into the format of the API you called. This lets the Anthropic SDK or Claude Code run GLM or DeepSeek, and the OpenAI SDK or Codex run Claude or Qwen.

***

## Which models

* Chat models that support [function calling](function-calling.md). A model without function calling has no translated route: the clients of these APIs are mostly coding agents, which need tools.
* Models that need audio input or output have no translated route either.
* A model that speaks an API natively is served on it natively, with no translation. For example, Claude models on `/v1/messages` and OpenAI models on `/v1/responses`. The same models are translated on the other API: Claude on `/v1/responses`, OpenAI models on `/v1/messages`.

A translated call costs the same as the same call on `/v1/chat/completions`. AI/ML API bills it once, from the token counts the model reports for that call.

## How to tell which models support it

`GET /v1/models` lists a model once per endpoint it serves, in the `type` field. A translated route also has `translatedFrom: "openai/chat-completions"`.

| `type`                    | Endpoint              |
| ------------------------- | --------------------- |
| `openai/chat-completions` | `/v1/chat/completions` |
| `openai/responses/submit` | `/v1/responses`       |
| `anthropic/messages`      | `/v1/messages`        |

Check one model:

```bash
curl -s "https://api.aimlapi.com/v1/models?id=zhipu/glm-5.3" \
  | python3 -c 'import json,sys; [print(m["type"], m.get("translatedFrom", "native")) for m in json.load(sys.stdin)["data"]]'
```

Output:

```
anthropic/messages openai/chat-completions
openai/chat-completions native
openai/responses/submit openai/chat-completions
```

`zhipu/glm-5.3` is native on Chat Completions and translated on Messages and Responses. A model without a `type` row for an endpoint cannot be called there. The `info.docsJson` link of each row is the request schema for that route. The full catalogue is in the [model list](../api-references/service-endpoints/complete-model-list.md).

## Call a model through the Messages API

The example calls `zhipu/glm-5.3`, a model that is not native on Messages.

{% tabs %}
{% tab title="cURL" %}
```bash
curl https://api.aimlapi.com/v1/messages \
  -H "Authorization: Bearer <YOUR_AIMLAPI_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "zhipu/glm-5.3",
    "max_tokens": 1024,
    "messages": [
      {"role": "user", "content": "Explain what a mutex is in two sentences."}
    ]
  }'
```
{% endtab %}

{% tab title="Python (Anthropic SDK)" %}
```python
from anthropic import Anthropic

client = Anthropic(
    base_url="https://api.aimlapi.com",
    api_key="<YOUR_AIMLAPI_KEY>",
)

message = client.messages.create(
    model="zhipu/glm-5.3",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "Explain what a mutex is in two sentences."}
    ],
)

print(message.content[0].text)
```
{% endtab %}
{% endtabs %}

The Anthropic SDK sends the key in the `x-api-key` header. AI/ML API accepts it as well as `Authorization: Bearer`.

## Call a model through the Responses API

The example calls `deepseek/deepseek-v4-pro`, a model that is not native on Responses.

{% tabs %}
{% tab title="cURL" %}
```bash
curl https://api.aimlapi.com/v1/responses \
  -H "Authorization: Bearer <YOUR_AIMLAPI_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "deepseek/deepseek-v4-pro",
    "input": "Explain what a mutex is in two sentences."
  }'
```
{% endtab %}

{% tab title="Python (OpenAI SDK)" %}
```python
from openai import OpenAI

client = OpenAI(
    base_url="https://api.aimlapi.com/v1",
    api_key="<YOUR_AIMLAPI_KEY>",
)

response = client.responses.create(
    model="deepseek/deepseek-v4-pro",
    input="Explain what a mutex is in two sentences.",
)

print(response.output_text)
```
{% endtab %}
{% endtabs %}

A translated Responses route keeps no state on the server. To continue a conversation, send the whole conversation in `input` on every turn:

```python
history = [{"role": "user", "content": "Name three sorting algorithms."}]

response = client.responses.create(model="deepseek/deepseek-v4-pro", input=history)
history += response.output
history.append({"role": "user", "content": "Which one is fastest on nearly sorted data?"})

response = client.responses.create(model="deepseek/deepseek-v4-pro", input=history)
print(response.output_text)
```

## Coding agents

Claude Code talks only to the Messages API, and Codex only to the Responses API. With translated routes, both run on models from other providers. The [aimlapi CLI](../quickstart/cli.md) connects them:

```bash
aimlapi claude --model zhipu/glm-5.3
aimlapi codex --model deepseek/deepseek-v4-pro
```

`aimlapi models --agent <agent>` lists the models you can pass with `--model`. Codex sends the full history with `store: false` on every turn, which is what a translated Responses route needs.

## Keep the model's state across turns

Some models (Gemini, DeepSeek and Kimi among them) need their reasoning state back on the next turn of a tool loop, or the turn fails. AI/ML API puts that state in fields your client returns anyway:

* Messages: send `thinking` blocks (with their `signature`) and `tool_use` blocks back unchanged.
* Responses: send `reasoning` items (with `encrypted_content`) and `function_call` items back in `input` unchanged. `encrypted_content` comes whenever there is state to carry; you do not need `include`.
* Tool call IDs can look like `aimlc1_...`. Answer each call with that exact ID. Do not shorten, rename or regenerate it.

You can switch models in the middle of a conversation. State that came from another model is dropped, not refused.

## What maps and what does not

### Messages API

| Request or answer part              | What AI/ML API does                                                                                                                                                                                                                                                                                             |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `messages`                          | Text, image, document, `tool_use` and `tool_result` blocks become Chat Completions messages. Images inside a `tool_result` are sent in a user message right after the tool results, because Chat Completions has no images in a tool result. Other block types (Anthropic server features) are dropped.       |
| `system`                            | Sent as the system message. System turns inside `messages` are folded into the user turn.                                                                                                                                                                                                                      |
| `tools`                             | Tools with no `type`, or `type: "custom"`, become functions. A tool with `defer_loading: true` stays out of the model's context until a `tool_reference` in the conversation names it. Any other tool type (Anthropic server tools) returns `400 unsupported_tool_type`.                                        |
| `mcp_servers`                       | Returns `400 unsupported_parameter`: the MCP connector is an Anthropic server feature.                                                                                                                                                                                                                         |
| `tool_choice`                       | `auto` stays `auto`, `any` becomes `required`, `tool` becomes the named function, `none` stays `none`. `disable_parallel_tool_use: true` becomes `parallel_tool_calls: false`. Some models refuse a forced tool choice while they think; for them AI/ML API sends `auto`.                                    |
| `thinking`, `output_config.effort`  | Thinking is off unless the request turns it on with `thinking` set to `enabled` or `adaptive`, also on models that think by default. `output_config.effort` sets the level, rounded to the nearest level the model has. `budget_tokens` goes to models that take a thinking budget and is kept below `max_tokens`. A model that cannot turn thinking off runs at its lowest level (`minimal` or `low`) when it has one, otherwise at its default. Thinking comes back as `thinking` blocks. |
| `max_tokens`                        | Sent as the model's output limit, lowered to the model's maximum output. If the model reaches the limit before it writes anything, the answer is `200` with `stop_reason: "max_tokens"`, as on the native API.                                                                                                 |
| `temperature`, `top_p`              | Sent when the model takes them, dropped otherwise.                                                                                                                                                                                                                                                            |
| `stop_sequences`                    | Sent as `stop`.                                                                                                                                                                                                                                                                                                |
| `cache_control`                     | Used on Claude models. Dropped on other models, which cache a stable prompt prefix automatically.                                                                                                                                                                                                             |
| `context_management`                | Dropped.                                                                                                                                                                                                                                                                                                       |
| `stream: true`                      | The answer comes as Messages events. `message_start` carries zeros in `usage`; the real counts are in the final `message_delta`. If the provider's stream breaks before the model finishes, there is no final `message_delta`, so a cut answer does not look complete.                                        |
| `stop_reason`                       | `end_turn`, `tool_use`, `max_tokens` or `refusal`, from the model's finish reason.                                                                                                                                                                                                                             |
| `usage`                             | `input_tokens` (without cached tokens), `cache_read_input_tokens`, `cache_creation_input_tokens` and `output_tokens`, from the model's own counts. If the provider reports no counts, the answer shows the estimate AI/ML API billed.                                                                           |
| Images and documents                | An image as base64 data or a URL. Any other image source returns `400 unsupported_image_source`. A document as base64 data or text; any other source returns `400 unsupported_document_source`.                                                                                                              |

### Responses API

| Request or answer part                        | What AI/ML API does                                                                                                                                                                                                                                                                                         |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `input`                                       | A string, or items: messages, `reasoning`, `function_call`, `function_call_output`, `custom_tool_call`, `custom_tool_call_output`, `tool_search_call` and `tool_search_output`. Items of hosted tools from earlier turns (such as `web_search_call`) are dropped. Any other item type returns `400 unsupported_input_item`. |
| `instructions`, system and developer messages | Sent as the system message. A system or developer message later in `input` is sent as a user message in its place.                                                                                                                                                                                         |
| `tools`                                       | `function`, `custom`, `namespace` and `tool_search` tools become functions. A `custom` (freeform) tool becomes a function with one string argument, `input`, and its grammar goes into the description. `web_search` and `web_search_preview` are dropped, so no search happens: give the model your own search function instead. Other hosted tools (`file_search`, `code_interpreter`, `computer`, `mcp` and so on) return `400 unsupported_tool_type`. |
| `tool_choice`, `parallel_tool_calls`          | `auto`, `none`, `required` and a named function or custom tool are passed on. Some models refuse a forced tool choice while they think; for them AI/ML API sends `auto`. `parallel_tool_calls` is passed on.                                                                                               |
| `reasoning.effort`                            | Without an effort, the model runs at its default. `none` turns thinking off. Any other effort is rounded to the nearest level the model has, lower first; when the model has no level at or below the request, the nearest level above is used. On Claude models this route runs at the model's default thinking. Reasoning comes back as `reasoning` items. |
| `max_output_tokens`                           | Sent as the model's output limit, lowered to the model's maximum output. If the model reaches the limit before it writes anything, the answer has `status: "incomplete"` and `incomplete_details.reason: "max_output_tokens"`, as on the native API.                                                       |
| `temperature`, `top_p`                        | Sent when the model takes them, dropped otherwise.                                                                                                                                                                                                                                                         |
| `text.format`                                 | `json_schema` and `json_object` become `response_format`.                                                                                                                                                                                                                                                  |
| `text.verbosity`, `prompt_cache_key`          | Sent when the model takes them.                                                                                                                                                                                                                                                                            |
| `stream: true`                                | The answer comes as Responses events, ending with `response.completed` or `response.incomplete`. If the provider's stream breaks before the model finishes, there is no final event.                                                                                                                       |
| `usage`                                       | `input_tokens`, `input_tokens_details.cached_tokens`, `output_tokens`, `output_tokens_details.reasoning_tokens` and `total_tokens`, from the model's own counts. If the provider reports no counts, the answer shows the estimate AI/ML API billed.                                                       |
| Images and files                              | `input_image` with a URL or base64 data. An image by file ID returns `400 unsupported_image_source`. `input_file` with `file_data`; a file by ID or URL returns `400 unsupported_file_source`.                                                                                                             |
| `previous_response_id`                        | Returns `400 previous_response_unavailable`. Send the whole conversation in `input`.                                                                                                                                                                                                                      |
| `background: true`, `conversation`, `prompt`  | Return `400 unsupported_parameter`. The request runs while the connection is open.                                                                                                                                                                                                                       |
| `store`                                       | Ignored. The answer says `store: false`, its ID starts with `resp_aiml_`, and `GET /v1/responses/{id}` returns `404` for it.                                                                                                                                                                             |

Because a translated Responses route does not take `background: true`, it also does not take [`webhook_url`](webhooks.md).

{% hint style="info" %}
[Sandbox](sandbox-mode.md) requests do not apply these limits. To test how a translated route behaves, send a small live request.
{% endhint %}

## Errors

| Response                                                                       | Cause and what to do                                                                                                                                                  |
| ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `400` with the message `Model '<id>' is not available on /v1/messages` (or `/v1/responses`) | The model has no route on this API. The message names the endpoint that serves it. Call the model on `/v1/chat/completions`.                                          |
| `400 previous_response_unavailable`                                            | `previous_response_id` on a translated route, or an ID that starts with `resp_aiml_`. Send the whole conversation in `input`.                                        |
| `400 unsupported_parameter`                                                    | `background: true`, `conversation` or `prompt` on Responses, or `mcp_servers` on Messages. Remove the field.                                                         |
| `400 unsupported_tool_type`                                                    | A hosted or server tool. Replace it with a function tool.                                                                                                             |
| `400 unsupported_input_item`                                                   | A Responses input item type the route cannot send to the model.                                                                                                       |
| `400 unsupported_image_source`, `unsupported_document_source`, `unsupported_file_source` | An image, document or file in a form the route does not take, such as a file ID. Send images as base64 data or a URL, documents as base64 data or text, and files as base64 data.                                              |
| `429` with `This server is translating too many large answers at once. Retry shortly.` | Returned before anything is reserved or charged. Retry the request.                                                                                                   |
| The second turn of a tool loop fails                                           | Return `thinking` blocks, `reasoning` items and tool call IDs unchanged. See [Keep the model's state across turns](#keep-the-models-state-across-turns).             |
