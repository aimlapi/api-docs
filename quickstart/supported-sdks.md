---
description: OpenAI API structure support
---

# Supported SDKs

AI/ML API fully supports the OpenAI API structure, ensuring easy integration into systems already using OpenAI's standards.

### **Python SDK**

Integrate with AI/ML API by updating your API key and base\_url in the OpenAI Python SDK. Here's an example with our API's chat model endpoint:

```python
import openai
system_content = "You are a travel agent. Be descriptive and helpful."
user_content = "Tell me about San Francisco"
client = openai.OpenAI(
    api_key="YOUR API TOKEN",
    base_url="https://api.aimlapi.com/",
    )
chat_completion = client.chat.completions.create(
    model="your-model-string-here",
    messages=[
        {"role": "system", "content": system_content},
        {"role": "user", "content": user_content},
    ],
    temperature=0.7,
    max_tokens=512,
)
response = chat_completion.choices[0].message.content
print("AI/ML API:\n", response)

```

#### **Streaming with Python SDK**

To enable streaming of responses, simply add `stream=True` to the chat completions create function.

```python
# ... (previous code setup)
stream = client.chat.completions.create(
    model="your-model-string-here",
    messages=[
        {"role": "system", "content": system_content},
        {"role": "user", "content": user_content},
    ],
    stream=True,
    max_tokens=512,
)
for chunk in stream:
    print(chunk.choices[0].message.content or "", end="", flush=True)

```

### **Node.js SDK**

If you're using Node.js, you can similarly switch to AI/ML API by updating the apiKey and baseURL in the OpenAI Node.js SDK.

```javascript
const { OpenAI } = require("openai");
const openai = new OpenAI({
  apiKey: "YOUR API TOKEN",
  baseURL: "https://api.aimlapi.com/",
});
// ... (your async function to run the code)

```

#### **Streaming in Node.js**

For streaming in Node.js, set `stream: true` in the completions create function.

```javascript
// ... (previous code setup)
const stream = await openai.chat.completions.create({
    model: "{{llmModel}}",
    messages: [
      {
        "role": "system",
        "content": "You are a travel agent. Be descriptive and helpful"
      },
      {
        "role": "user",
        "content": "Tell me about San Francisco"
      }
    ],
    max_tokens: 512,
    stream: true,
});
stream.on('data', (data) => {
    console.log(data.choices[0].message.content || "");
});

```

### **Response Structure**

The response from AI/ML API's chat completion will have a similar structure to the OpenAI API, allowing for a seamless transition.

```python
# Assuming 'response' is the JSON object received from the API:
assistant_response = response['choices'][0]['message']['content']
print(assistant_response)

```

This code snippet will print the content of the message where the role is 'assistant'. It navigates through the nested JSON structure to reach the desired data.
