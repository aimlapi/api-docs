# Claude 4.6 Opus

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `anthropic/claude-opus-4-6`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/anthropic/claude-opus-4-6" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

{% hint style="warning" %}
Starting on February 13, 2026, the streaming response format for Anthropic models will change.
{% endhint %}

## Model Overview

The model significantly advances its [predecessor’s](claude-4.5-opus.md) coding capabilities. It shows stronger planning, can handle longer and more complex agent-style workflows, operates more reliably in large codebases, and delivers improved code review and debugging that help it identify and fix its own mistakes. Beyond software development, Opus 4.6 applies these enhanced capabilities to everyday professional tasks, including financial analysis, research, and working with documents, spreadsheets, and presentations.

{% hint style="success" %}
[Create AI/ML API Key](https://aimlapi.com/app/keys)
{% endhint %}

<details>

<summary>How to make the first API call</summary>

**1️⃣ Required setup (don’t skip this)**\
▪ **Create an account:** Sign up on the AI/ML API website (if you don’t have one yet).\
▪ **Generate an API key:** In your account dashboard, create an API key and make sure it’s **enabled** in the UI.

**2️ Copy the code example**\
At the bottom of this page, pick the snippet for your preferred programming language (Python / Node.js) and copy it into your project.

**3️ Update the snippet for your use case**\
▪ **Insert your API key:** replace `<YOUR_AIMLAPI_KEY>` with your real AI/ML API key.\
▪ **Select a model:** set the `model` field to the model you want to call.\
▪ **Provide input:** fill in the request input field(s) shown in the example (for example, `messages` for chat/LLM models, or other inputs for image/video/audio models).

**4️ (Optional) Tune the request**\
Depending on the model type, you can add optional parameters to control the output (e.g., generation settings, quality, length, etc.). See the API schema below for the full list.

**5️ Run your code**\
Run the updated code in your development environment. Response time depends on the model and request size, but simple requests typically return quickly.

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](/broken/pages/ngeSCZKxiGVWqYZTHDjY).
{% endhint %}

</details>

## API Schema

{% openapi-operation spec="claude-opus-4-6" path="/v1/chat/completions" method="post" %}
[OpenAPI claude-opus-4-6](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Anthropic/claude-opus-4-6.json)
{% endopenapi-operation %}

## Code Example #1

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests
import json  # for getting a structured output with indentation 

response = requests.post(
    "https://api.aimlapi.com/v1/chat/completions",
    headers={
        # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
        "Authorization":"Bearer <YOUR_AIMLAPI_KEY>",
        "Content-Type":"application/json"
    },
    json={
        "model":"anthropic/claude-opus-4-6",
        "messages":[
            {
                "role":"user",
                "content":"Hi! What do you think about mankind?" # insert your prompt
            }
        ]
    }
)

data = response.json()
print(json.dumps(data, indent=2, ensure_ascii=False))
```
{% endcode %}
{% endtab %}

{% tab title="JavaScript" %}
{% code overflow="wrap" %}
```javascript
async function main() {
  const response = await fetch('https://api.aimlapi.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      // insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>
      'Authorization': 'Bearer <YOUR_AIMLAPI_KEY>',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'anthropic/claude-opus-4-6',
      messages:[
          {
              role:'user',
              content: 'Hi! What do you think about mankind?' // insert your prompt here
          }
      ],
    }),
  });

  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
}

