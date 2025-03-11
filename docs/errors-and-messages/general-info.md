# General Info

## Overview

The general structure of the error body includes the following parameters:

* **message** – The error message explaining that the free-tier limit has been reached and suggesting upgrading to a paid plan.
* **path** – The API endpoint that was called when the error occurred.
* **requestId** – A unique identifier for the specific request, useful for debugging or support inquiries.
* **statusCode** – The HTTP status code indicating the error type (429 means too many requests).
* **timestamp** – The exact time when the error occurred, in ISO 8601 format.

## Error message example

{% code overflow="wrap" %}
```json
{
    "message": "Free-tier limit: You've reached your free limit for the hour. Get AI/ML Subscription to use API, visit https://aimlapi.com/app/billing/ !"
    "path": "/v1/chat/completions"
    "requestId": "798b860e-98c2-4e8e-8c50-550bcfc2eccc"
    "statusCode": "429"
    "timestamp": "2025-03-11T07:13:27.813Z"
}
```
{% endcode %}

