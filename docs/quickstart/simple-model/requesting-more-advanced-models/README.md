# Requesting more advanced models

This guide uses a more advanced model, [GPT-4o](../../../api-references/text-models-llm/OpenAI/gpt-4o.md), and also explains how to use various chat model capabilities:

* streaming mode
* calling tools
* uploading images to the model for analysis
* uploading files to the model for analysis
* web search

{% hint style="info" %}
If you need help with API keys or environment configuration, go back to the previous step and follow [the detailed quickstart guide](../) for the Gemma 3 model.
{% endhint %}

***

## Making an API Call

The chat model used in this example is more advanced. In addition to regular user messages, it supports the `system` role in the `messages` parameter, which can be used to define global instructions that affect the model’s overall behavior, for example:

```python
messages: [
    {
      role: "system",
      content: "You are a travel agent. Be descriptive and helpful.",
    },
    {
      role: "user",
      content: "Tell me about San Francisco",
    },
],
```

Here’s the complete code you can use right away in a cURL, Python, or Node.js program. You only need to replace `<YOUR_AIMLAPI_KEY>` with your AIML API key from your account, provide your behavior instructions in the system prompt, and place your request to the model in the user prompt.

{% tabs %}
{% tab title="cURL" %}
```bash
curl -L \
  --request POST \
  --url 'https://api.aimlapi.com/v1/chat/completions' \
  --header 'Authorization: Bearer <YOUR_AIMLAPI_KEY>' \
  --header 'Content-Type: application/json' \
  --data '{
    "model": "gpt-4o",
    "messages": [
      {
        "role": "system",
        "content": "You are a travel agent. Be descriptive and helpful.",
      }, 
      {
        "role": "user",
        "content": "Tell me about San Francisco"
      }
    ],
    "temperature": 0.7,
    "max_tokens": 512
  }'
```
{% endtab %}

{% tab title="JavaScript" %}
{% code overflow="wrap" %}
```javascript
systemPrompt = 'You are a travel agent. Be descriptive and helpful.' // instructions
userPrompt = 'Tell me about San Francisco' // your request

async function main() {
  const response = await fetch('https://api.aimlapi.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      // Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>
      'Authorization': 'Bearer <YOUR_AIMLAPI_KEY>',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages:[
          {
              role: 'system',
              content: systemPrompt,
          }, 
          {
              role: 'user',
              content: userPrompt
          }
      ],
      temperature: 0.7,
      max_tokens: 512,
    }),
  });

  const data = await response.json();
  const answer = data.choices[0].message.content;
  
  console.log('User:', userPrompt);
  console.log('AI:', answer);
}

main();
```
{% endcode %}
{% endtab %}

