---
icon: book-open
description: A glossary page with some important API terms explained.
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

# Concepts

## API

API stands for _Application Programming Interface_. In the context of AI/ML, an API serves as a "handle" that enables you to integrate and utilize any Machine Learning model within your application. Our API supports communication via HTTP requests and is fully backward-compatible with OpenAI’s API. This means you can refer to OpenAI’s documentation for making calls to our API. However, be sure to change the base URL to direct your requests to our servers and select the desired model from our offerings.

## Base URL

The Base URL is the first part of the URL (including the protocol, domain, and pathname) that determines the server responsible for handling your request. It’s crucial to configure the correct Base URL in your application, especially if you are using SDKs from OpenAI, Azure, or other providers. By default, these SDKs are set to point to their servers, which are not compatible with our API keys and do not support many of the models we offer.

Our base URL also supports versioning, so you can use the following as well:

* `https://api.aimlapi.com`
* `https://api.aimlapi.com/v1`

Usually, you pass the base URL as the same field inside the SDK constructor. In some cases, you can set the environment variable `BASE_URL`, and it will work. If you want to use the OpenAI SDK, then follow the [setting up article ](../quickstart/setting-up.md)and take a closer look at how to use it with the AI/ML API.

## API Key

You can find your API key on the [account page](https://aimlapi.com/app/keys). An _API Key_ is a credential that grants you access to our API from within your code. It is a sensitive string of characters that should be kept confidential. Do not share your API key with anyone else, as it could be misused without your knowledge.

## Terminal

If you are not a developer or are using modern systems, you might be familiar with it only as a "black window for hackers." However, the terminal is a very old and useful way to communicate with a computer. The terminal is an app inside your operating system that allows you to run commands by typing strings associated with some program. Depending on the operating system, you can run the terminal in many ways. Here are basic ways that usually work:

* **On Windows:** Press the combination `Win + R` and type `cmd`.
* **On Mac:** Press `Command + Space`, search for _Terminal_, then hit `Enter`.
* **On Linux:** You are probably already familiar with it. On Ubuntu with GUI, for example, you can type `Ctrl + F`, search for _Terminal_, then hit `Enter`.
