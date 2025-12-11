---
description: >-
  This page describes all 4xx client error codes returned by the AIML API, along
  with real examples of error messages and guidance on how to diagnose and
  resolve each issue.
---

# Errors with status code 4xx

## Error c**lass overview**

These are client-side errors returned by the AIML API when something is wrong with the request rather than with the server. The list below summarizes what each status code means.

* **400 Bad Request** — The request contains invalid or missing parameters.
* **401 Unauthorized** — The request is missing or uses an invalid API key.
* **403 Forbidden** — The request is authenticated but not allowed (e.g., no credits).
* **404 Not Found** — The requested endpoint or resource does not exist.
* **429 Too Many Requests** — You sent too many requests and hit a rate limit.

Detailed examples of error messages and explanations are provided in the sections below.

## The most frequently received messages

The most frequently received messages in this class are shown below.\
We will gradually expand this list.

<table data-full-width="true"><thead><tr><th width="97.2841796875" valign="top">Status code</th><th width="321.7777099609375" valign="top">Message</th><th valign="top">Explanation</th></tr></thead><tbody><tr><td valign="top">400</td><td valign="top">"Body validation error!"</td><td valign="top">Your request body contains invalid or missing fields. Check the API schema for the selected model. The full error message usually includes hints like <strong>"Expected"</strong> and <strong>"Received"</strong> to show which parameter caused the issue.</td></tr><tr><td valign="top">400</td><td valign="top">"Unsupported value: 'messages[0].role' does not support 'system' with this model."</td><td valign="top">The provided role is not supported by the selected model. Check the API schema for the list of allowed values for <code>messages[].role</code> and update your request accordingly.</td></tr><tr><td valign="top">403</td><td valign="top">"You've run out of credits. Please top up your balance or update your payment method to continue: https://aimlapi.com/app/billing/"</td><td valign="top">Your credits or plan limits have been exhausted. Top up your balance or update your payment method on the Billing page to continue using the API.</td></tr><tr><td valign="top">401</td><td valign="top">"This request requires a valid API key. You can create a new API key on the Billing page: https://aimlapi.com/app/keys"</td><td valign="top">The request is not authenticated. The API key is missing, expired, or invalid. Pass a valid <code>Authorization: Bearer &#x3C;API_KEY></code> header from the Keys page in your dashboard.</td></tr><tr><td valign="top">404</td><td valign="top">-</td><td valign="top">The requested endpoint or resource does not exist. Check the base URL, path (for example <code>/v1/chat/completions</code>), and HTTP method used in your request.</td></tr><tr><td valign="top">429</td><td valign="top">"Too Many Requests"</td><td valign="top">You have hit a rate or concurrency limit by sending too many requests in a short period of time. Reduce the request rate, add retries with backoff, or queue requests before calling the API again.</td></tr></tbody></table>

### Example #1: Body validation error

Below is an example of a 400 Bad Request with the generic "Body validation error" message.\
The API adds more details after this line (for example, Invalid enum value, Expected ..., Received ...).\
Use these hints to see which field was wrong and how to fix your request.

{% code overflow="wrap" %}
```python
Body validation error
Invalid enum value. Expected 'kling-video/v1/standard/image-to-video' | 'kling-video/v1/pro/image-to-video' | 'kling-video/v1.6/standard/image-to-video' | 'kling-video/v1.6/pro/image-to-video', received 'an orange mushroom sitting on top of a tree stump in the woods'
```
{% endcode %}
