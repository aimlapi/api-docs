---
icon: code
description: Example of using the threads API.
---

# Using Assistants & Threads

## Overview

You can find the full code [here](https://github.com/aimlapi/threads-demo).

The Threads API is very useful for creating a chat-like experience with a relatively large message history.

Usually, this task is accomplished by using the chat completion API, but it requires managing the state of the message history, which can't be done in all contexts. For example, in a serverless environment, you can't store the state, so you need to find another way to manage the state.

The Threads API does this state management for you, providing streaming and polling features out-of-the-box. You can use the Threads API using raw HTTP requests, but a simpler way is to use the Openal SDK.

## **Example**

First, you need to import the OpenAI SDK:

```javascript
const { OpenAI } = require('openai');
const api = new OpenAI({ baseUrl: '{{baseUrl}}', apiKey: '{{token}}' })
```

Next, create your assistant:

```javascript
const assistant = await api.beta.assistants.create({
      model: '{{llmModel}}',
      name: 'Funny assistant',
      description: 'Replies only with jokes',
      instructions: 'Reply to user only with jokes',
});
```

And create a thread and write a user message in it:

```javascript
// Empty thread
const thread = await api.beta.threads.create({ messages: [] });
await api.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: text,
      metadata: {
        userId: 'example-1',
      },
 });
await api.beta.threads.runs.createAndPoll(thread.id, { assistant_id: assistantId });
const messages = await api.beta.threads.messages.list(thread.id, { order: 'desc', limit: 1 });
const msg = messages.data[0].content.find((item) => item.type === 'text').text.value;
console.log(`Assistant: ${msg}`);
```

This code will return a model answer based on your prompt and keep the thread with message history on the server, transferring all message state management from your code to the API.