main();
```
{% endcode %}
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```json5
{
  "id": "msg_018e8mCDfQGYKTGHTdUKNmuU",
  "object": "chat.completion",
  "model": "claude-opus-4-6",
  "choices": [
    {
      "index": 0,
      "message": {
        "reasoning_content": "",
        "content": "Hi! That's a big question. Here are some honest thoughts:\n\n**What I find remarkable**\n- Human creativity and problem-solving ability\n- The capacity for empathy, cooperation, and self-sacrifice\n- Building cumulative knowledge across generations\n- Art, music, science - the drive to understand and express\n\n**What's more complicated**\n- Humans have a real capacity for both great kindness and great cruelty\n- There's often a gap between what people value in principle and how they actually behave\n- Progress on big problems (poverty, conflict, environment) is real but uneven and slow\n\n**My honest position**\nI'd be cautious about sweeping judgments in either direction. \"Humanity is wonderful\" and \"humanity is terrible\" are both oversimplifications. People are complex, shaped by circumstances, and capable of change.\n\nI should also be transparent: I'm an AI, so my \"perspective\" has limits. I don't experience human life. I can observe patterns in what humans have written and done, but I'd weight your lived experience of humanity more heavily than my outside view.\n\nWhat prompted the question? I'm curious whether you're feeling more optimistic or pessimistic about it.",
        "role": "assistant"
      },
      "finish_reason": "end_turn",
      "logprobs": null
    }
  ],
  "created": 1770635443,
  "usage": {
    "prompt_tokens": 16,
    "completion_tokens": 264,
    "total_tokens": 280
  },
  "meta": {
    "usage": {
      "credits_used": 17368
    }
  }
}
```
{% endcode %}

</details>

## Code Example #2: Streaming Mode

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests
import json  # for getting a structured output with indentation 

response = requests.post(
    "https://api.aimlapi.com/v1/chat/completions",
    headers={
        # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
        "Authorization":"Bearer <YOUR_AIMLAPI_KEY>",
        "Content-Type":"application/json"
    },
    json={
        "model":"anthropic/claude-opus-4-6",
        "messages":[
            {
                "role":"user",
                "content":"Hi! What do you think about mankind?" # insert your prompt
            }
        ]
    }
)

data = response.json()
print(json.dumps(data, indent=2, ensure_ascii=False))
```
{% endcode %}
{% endtab %}

