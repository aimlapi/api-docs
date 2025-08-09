# Streaming Mode

Streaming mode allows the text chat model to deliver responses as they are generated, rather than waiting for the entire response to be completed. This provides faster feedback and a more fluid interaction. The `stream` parameter is used to enable/disable this mode.&#x20;

You can also use this functionality when programming [Assistants](../solutions/openai/assistants/), though tracking and handling all necessary events is the responsibility of the developer. An example can be found in [one of our use cases related to Assistant creation](../use-cases/create-an-assistant-to-discuss-a-specific-document.md#id-4.-add-streaming-mode).

99% of our available [text models](../api-references/text-models-llm/) support this feature, except for the following:

* [o1](../api-references/text-models-llm/OpenAI/o1.md)
* [openai/gpt-5-2025-08-07](../api-references/text-models-llm/openai/gpt-5.md)
* [openai/gpt-5-mini-2025-08-07](../api-references/text-models-llm/openai/gpt-5-mini.md)

