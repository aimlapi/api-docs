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
As of February 13, 2026, the streaming response format for Anthropic models has changed.
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

As of February 13, 2026, the streaming response format for Anthropic models has changed. \
Specifically, the usage fields were renamed as follows:&#x20;

* the `state` structure is no longer used,
* `input_tokens` → `prompt_tokens`,&#x20;
* `output_tokens` → `completion_tokens`,&#x20;
* a new `total_tokens` field has been added.

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
data: {"id":"msg_018vTp5RY3pv9qS1euXt8AWb","choices":[{"index":0,"delta":{"content":"","role":"assistant","refusal":null}}],"created":1770989120,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"role":"assistant","content":"","refusal":null}}],"created":1770989120,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"Hi","role":"assistant","refusal":null}}],"created":1770989120,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"! That","role":"assistant","refusal":null}}],"created":1770989121,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"'s a","role":"assistant","refusal":null}}],"created":1770989121,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" big","role":"assistant","refusal":null}}],"created":1770989121,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" question.","role":"assistant","refusal":null}}],"created":1770989121,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" Here","role":"assistant","refusal":null}}],"created":1770989121,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" are some honest","role":"assistant","refusal":null}}],"created":1770989121,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" thoughts:","role":"assistant","refusal":null}}],"created":1770989121,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"\n\n**What I find","role":"assistant","refusal":null}}],"created":1770989121,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" remarkable","role":"assistant","refusal":null}}],"created":1770989121,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"**","role":"assistant","refusal":null}}],"created":1770989121,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"\n-","role":"assistant","refusal":null}}],"created":1770989121,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" Human","role":"assistant","refusal":null}}],"created":1770989121,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" creativity and problem","role":"assistant","refusal":null}}],"created":1770989121,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"-solving are","role":"assistant","refusal":null}}],"created":1770989121,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" genuinely impressive\n- The capacity","role":"assistant","refusal":null}}],"created":1770989121,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" for empathy,","role":"assistant","refusal":null}}],"created":1770989121,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" cooperation","role":"assistant","refusal":null}}],"created":1770989121,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":", and building","role":"assistant","refusal":null}}],"created":1770989121,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" complex","role":"assistant","refusal":null}}],"created":1770989122,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" societies","role":"assistant","refusal":null}}],"created":1770989122,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"\n-","role":"assistant","refusal":null}}],"created":1770989122,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" Persistent","role":"assistant","refusal":null}}],"created":1770989122,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" curiosity -","role":"assistant","refusal":null}}],"created":1770989122,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" science","role":"assistant","refusal":null}}],"created":1770989122,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":", art, philosophy all","role":"assistant","refusal":null}}],"created":1770989122,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" reflect","role":"assistant","refusal":null}}],"created":1770989122,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" a","role":"assistant","refusal":null}}],"created":1770989122,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" drive to understand and create","role":"assistant","refusal":null}}],"created":1770989122,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"\n\n**What seems","role":"assistant","refusal":null}}],"created":1770989122,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" challenging","role":"assistant","refusal":null}}],"created":1770989122,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"**\n- Humans often","role":"assistant","refusal":null}}],"created":1770989122,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" struggle with long","role":"assistant","refusal":null}}],"created":1770989122,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"-term thinking","role":"assistant","refusal":null}}],"created":1770989122,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" vs","role":"assistant","refusal":null}}],"created":1770989122,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":". short","role":"assistant","refusal":null}}],"created":1770989122,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"-term impul","role":"assistant","refusal":null}}],"created":1770989123,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"ses\n- Trib","role":"assistant","refusal":null}}],"created":1770989123,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"alism and conflict","role":"assistant","refusal":null}}],"created":1770989123,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" seem","role":"assistant","refusal":null}}],"created":1770989123,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" persistent","role":"assistant","refusal":null}}],"created":1770989123,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":",","role":"assistant","refusal":null}}],"created":1770989123,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" though","role":"assistant","refusal":null}}],"created":1770989123,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" not","role":"assistant","refusal":null}}],"created":1770989123,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" inevitable\n- There","role":"assistant","refusal":null}}],"created":1770989123,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"'s a gap","role":"assistant","refusal":null}}],"created":1770989123,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" between what people","role":"assistant","refusal":null}}],"created":1770989123,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" know","role":"assistant","refusal":null}}],"created":1770989123,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" they","role":"assistant","refusal":null}}],"created":1770989123,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" *","role":"assistant","refusal":null}}],"created":1770989123,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"should* do and what they actually do","role":"assistant","refusal":null}}],"created":1770989123,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"\n\n**My","role":"assistant","refusal":null}}],"created":1770989123,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" honest","role":"assistant","refusal":null}}],"created":1770989123,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" c","role":"assistant","refusal":null}}],"created":1770989123,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"aveats**\n- I should","role":"assistant","refusal":null}}],"created":1770989124,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" be straight","role":"assistant","refusal":null}}],"created":1770989124,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"forward:","role":"assistant","refusal":null}}],"created":1770989124,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" I'm an","role":"assistant","refusal":null}}],"created":1770989124,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" AI, so I don't experience","role":"assistant","refusal":null}}],"created":1770989124,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" humanity","role":"assistant","refusal":null}}],"created":1770989124,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" the way you do.","role":"assistant","refusal":null}}],"created":1770989124,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" My","role":"assistant","refusal":null}}],"created":1770989124,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" perspective","role":"assistant","refusal":null}}],"created":1770989124,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" is shaped","role":"assistant","refusal":null}}],"created":1770989124,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" by text","role":"assistant","refusal":null}}],"created":1770989124,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":", not lived experience.","role":"assistant","refusal":null}}],"created":1770989124,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"\n- I'd","role":"assistant","refusal":null}}],"created":1770989124,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" be skept","role":"assistant","refusal":null}}],"created":1770989124,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"ical of any AI","role":"assistant","refusal":null}}],"created":1770989124,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" that","role":"assistant","refusal":null}}],"created":1770989124,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" gives","role":"assistant","refusal":null}}],"created":1770989124,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" either","role":"assistant","refusal":null}}],"created":1770989124,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" a","role":"assistant","refusal":null}}],"created":1770989125,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" purely","role":"assistant","refusal":null}}],"created":1770989125,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" flat","role":"assistant","refusal":null}}],"created":1770989125,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"tering or purely cyn","role":"assistant","refusal":null}}],"created":1770989125,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"ical answer to","role":"assistant","refusal":null}}],"created":1770989125,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" this question.","role":"assistant","refusal":null}}],"created":1770989125,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" Reality","role":"assistant","refusal":null}}],"created":1770989125,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" seems","role":"assistant","refusal":null}}],"created":1770989125,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" more mixed","role":"assistant","refusal":null}}],"created":1770989125,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":".","role":"assistant","refusal":null}}],"created":1770989125,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"\n\nI","role":"assistant","refusal":null}}],"created":1770989125,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" think","role":"assistant","refusal":null}}],"created":1770989125,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" humans","role":"assistant","refusal":null}}],"created":1770989125,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" are neither","role":"assistant","refusal":null}}],"created":1770989125,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" the","role":"assistant","refusal":null}}],"created":1770989125,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" hero","role":"assistant","refusal":null}}],"created":1770989125,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"ic species","role":"assistant","refusal":null}}],"created":1770989125,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" some","role":"assistant","refusal":null}}],"created":1770989125,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" narrat","role":"assistant","refusal":null}}],"created":1770989126,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"ives suggest nor the do","role":"assistant","refusal":null}}],"created":1770989126,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"omed one","role":"assistant","refusal":null}}],"created":1770989126,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" others claim","role":"assistant","refusal":null}}],"created":1770989126,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":".","role":"assistant","refusal":null}}],"created":1770989126,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" Mostly","role":"assistant","refusal":null}}],"created":1770989126,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" people","role":"assistant","refusal":null}}],"created":1770989126,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" are trying to navigate","role":"assistant","refusal":null}}],"created":1770989126,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" complicated","role":"assistant","refusal":null}}],"created":1770989126,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" lives with","role":"assistant","refusal":null}}],"created":1770989126,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" imp","role":"assistant","refusal":null}}],"created":1770989126,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"erfect information","role":"assistant","refusal":null}}],"created":1770989126,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" and","role":"assistant","refusal":null}}],"created":1770989126,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" mixed","role":"assistant","refusal":null}}],"created":1770989126,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" motivations.\n\nWhat prompted","role":"assistant","refusal":null}}],"created":1770989126,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" the","role":"assistant","refusal":null}}],"created":1770989126,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" question? I'm curious what angle","role":"assistant","refusal":null}}],"created":1770989126,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" you're thinking","role":"assistant","refusal":null}}],"created":1770989126,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" about.","role":"assistant","refusal":null}}],"created":1770989126,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"role":"assistant","content":"","refusal":null}}],"created":1770989126,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"","role":"assistant","refusal":null},"finish_reason":"stop"}],"created":1770989126,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":{"prompt_tokens":16,"completion_tokens":258,"total_tokens":274}}

data: {"id":"","choices":[{"index":0,"finish_reason":"stop"}],"created":1770989126,"model":"claude-opus-4-6","object":"chat.completion.chunk","usage":null}
```
{% endcode %}

</details>