{% tab title="cURL" %}
{% code overflow="wrap" %}
```javascript
curl -L \
  --request POST \
  --url 'https://api.aimlapi.com/v1/chat/completions' \
  --header 'Authorization: Bearer <YOUR_AIMLAPI_KEY>' \
  --header 'Content-Type: application/json' \
  --data '{
    "model": "anthropic/claude-opus-4-6",
    "messages": [
      {
        "role": "user",
        "content": "Hi! What do you think about mankind?"
      }
    ],
    "stream": true
  }'
```
{% endcode %}
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```json5
data: {"event":{"id":"msg_01P1LLs5keVHCA271BZRUDdP","choices":[{"index":0,"delta":{"content":"","role":"assistant","refusal":null}}],"created":1770864602,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"msg_01P1LLs5keVHCA271BZRUDdP","tools":[],"usage":{"input_tokens":16,"cache_creation_input_tokens":0,"cache_read_input_tokens":0,"cache_creation":{"ephemeral_5m_input_tokens":0,"ephemeral_1h_input_tokens":0},"output_tokens":1,"service_tier":"standard","inference_geo":"global"}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"role":"assistant","content":"","refusal":null}}],"created":1770864602,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"Hi","role":"assistant","refusal":null}}],"created":1770864602,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"! That","role":"assistant","refusal":null}}],"created":1770864602,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"'s a big","role":"assistant","refusal":null}}],"created":1770864602,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" question.","role":"assistant","refusal":null}}],"created":1770864602,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" Here","role":"assistant","refusal":null}}],"created":1770864602,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" are some honest","role":"assistant","refusal":null}}],"created":1770864602,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" thoughts:\n\n**Things","role":"assistant","refusal":null}}],"created":1770864602,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" I find","role":"assistant","refusal":null}}],"created":1770864602,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" impressive","role":"assistant","refusal":null}}],"created":1770864602,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"**","role":"assistant","refusal":null}}],"created":1770864603,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"\n-","role":"assistant","refusal":null}}],"created":1770864603,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" Remarkable","role":"assistant","refusal":null}}],"created":1770864603,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" creativity","role":"assistant","refusal":null}}],"created":1770864603,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" and","role":"assistant","refusal":null}}],"created":1770864603,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" problem","role":"assistant","refusal":null}}],"created":1770864603,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"-solving ability","role":"assistant","refusal":null}}],"created":1770864603,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"\n-","role":"assistant","refusal":null}}],"created":1770864603,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" Capacity","role":"assistant","refusal":null}}],"created":1770864603,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" for compass","role":"assistant","refusal":null}}],"created":1770864603,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"ion,","role":"assistant","refusal":null}}],"created":1770864603,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" cooperation","role":"assistant","refusal":null}}],"created":1770864603,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":", and self","role":"assistant","refusal":null}}],"created":1770864603,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"-sacrifice\n- Building","role":"assistant","refusal":null}}],"created":1770864603,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" complex","role":"assistant","refusal":null}}],"created":1770864603,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" cultures","role":"assistant","refusal":null}}],"created":1770864603,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":",","role":"assistant","refusal":null}}],"created":1770864603,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" art, science","role":"assistant","refusal":null}}],"created":1770864603,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":", and institutions","role":"assistant","refusal":null}}],"created":1770864604,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"\n-","role":"assistant","refusal":null}}],"created":1770864604,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" Ability to reflect","role":"assistant","refusal":null}}],"created":1770864604,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" on and","role":"assistant","refusal":null}}],"created":1770864604,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" sometimes","role":"assistant","refusal":null}}],"created":1770864604,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" correct","role":"assistant","refusal":null}}],"created":1770864604,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" our","role":"assistant","refusal":null}}],"created":1770864604,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" own","role":"assistant","refusal":null}}],"created":1770864604,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" fl","role":"assistant","refusal":null}}],"created":1770864604,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"aws","role":"assistant","refusal":null}}],"created":1770864604,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"\n\n**Things that","role":"assistant","refusal":null}}],"created":1770864604,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" are","role":"assistant","refusal":null}}],"created":1770864604,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" more","role":"assistant","refusal":null}}],"created":1770864604,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" challenging**\n- Recurring","role":"assistant","refusal":null}}],"created":1770864604,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" patterns","role":"assistant","refusal":null}}],"created":1770864604,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" of conflict","role":"assistant","refusal":null}}],"created":1770864604,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" and cr","role":"assistant","refusal":null}}],"created":1770864604,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"uelty\n- Tendency toward trib","role":"assistant","refusal":null}}],"created":1770864604,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"alism and short","role":"assistant","refusal":null}}],"created":1770864604,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"-term thinking\n- Difficulty","role":"assistant","refusal":null}}],"created":1770864605,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" coord","role":"assistant","refusal":null}}],"created":1770864605,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"inating on","role":"assistant","refusal":null}}],"created":1770864605,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" large-","role":"assistant","refusal":null}}],"created":1770864605,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"scale problems like","role":"assistant","refusal":null}}],"created":1770864605,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" climate change\n- Gap","role":"assistant","refusal":null}}],"created":1770864605,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" between what people","role":"assistant","refusal":null}}],"created":1770864605,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" know","role":"assistant","refusal":null}}],"created":1770864605,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" they","role":"assistant","refusal":null}}],"created":1770864605,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" *","role":"assistant","refusal":null}}],"created":1770864605,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"should* do and what they actually do","role":"assistant","refusal":null}}],"created":1770864605,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"\n\n**My","role":"assistant","refusal":null}}],"created":1770864605,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" honest overall","role":"assistant","refusal":null}}],"created":1770864605,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" take","role":"assistant","refusal":null}}],"created":1770864605,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"**\nI think humans","role":"assistant","refusal":null}}],"created":1770864605,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" are genuinely complex","role":"assistant","refusal":null}}],"created":1770864605,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" - neither","role":"assistant","refusal":null}}],"created":1770864605,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" fundament","role":"assistant","refusal":null}}],"created":1770864606,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"ally good nor bad. People","role":"assistant","refusal":null}}],"created":1770864606,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" are","role":"assistant","refusal":null}}],"created":1770864606,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" capable","role":"assistant","refusal":null}}],"created":1770864606,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" of extraordinary","role":"assistant","refusal":null}}],"created":1770864606,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" kind","role":"assistant","refusal":null}}],"created":1770864606,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"ness and extraordinary","role":"assistant","refusal":null}}],"created":1770864606,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" harm","role":"assistant","refusal":null}}],"created":1770864606,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":",","role":"assistant","refusal":null}}],"created":1770864606,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" often","role":"assistant","refusal":null}}],"created":1770864606,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" the","role":"assistant","refusal":null}}],"created":1770864606,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" same individuals","role":"assistant","refusal":null}}],"created":1770864606,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" in","role":"assistant","refusal":null}}],"created":1770864606,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" different circumstances","role":"assistant","refusal":null}}],"created":1770864606,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":". History","role":"assistant","refusal":null}}],"created":1770864606,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" shows both","role":"assistant","refusal":null}}],"created":1770864606,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" progress","role":"assistant","refusal":null}}],"created":1770864607,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" and set","role":"assistant","refusal":null}}],"created":1770864607,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"backs.\n\nI","role":"assistant","refusal":null}}],"created":1770864607,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"'d","role":"assistant","refusal":null}}],"created":1770864607,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" rather","role":"assistant","refusal":null}}],"created":1770864607,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" give","role":"assistant","refusal":null}}],"created":1770864607,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" you a balanced","role":"assistant","refusal":null}}],"created":1770864607,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" view than either","role":"assistant","refusal":null}}],"created":1770864607,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" a","role":"assistant","refusal":null}}],"created":1770864607,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" flat","role":"assistant","refusal":null}}],"created":1770864607,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"tering or","role":"assistant","refusal":null}}],"created":1770864607,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" cyn","role":"assistant","refusal":null}}],"created":1770864607,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"ical one. I","role":"assistant","refusal":null}}],"created":1770864607,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"'m also","role":"assistant","refusal":null}}],"created":1770864607,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" aware that","role":"assistant","refusal":null}}],"created":1770864607,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" as","role":"assistant","refusal":null}}],"created":1770864607,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" an AI, my","role":"assistant","refusal":null}}],"created":1770864607,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" perspective has","role":"assistant","refusal":null}}],"created":1770864607,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" limits","role":"assistant","refusal":null}}],"created":1770864607,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" - I observe","role":"assistant","refusal":null}}],"created":1770864607,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" human","role":"assistant","refusal":null}}],"created":1770864607,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" behavior through","role":"assistant","refusal":null}}],"created":1770864608,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" text","role":"assistant","refusal":null}}],"created":1770864608,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" rather","role":"assistant","refusal":null}}],"created":1770864608,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" than living","role":"assistant","refusal":null}}],"created":1770864608,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" it.","role":"assistant","refusal":null}}],"created":1770864608,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"\n\nWhat prompted","role":"assistant","refusal":null}}],"created":1770864608,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" the","role":"assistant","refusal":null}}],"created":1770864608,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" question? I'm curious whether","role":"assistant","refusal":null}}],"created":1770864608,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" you're thinking about this from a particular","role":"assistant","refusal":null}}],"created":1770864608,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" angle -","role":"assistant","refusal":null}}],"created":1770864608,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":" philosophical","role":"assistant","refusal":null}}],"created":1770864608,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":", historical","role":"assistant","refusal":null}}],"created":1770864608,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":", personal","role":"assistant","refusal":null}}],"created":1770864608,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"?","role":"assistant","refusal":null}}],"created":1770864608,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"role":"assistant","content":"","refusal":null}}],"created":1770864608,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":{"completion_tokens":0,"prompt_tokens":0,"total_tokens":0}},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}

data: {"event":{"id":"","choices":[{"index":0,"delta":{"content":"","role":"assistant","refusal":null}}],"created":1770864608,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":256},"finishReason":"end_turn"}}

data: {"event":{"id":"","choices":[{"index":0,"finish_reason":"stop"}],"created":1770864608,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":{"completion_tokens":0,"prompt_tokens":0,"total_tokens":0}},"state":{"generationId":"","tools":[],"usage":{"input_tokens":0,"output_tokens":0}}}


```
{% endcode %}

</details>
