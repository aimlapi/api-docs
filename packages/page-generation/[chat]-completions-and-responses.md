# MODEL_ID

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `DEVELOPER/MODEL_ID`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/MODEL_ID" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview



{% hint style="success" %}
[Create AI/ML API Key](https://aimlapi.com/app/keys)
{% endhint %}

<details>

<summary>How to make the first API call</summary>

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).
{% endhint %}

</details>

## API Schemas

<details>

<summary>Chat Completions vs. Responses API</summary>

**Chat Completions**\
The _chat completions_ API is the older, chat-oriented interface where you send a list of messages (`role: user`, `role: assistant`, etc.), and the model returns a single response. It was designed specifically for conversational workflows and follows a structured chat message format. It is now considered a legacy interface.

**Responses**\
The _Responses_ API is the newer, unified interface used across OpenAI’s latest models. Instead of focusing only on chat, it supports multiple input types (text, images, audio, tools, etc.) and multiple output modalities (text, JSON, images, audio, video). It is more flexible, more consistent across models, and intended to replace chat completions entirely.

</details>

### Chat Completions Endpoint

{% openapi-operation spec="SCHEMA_SLUG" path="/v1/chat/completions" method="post" %}
[OpenAPI SCHEMA_SLUG](SCHEMA_URL)

### Responses Endpoint

This endpoint is currently used _only_ with OpenAI models. Some models support both the `/chat/completions` and `/responses` endpoints, while others support only one of them.

{% openapi-operation spec="gpt-5-5-RESPONSES" path="/v1/responses" method="post" %}
[OpenAPI gpt-5-5-RESPONSES](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/OpenAI/gpt-5-5-RESPONSES.json)
{% endopenapi-operation %}

## Code Example

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
        "model":"DEVELOPER/MODEL_ID",
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
      model: 'DEVELOPER/MODEL_ID',
      messages:[
          {
              role:'user',
              content: 'Hi! What do you think about mankind?' // insert your prompt
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
```
{% endcode %}

</details>

## Code Example #2: Using /responses Endpoint

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests
import json   # for getting a structured output with indentation

response = requests.post(
    "https://api.aimlapi.com/v1/responses",
    headers={
        "Content-Type":"application/json", 

        # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
        "Authorization":"Bearer <YOUR_AIMLAPI_KEY>",
        "Content-Type":"application/json"
    },
    json={
        "model":"DEVELOPER/MODEL_ID",
        "input":"Hi! What do you think about mankind?" # insert your prompt   
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
  try {
    const response = await fetch('https://api.aimlapi.com/v1/responses', {
      method: 'POST',
      headers: {
        // Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>
        'Authorization': 'Bearer <YOUR_AIMLAPI_KEY>',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'DEVELOPER/MODEL_ID',
        input: 'Hi! What do you think about mankind?' // insert your prompt
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status ${response.status}`);
    }

    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));

  } catch (error) {
    console.error('Error', error);
  }
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
```
{% endcode %}

</details>