{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests
import json  # for getting a structured output with indentation 

system_prompt = "You are a travel agent. Be descriptive and helpful."
user_prompt = "Tell me about San Francisco"

response = requests.post(
    "https://api.aimlapi.com/v1/chat/completions",
    headers={
        # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
        "Authorization":"Bearer <YOUR_AIMLAPI_KEY>",
        "Content-Type":"application/json"
    },
    json={
        "model":"gpt-4o",
        "messages":[
            {
                "role":"system",
                "content": system_prompt,
            },       
            {
                "role":"user",
                "content": user_prompt,
            }
        ],
        "temperature": 0.7,
        "max_tokens": 256,
    }
)

data = response.json()
print(json.dumps(data, indent=2, ensure_ascii=False))
```
{% endcode %}
{% endtab %}
{% endtabs %}

***

## **Using Streaming Mode**

Streaming lets the model send partial responses as they’re generated instead of waiting for the full output — useful for real‑time feedback.

### Full Streaming Response (Raw Events)

This example shows how to consume the streaming response as-is, without abstraction. Each chunk is processed in real time, exposing the full event structure returned by the API.

Use this approach if you need:

* access to all event types
* fine-grained control over parsing
* debugging or logging of raw responses
* support for metadata beyond plain text

{% tabs %}
{% tab title="Python" %}
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
        "model":"gpt-4o",
        "messages":[
            {
                "role":"user",
                "content":"Hi! What do you think about mankind?" # insert your prompt
            }
        ],
        "stream": True
    }
)

# data = response.json()
print(response.text)
```
{% endtab %}

{% tab title="Python + OpenAI SDK" %}
```python
```
{% endtab %}
{% endtabs %}

<details>

<summary>Example raw streaming response</summary>

{% code overflow="wrap" expandable="true" %}
```json
data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"role":"assistant","content":"","refusal":null},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"RmYFV8ad65HP9F"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":"Hello"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"fjE24R0ZOJr"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":"!"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"qAlxZuNpvVvIIOm"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" As"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"Zn3rsadkL8zHO"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" an"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"D1ss0WZmiGg8l"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" AI"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"bOHB8VYpq4G0W"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":","},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"OwZvgIyMlYVcIgH"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" I"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"u9lFaH3ngdK6MR"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" don't"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"KRFgmSe4yG"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" have"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"YL8zlQ9PjDF"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" personal"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"Gzgb5OT"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" opinions"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"Flz362J"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" or"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"XA0qqmSQr2jme"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" feelings"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"VA3dwaU"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":","},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"POplI0eiOWXpIPD"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" but"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"aDifMrQ8OH9i"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" I"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"ceVweUN2pByieS"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" can"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"txjYCds61AQp"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" provide"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"IGlSpZBf"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" an"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"BtPIfSvUXgRnl"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" overview"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"IYfRhEo"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" of"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"uh8pR2mNtYSNQ"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" various"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"ILZ0ffVW"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" perspectives"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"Rgs"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" on"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"r7Awao2PSZ0DH"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" mankind"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"m8vJ3dzf"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":"."},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"f2wZrEj0RqUFprg"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" Humanity"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"cCPi2qV"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" is"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"yNd7SUoXBojpA"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" often"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"VEaggK2dFS"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" viewed"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"8nhopBJZe"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" as"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"6xG2VkJLonAeF"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" a"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"WDu20GtJyN8Lep"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" complex"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"4bE4D3tS"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" and"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"DZtW3Ahopdgl"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" multif"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"8bS4GMzf3"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":"aceted"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"ivtxUAov3l"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" species"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"Xcq85kDt"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" capable"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"PfwZUtYS"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" of"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"DoyM4RGNLxnFc"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" remarkable"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"mUvVH"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" achievements"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"4fl"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" and"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"GUdfkDUkNBNO"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" profound"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"x4KCnLk"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" creativity"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"goTL4"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":"."},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"gkqK9sezr258S93"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" People"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"c49BcmfXz"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" have"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"Br7pbWtK86v"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" built"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"dzAoO36Siv"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" civilizations"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"yS"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":","},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"hiMiIGF7QM9BeJA"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" explored"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"IhuVoUB"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" space"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"qNqiO3hyXB"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":","},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"UVmzp6Y0qjb7Zkb"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" and"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"iiIw0gK2MP5D"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" developed"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"FJUJhv"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" technologies"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"pkQ"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" that"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"sAhx0IJoR0m"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" transform"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"YDTnhx"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" everyday"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"imFIYIz"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" life"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"6xJBjebVPfo"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":"."},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"DKIPIwgAnVDj3g1"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" At"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"HhuMheG0mPcuI"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" the"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"yIQIWY1CXoW6"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" same"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"QcKwiqSqGRU"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" time"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"f6e6uGKikn5"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":","},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"1eXIFULDN1iS8b1"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" humans"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"GH0z8I36B"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" face"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"JLUmj9BN7PQ"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" significant"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"qdQg"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" challenges"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"KMzNb"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" such"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"8pw9I3FGElO"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" as"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"nY0RLEY6Am9zD"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" environmental"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"4r"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" degradation"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"1zGA"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":","},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"bhbZZCR7wNgWQkq"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" social"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"FcCsVIGji"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" inequalities"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"6kb"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":","},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"Z4Zz2oDgc5zw0D6"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" and"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"Q5XvheR2EWhq"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" geopolitical"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"ySW"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" conflicts"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"eiERwe"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":"."},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"oNAsPbgeJSOuPMg"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" The"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"4TwzxlGRpebL"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" potential"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"lW3Jfo"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" for"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"Ejvws7kQryhN"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" both"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"HVm3EDKAkuA"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" positive"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"HMY8pYv"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" change"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"fbOaTSNWR"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" and"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"ETmTxHsFbCkw"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" destructive"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"WHk8"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" behavior"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"EvSYFf5"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" makes"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"yfwGRy20jz"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" mankind"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"vwJGC8sU"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" a"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"nHyqFYnTzVmVsE"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" subject"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"wtm8Wh9c"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" of"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"gnLF2uDFfg976"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" deep"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"BEc6wh2y2vV"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" contemplation"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"zf"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" and"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"vpg86EhZm5c3"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" varied"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"iWNJAcR7a"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":" viewpoints"},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"JRXUN"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{"content":"."},"logprobs":null,"finish_reason":null}],"usage":null,"obfuscation":"5yN6iGLyFLiQV0H"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[{"index":0,"delta":{},"logprobs":null,"finish_reason":"stop"}],"usage":null,"obfuscation":"4lkqbaPLDt"}

data: {"id":"chatcmpl-DL2G9KdEY06xq8M0PqZ5rs5Jv13ok","object":"chat.completion.chunk","created":1773905945,"model":"gpt-4o-2024-08-06","service_tier":"default","system_fingerprint":"fp_f986a632b0","choices":[],"usage":{"prompt_tokens":16,"completion_tokens":102,"total_tokens":118,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":0,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}},"obfuscation":"VChaI1ntRBrTy"}
```
{% endcode %}

</details>

### Streaming Response Processing (Text Extraction)

This example shows how to process the streaming response to extract only the generated text. Instead of handling all event types, the code filters incoming chunks and prints the content as it arrives. Use this approach if you only need the generated text.

{% tabs %}
{% tab title="Python" %}
{% code expandable="true" %}
```python
import requests
import json

url = "https://api.aimlapi.com/v1/chat/completions"
headers = {
    # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
    "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
    "Content-Type": "application/json"
}

payload = {
    "model": "gpt-4o",
    "messages": [
        {"role": "user", "content": "Explain quantum computing simply."}
    ],
    "stream": True
}

with requests.post(url, headers=headers, json=payload, stream=True) as r:
    # Iterate over the streaming response line by line
    for line in r.iter_lines():
        if not line:
            continue  # Skip empty lines

        # Decode bytes to string
        line = line.decode("utf-8")

        # SSE messages start with "data: "
        if not line.startswith("data: "):
            continue

        # Remove the "data: " prefix
        data_str = line[len("data: "):]

        # "[DONE]" indicates the end of the stream
        if data_str.strip() == "[DONE]":
            break

        try:
            # Parse JSON payload
            data = json.loads(data_str)
        except json.JSONDecodeError:
            continue  # Skip malformed chunks
        
        # Ensure "choices" exists and is not empty
        choices = data.get("choices")
        if not choices:
            continue

        # Extract text delta (OpenAI-style streaming format)
        delta = data.get("choices", [{}])[0].get("delta", {})
        content = delta.get("content")

        # Print text as it arrives
        if content:
            print(content, end="")
```
{% endcode %}
{% endtab %}

{% tab title="Python + OpenAI SDK" %}
```python
from openai import OpenAI

client = OpenAI(
    # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
    api_key="<YOUR_AIMLAPI_KEY>",
    base_url="https://api.aimlapi.com/v1"
)

stream = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "user", "content": "Explain quantum computing simply."}
    ],
    stream=True
)

# Iterate over streaming chunks
for chunk in stream:
    # Ensure choices exist and are not empty
    if not chunk.choices:
        continue

    delta = chunk.choices[0].delta
    content = getattr(delta, "content", None)

    # Print text as it arrives
    if content:
        print(content, end="")
```
{% endtab %}
{% endtabs %}

<details>

<summary>Example processed clean streaming response</summary>

{% code overflow="wrap" expandable="true" %}
```json
Quantum computing is a type of computing that uses principles of quantum mechanics to process information. Unlike classical computers, which use bits to represent data as 0s or 1s, quantum computers use quantum bits or qubits. 

Qubits have unique properties that give quantum computers more power in certain tasks:

1. **Superposition**: A qubit can exist in multiple states (i.e., both 0 and 1) simultaneously. This allows quantum computers to process a vast amount of possibilities at once.

2. **Entanglement**: Qubits can be linked together in such a way that the state of one qubit can depend on the state of another, no matter the distance apart. This can lead to more efficient processing and problem-solving.

3. **Quantum Interference**: Quantum algorithms make use of interference, where different quantum states can amplify or cancel each other out, guiding the computation toward the correct answer.

Because of these properties, quantum computers have the potential to solve certain complex problems much faster than classical computers can, potentially revolutionizing fields like cryptography, materials science, and optimization. However, building practical quantum computers is extremely challenging due to issues with qubit stability and error rates.
```
{% endcode %}

</details>

***

## **Tool calling**

GPT‑4o can call functions/tools you define in the API request to extend behavior (e.g., performing calculations, retrieving structured data).

<details>

<summary>How it works</summary>

1. **Initial request** — The model receives the user prompt and the registered tool, and generates a `tool_calls` object indicating which function it wants to execute.
2. **Extract and run the tool** — Parse the `arguments` from the `tool_calls` object and execute the function locally.
3. **Send back the result** — Return the computed result to the model using the `tool` role and the `content` field.
4. **Final response** — The model incorporates the tool’s output and generates a complete answer for the user.

</details>

{% tabs %}
{% tab title="Python" %}
{% code expandable="true" %}
```python
import requests
import json

# Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
api_key = "<YOUR_AIMLAPI_KEY>"
base_url = "https://api.aimlapi.com/v1"

headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json"
}

# Step 1: Define the tool correctly
tool = {
    "type": "function",
    "function": {
        "name": "toCelsius",
        "description": "Convert Fahrenheit to Celsius",
        "parameters": {
            "type": "object",
            "properties": {
                "fahrenheit": {"type": "number"}
            },
            "required": ["fahrenheit"]
        }
    }
}

# Step 2: Initial request with the tool
payload = {
    "model": "gpt-4o",
    "messages": [
        {"role": "user", "content": "Convert 256°F to °C"}
    ],
    "tools": [tool]
}

response = requests.post(f"{base_url}/chat/completions", headers=headers, json=payload)
data = response.json()

# Step 3: Extract tool call
tool_calls = data["choices"][0]["message"].get("tool_calls", [])
if not tool_calls:
    raise ValueError("No tool calls found. Make sure the tool is correctly defined.")

tool_call = tool_calls[0]
arguments = json.loads(tool_call["function"]["arguments"])
fahrenheit = arguments["fahrenheit"]

# Step 4: Execute the tool locally
celsius_result = (fahrenheit - 32) * 5 / 9

# Step 5: Send result back to model
final_payload = {
    "model": "gpt-4o",
    "messages": [
        {"role": "user", "content": "Convert 256°F to °C"},
        {
            "role": "assistant",
            "tool_calls": [
                {
                    "id": tool_call["id"],
                    "type": "function",
                    "function": {
                        "name": tool_call["function"]["name"],
                        "arguments": tool_call["function"]["arguments"]
                    }
                }
            ]
        },
        {
            "role": "tool",
            "tool_call_id": tool_call["id"],
            "content": str(celsius_result)
        }
    ]
}

final_response = requests.post(f"{base_url}/chat/completions", headers=headers, json=final_payload)
final_data = final_response.json()

# Step 6: Print final answer
print(final_data["choices"][0]["message"]["content"])
```
{% endcode %}
{% endtab %}

{% tab title="Python + OpenAI SDK" %}
{% code expandable="true" %}
```python
from openai import OpenAI
import json

client = OpenAI(
    # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
    api_key="<YOUR_AIMLAPI_KEY>",
    base_url="https://api.aimlapi.com/v1"
)

# Step 1: Define the tool correctly
tool = {
    "type": "function",
    "function": {
        "name": "toCelsius",
        "description": "Convert Fahrenheit to Celsius",
        "parameters": {
            "type": "object",
            "properties": {
                "fahrenheit": {"type": "number"}
            },
            "required": ["fahrenheit"]
        }
    }
}

# Step 2: Initial request with tool
initial_response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Convert 256°F to °C"}],
    tools=[tool]
)

# Step 3: Extract tool call
assistant_message = initial_response.choices[0].message
tool_calls = getattr(assistant_message, "tool_calls", [])
if not tool_calls:
    raise ValueError("No tool calls found. Make sure the tool is correctly defined.")

tool_call = tool_calls[0]
arguments = json.loads(tool_call.function.arguments)
fahrenheit = arguments["fahrenheit"]

# Step 4: Execute tool locally
celsius_result = (fahrenheit - 32) * 5 / 9

# Step 5: Send result back
final_response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "user", "content": "Convert 256°F to °C"},
        {
            "role": "assistant",
            "tool_calls": [
                {
                    "id": tool_call.id,
                    "type": "function",
                    "function": {
                        "name": tool_call.function.name,
                        "arguments": tool_call.function.arguments,
                    },
                }
            ],
        },
        {
            "role": "tool",
            "tool_call_id": tool_call.id,
            "content": str(celsius_result),
        },
    ],
)

print(final_response.choices[0].message.content)
```
{% endcode %}
{% endtab %}
{% endtabs %}

<details>

<summary>Example response</summary>

{% code overflow="wrap" expandable="true" %}
```json
256°F is approximately 124.44°C.
```
{% endcode %}

</details>

***

## **Image upload**

GPT‑4o supports vision inputs: you can send an image URL in the `messages` request to let the model analyze or describe it.

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests
import json

url = "https://api.aimlapi.com/v1/chat/completions"
headers = {
  # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:  
  "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
  "Content-Type": "application/json"
}

payload = {
  "model": "gpt-4o",
  "messages": [
    {
      "role": "user",
      "content": [
        {"type": "text", "text": "Describe this scene:"},
        {"type": "image_url", "image_url": {"url": "https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/mona_lisa_extended.jpg"}}
      ]
    }
  ]
}

response = requests.post(url, headers=headers, data=json.dumps(payload))
data = response.json()
print(json.dumps(data, indent=2, ensure_ascii=False))
```
{% endcode %}
{% endtab %}

{% tab title="Python + OpenAI SDK" %}
{% code overflow="wrap" %}
```python
from openai import OpenAI
import json

# Initialize the client
client = OpenAI(
    # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:  
    api_key="<YOUR_AIMLAPI_KEY>",
    base_url="https://api.aimlapi.com/v1"
)

# Prepare the messages with text and image_url
messages = [
    {
        "role": "user",
        "content": [
            {"type": "text", "text": "Describe this scene:"},
            {
                "type": "image_url",
                "image_url": {
                    "url": "https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/mona_lisa_extended.jpg"
                }
            }
        ]
    }
]

# Create a chat completion
response = client.chat.completions.create(
    model="gpt-4o",
    messages=messages
)

# Print full JSON response
print(json.dumps(response.model_dump(), indent=2, ensure_ascii=False))
```
{% endcode %}
{% endtab %}
{% endtabs %}

<details>

<summary>Example response</summary>

{% code overflow="wrap" %}
```json
{
  "id": "chatcmpl-DL3DDPif2s79HbOHySq6bVY8SAsKQ",
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "logprobs": null,
      "message": {
        "content": "The scene is an iconic Renaissance portrait showing a woman with an enigmatic smile, known for its mastery of detail and composition. The woman is seated against a distant, dreamlike landscape featuring winding paths and rocky formations. She wears a dark dress and light veil, with her hands delicately folded. The background's atmospheric perspective creates depth, with bluish mountains fading into the horizon. The artwork evokes a sense of mystery and balance.",
        "refusal": null,
        "role": "assistant",
        "annotations": [],
        "audio": null,
        "function_call": null,
        "tool_calls": null
      }
    }
  ],
  "created": 1773909607,
  "model": "gpt-4o-2024-08-06",
  "object": "chat.completion",
  "service_tier": "default",
  "system_fingerprint": "fp_0a8aa8bfeb",
  "usage": {
    "completion_tokens": 85,
    "prompt_tokens": 776,
    "total_tokens": 861,
    "completion_tokens_details": {
      "accepted_prediction_tokens": 0,
      "audio_tokens": 0,
      "reasoning_tokens": 0,
      "rejected_prediction_tokens": 0
    },
    "prompt_tokens_details": {
      "audio_tokens": 0,
      "cached_tokens": 0
    }
  },
  "meta": {
    "usage": {
      "credits_used": 7254
    }
  }
}
```
{% endcode %}

</details>

***

## **Web search integration**

With _search‑preview_ models, you can perform live web search queries in combination with the model to get up‑to‑date results and grounded responses.&#x20;

{% hint style="info" %}
See [the complete list of our search‑capable models](../../../capabilities/web-search.md#models-that-support-web-search).
{% endhint %}

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import json
import requests
from typing import Dict, Any

# Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
API_KEY = "<YOUR_AIMLAPI_KEY>"
BASE_URL = "https://api.aimlapi.com/v1"

HEADERS = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json",
}


def search_impl(arguments: Dict[str, Any]) -> Any:
    return arguments


def chat(messages):
    url = f"{BASE_URL}/chat/completions"
    payload = {
        "model": "gpt-4o-mini-search-preview",
        "messages": messages,
        "temperature": 0.6,
        "tools": [
            {
                "type": "builtin_function",
                "function": {"name": "$web_search"},
            }
        ]
    }

    response = requests.post(url, headers=HEADERS, json=payload)
    response.raise_for_status()
    return response.json()["choices"][0]


def main():
    messages = [
        {"role": "system", "content": "You are GPT with web search skills."},
        {"role": "user", "content": "Please search for AGI and tell me what it is in English."}
    ]

    finish_reason = None
    while finish_reason is None or finish_reason == "tool_calls":
        choice = chat(messages)
        finish_reason = choice["finish_reason"]
        message = choice["message"]

        if finish_reason == "tool_calls":
            messages.append(message)

            for tool_call in message["tool_calls"]:
                tool_call_name = tool_call["function"]["name"]
                tool_call_arguments = json.loads(tool_call["function"]["arguments"])

                if tool_call_name == "$web_search":
                    tool_result = search_impl(tool_call_arguments)
                else:
                    tool_result = f"Error: unable to find tool by name '{tool_call_name}'"

                messages.append({
                    "role": "tool",
                    "tool_call_id": tool_call["id"],
                    "name": tool_call_name,
                    "content": json.dumps(tool_result),
                })

    print(message["content"])


if __name__ == "__main__":
    main()
```
{% endcode %}
{% endtab %}

