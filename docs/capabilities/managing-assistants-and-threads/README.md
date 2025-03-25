# Managing Assistants & Threads

## Overview

Here's a simple explanation of how **Messages**, **Threads**, and **Assistants** work in OpenAI's system:

* A **Message** is a single exchange in a conversation. It can be something a user sends to the assistant (like a question or command) or something the assistant replies with. Think of it as one text bubble in a chat.
* A **Thread** is a collection of **Messages** that belong to the same conversation. It keeps all the back-and-forth exchanges together, so the assistant can remember what was said earlier in that conversation. Each time a user starts a new discussion, it creates a new Thread. There is no limit to the number of Messages you can store in a Thread. When the size of the Messages exceeds the model's context window, the Thread will smartly truncate messages before fully dropping the least important ones.
* An **Assistant** is the AI itself—its personality, skills, and behavior. When you set up an Assistant, you define what it knows, how it should respond, and whether it can use extra tools (like APIs or file uploads). One Assistant can be used across multiple Threads and users.

***

## How to Use Assistant API

1. **Create an Assistant** and obtain its ID.
2. **Create a Thread** where the interaction between the created Assistant and the user (a human) will take place. This method will return the ID of the created Thread.
3. **Send the first user message** either directly in the code or by passing it from a form. This message will be the first in your Thread. You must specify `role: 'user'` and the corresponding `thread_id`.
4. **Create a Run** to initiate the Chat Completion process for messages within the specified Thread using the specified Assistant. This is very similar to calling a model without using the Assistants and Threads framework. If external tool calls (so-called function calling) might be needed during processing, you must predefine the available tools in the `tools` parameter and set `tool_choice` to `'auto'`.

{% hint style="warning" %}
Note that runs expire ten minutes after creation. \
Be sure to submit your tool outputs before the 10-minute mark.
{% endhint %}

## Examples

