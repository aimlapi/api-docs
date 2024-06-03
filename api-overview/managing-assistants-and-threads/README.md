# Managing Assistants and Threads

Threads and Messages represent a conversation session between an Assistant and a user. There is no limit to the number of Messages you can store in a Thread. When the size of the Messages exceeds the model's context window, the Thread will smartly truncate messages before fully dropping the least important ones.

### List your assistants

{% swagger src="../../.gitbook/assets/aimlapi.yaml" path="/assistants" method="get" %}
[aimlapi.yaml](../../.gitbook/assets/aimlapi.yaml)
{% endswagger %}

### Create your assistant

{% swagger src="../../.gitbook/assets/aimlapi.yaml" path="/assistants" method="post" %}
[aimlapi.yaml](../../.gitbook/assets/aimlapi.yaml)
{% endswagger %}

### Get assistant

{% swagger src="../../.gitbook/assets/aimlapi.yaml" path="/assistants/{assistantId}" method="get" %}
[aimlapi.yaml](../../.gitbook/assets/aimlapi.yaml)
{% endswagger %}

### Update assistant

{% swagger src="../../.gitbook/assets/aimlapi.yaml" path="/assistants/{assistantId}" method="post" %}
[aimlapi.yaml](../../.gitbook/assets/aimlapi.yaml)
{% endswagger %}