{% tab title="Python + OpenAI SDK" %}
{% code overflow="wrap" %}
```python
import json
from typing import Dict, Any
from openai import OpenAI

# Insert your API key
client = OpenAI(
    api_key="YOUR_AIMLAPI_KEY",
    base_url="https://api.aimlapi.com/v1"
)


def search_impl(arguments: Dict[str, Any]) -> Any:
    return arguments


def chat(messages):
    response = client.chat.completions.create(
        model="gpt-4o-mini-search-preview",
        messages=messages,
        temperature=0.6,
        tools=[
            {
                "type": "function",
                "function": {
                    "name": "$web_search",
                    "parameters": {
                        "type": "object",
                        "properties": {},
                    },
                },
            }
        ],
    )
    return response.choices[0]


def main():
    messages = [
        {"role": "system", "content": "You are GPT with web search skills."},
        {"role": "user", "content": "Please search for AGI and tell me what it is in English."}
    ]

    finish_reason = None
    while finish_reason is None or finish_reason == "tool_calls":
        choice = chat(messages)
        finish_reason = choice.finish_reason
        message = choice.message

        if finish_reason == "tool_calls":
            messages.append(message.model_dump())

            for tool_call in message.tool_calls:
                tool_call_name = tool_call.function.name
                tool_call_arguments = json.loads(tool_call.function.arguments)

                if tool_call_name == "$web_search":
                    tool_result = search_impl(tool_call_arguments)
                else:
                    tool_result = f"Error: unable to find tool by name '{tool_call_name}'"

                messages.append({
                    "role": "tool",
                    "tool_call_id": tool_call.id,
                    "name": tool_call_name,
                    "content": json.dumps(tool_result),
                })

    print(message.content)


if __name__ == "__main__":
    main()
```
{% endcode %}
{% endtab %}
{% endtabs %}

