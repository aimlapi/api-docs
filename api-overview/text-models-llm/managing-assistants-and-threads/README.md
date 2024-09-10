---
icon: brackets-curly
---

# Managing Assistants & Threads

## Overview

Threads and Messages represent a conversation session between an Assistant and a user. There is no limit to the number of Messages you can store in a Thread. When the size of the Messages exceeds the model's context window, the Thread will smartly truncate messages before fully dropping the least important ones.

## API Reference

{% swagger src="../../../.gitbook/assets/docs-public.yaml" path="/assistants/{assistantId}" method="delete" %}
[docs-public.yaml](../../../.gitbook/assets/docs-public.yaml)
{% endswagger %}

{% swagger src="../../../.gitbook/assets/docs-public.yaml" path="/assistants" method="post" %}
[docs-public.yaml](../../../.gitbook/assets/docs-public.yaml)
{% endswagger %}

{% swagger src="../../../.gitbook/assets/docs-public.yaml" path="/assistants" method="get" %}
[docs-public.yaml](../../../.gitbook/assets/docs-public.yaml)
{% endswagger %}

{% swagger src="../../../.gitbook/assets/docs-public.yaml" path="/assistants/{assistantId}" method="get" %}
[docs-public.yaml](../../../.gitbook/assets/docs-public.yaml)
{% endswagger %}

{% swagger src="../../../.gitbook/assets/docs-public.yaml" path="/assistants/{assistantId}" method="post" %}
[docs-public.yaml](../../../.gitbook/assets/docs-public.yaml)
{% endswagger %}
