---
icon: brackets-curly
---

# Managing Assistants & Threads

## Overview

Threads and Messages represent a conversation session between an Assistant and a user. There is no limit to the number of Messages you can store in a Thread. When the size of the Messages exceeds the model's context window, the Thread will smartly truncate messages before fully dropping the least important ones.

## API Reference

{% swagger src="https://api-staging.aimlapi.com/docs-public-json" path="/assistants/{assistantId}" method="delete" %}
[https://api-staging.aimlapi.com/docs-public-json](https://api-staging.aimlapi.com/docs-public-json)
{% endswagger %}

{% swagger src="https://api-staging.aimlapi.com/docs-public-json" path="/assistants" method="post" %}
[https://api-staging.aimlapi.com/docs-public-json](https://api-staging.aimlapi.com/docs-public-json)
{% endswagger %}

{% swagger src="https://api-staging.aimlapi.com/docs-public-json" path="/assistants" method="get" %}
[https://api-staging.aimlapi.com/docs-public-json](https://api-staging.aimlapi.com/docs-public-json)
{% endswagger %}

{% swagger src="https://api-staging.aimlapi.com/docs-public-json" path="/assistants/{assistantId}" method="get" %}
[https://api-staging.aimlapi.com/docs-public-json](https://api-staging.aimlapi.com/docs-public-json)
{% endswagger %}

{% swagger src="https://api-staging.aimlapi.com/docs-public-json" path="/assistants/{assistantId}" method="post" %}
[https://api-staging.aimlapi.com/docs-public-json](https://api-staging.aimlapi.com/docs-public-json)
{% endswagger %}
