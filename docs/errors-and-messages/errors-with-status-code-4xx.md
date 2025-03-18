# Errors with status code 4xx

## Error c**lass overview**

These are so-called client errors which indicate that the request is incorrect or cannot be processed by the server.

* **400 Bad Request** — The request is malformed (e.g., syntax errors or invalid parameters).
* **401 Unauthorized** — Authentication is required.
* **403 Forbidden** — Access is denied, even if authentication was successful.
* **404 Not Found** — The requested resource was not found.
* **429 Too Many Requests** — The client has exceeded the request limit.

## The most frequently received messages

The most frequently received messages in this class are shown below. \
We will gradually expand this list.

<table data-full-width="true"><thead><tr><th width="112" valign="top">Status code</th><th width="392" valign="top">Message</th><th valign="top">Explanation</th></tr></thead><tbody><tr><td valign="top">400</td><td valign="top">"Body validation error!"</td><td valign="top">Your request was not processed due to incorrectly filled parameters. Check the API schema for the selected model. Development environments usually provide more detailed hints about which parameter or at least which line caused the issue. Look for the hints "Expected" and "Received" — this is the easiest way to identify which parameters were incorrect.</td></tr><tr><td valign="top">400</td><td valign="top">"Query validation error!"</td><td valign="top">An alternative version of the previous message, but for Query section of your code.</td></tr><tr><td valign="top">400</td><td valign="top">"Unsupported value: 'messages[0].role' does not support 'system' with this model."</td><td valign="top">The provided value is not supported by the selected model. Check the API schema for a list of supported values for this text model.</td></tr><tr><td valign="top">403</td><td valign="top">"You have exhausted the available [plan.rule:api_token] resource limit. Update your payment method to continue using the service. For more information please visit https://aimlapi.com/app/billing"</td><td valign="top">You have reached the daily call limit for your current plan.</td></tr><tr><td valign="top"></td><td valign="top"></td><td valign="top"></td></tr><tr><td valign="top"></td><td valign="top"></td><td valign="top"></td></tr></tbody></table>

### Example #1: Body validation error

Below is an example of an error a user encountered after mixing up the `prompt` and `model` parameters—attempting to pass video generation instructions into the parameter meant for specifying the model ID to be used for generation.

{% code overflow="wrap" %}
```python
Body validation error
Invalid enum value. Expected 'kling-video/v1/standard/image-to-video' | 'kling-video/v1/pro/image-to-video' | 'kling-video/v1.6/standard/image-to-video' | 'kling-video/v1.6/pro/image-to-video', received 'an orange mushroom sitting on top of a tree stump in the woods'
```
{% endcode %}

