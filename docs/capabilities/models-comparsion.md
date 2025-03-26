---
description: >-
  A practical example for comparing responses from different models to the same
  question.
layout:
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
---

# Model comparison

You can send the same request to two specific text models of your choice and compare the results.

Just select two models from the [Text Models (LLM) list](../api-references/model-database.md#text-models-llm), copy their Model IDs, and paste them into the `Specify the models to compare` section of this code example as the values for `model1` and `model2`.&#x20;

Don't forget to also insert your [AIML API Key](https://aimlapi.com/app/keys) instead of `<YOUR_AIMLAPI_KEY>`:

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests
from openai import OpenAI

# API credentials
BASE_URL = "https://api.aimlapi.com/v1"
# insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
API_KEY = "<YOUR_AIMLAPI_KEY>"

# Specify the models to compare
model1 = "gpt-4o"
model2 = "MiniMax-Text-01"

def generate_joke(model):
    client = OpenAI(base_url=BASE_URL, api_key=API_KEY)
    
    system_prompt = "You are an AI assistant that only responds with jokes."
    user_prompt = "Why did the programmer break up with their keyboard?"
    
    response = client.chat.completions.create(
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
        model=model,
    )
    
    return response.choices[0].message.content

def main():
    for model in [model1, model2]:
        joke = generate_joke(model)
        print(f"--- {model} ---")
        print(f"USER: Why did the programmer break up with their keyboard?")
        print(f"AI  : {joke}")

if __name__ == "__main__":
    main()

```
{% endcode %}
{% endtab %}

{% tab title="JavaScript" %}
{% code overflow="wrap" %}
```javascript
import fetch from "node-fetch";

// API credentials
const BASE_URL = "https://api.aimlapi.com/v1";
const API_KEY = "<YOUR_AIMLAPI_KEY>";

// Specify the models to compare
const model1 = "gpt-4o";
const model2 = "MiniMax-Text-01";

async function generateJoke(model) {
    const systemPrompt = "You are an AI assistant that only responds with jokes.";
    const userPrompt = "Why did the programmer break up with their keyboard?";

    const response = await fetch(`${BASE_URL}/chat/completions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ]
        })
    });
    
    const data = await response.json();
    return data.choices[0].message.content;
}

async function main() {
    for (const model of [model1, model2]) {
        const joke = await generateJoke(model);
        console.log(`--- ${model} ---`);
        console.log("USER: Why did the programmer break up with their keyboard?");
        console.log(`AI  : ${joke}`);
    }
}

main().catch(console.error);
```
{% endcode %}
{% endtab %}
{% endtabs %}

In our example run, we received the following output:

{% code overflow="wrap" %}
```http
--- gpt-4o ---
USER: Why did the programmer break up with their keyboard?
AI  : Because it just wasn't their type!
--- MiniMax-Text-01 ---
USER: Why did the programmer break up with their keyboard?
AI  : Because it kept hitting the wrong keys!
```
{% endcode %}