<details>

<summary>Example response</summary>

{% code overflow="wrap" %}
```json
"AGI" is an acronym that can represent different terms depending on the context:

1. **Adjusted Gross Income**: In the United States, AGI refers to Adjusted Gross Income, which is a taxpayer's total income from all sources minus allowable adjustments. This figure is used to determine taxable income and eligibility for various tax benefits. ([usafacts.org](https://usafacts.org/articles/adjusted-gross-income-agi-definition?utm_source=openai))

2. **Artificial General Intelligence**: In the field of artificial intelligence, AGI stands for Artificial General Intelligence. This concept refers to AI systems that possess the ability to understand, learn, and apply knowledge across a wide range of tasks, matching or surpassing human cognitive abilities. ([en.wikipedia.org](https://en.wikipedia.org/wiki/Artificial_general_intelligence?utm_source=openai))

3. **Alliance Graphique Internationale**: AGI also denotes the Alliance Graphique Internationale, an international organization of leading graphic artists and designers. ([en.wikipedia.org](https://en.wikipedia.org/wiki/Alliance_Graphique_Internationale?utm_source=openai))

4. **Agi Language**: Additionally, "Agi" is the name of a Torricelli language spoken in Papua New Guinea. ([en.wikipedia.org](https://en.wikipedia.org/wiki/Agi_language?utm_source=openai))

The specific meaning of "AGI" depends on the context in which it is used.
```
{% endcode %}

</details>

***

## Future Steps

* [Browse and compare AI models, including GPT, Claude, and many others, using the Playground](https://aimlapi.com/app/)
* [Know more about supported SDKs](../../supported-sdks.md)
* [Learn more about special text model capabilities](/broken/pages/qQxIeD1HucvN1Duoxrk0)
* [Join the community: get help and share your projects in our Discord](https://discord.com/invite/hvaUsJpVJf)
