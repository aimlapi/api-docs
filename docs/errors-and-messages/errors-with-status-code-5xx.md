# Errors with status code 5xx

These codes indicate issues on the server side.

{% hint style="success" %}
This may mean an issue on our side or on the AI model provider's side. Try making the call again in a few minutes. If the problem persists, contact our [support team](https://help.aimlapi.com/), and we will investigate.
{% endhint %}

* **500 Internal Server Error** — An unexpected error occurred on the server.
* **502 Bad Gateway** — A downstream service or partner API returned an invalid response.
* **503 Service Unavailable** — The AI model or a partner service is temporarily unavailable.
* **504 Gateway Timeout** — The generation did not finish within the allowed time limit.

## The most frequently received messages

The most frequently received messages in this class are shown below.\
We will gradually expand this list.

<table data-full-width="true"><thead><tr><th width="125.62164306640625" valign="top">Status code</th><th width="271.611328125" valign="top">Message</th><th valign="top">Explanation</th></tr></thead><tbody><tr><td valign="top">500</td><td valign="top">"Internal server error"</td><td valign="top">An unexpected error occurred on our side while processing your request. Retry the call; if the problem persists, contact our support team.</td></tr><tr><td valign="top">500</td><td valign="top">"Something wrong with the server. Please, try again later."</td><td valign="top">A third-party service (including a partner model API) is currently unavailable or failing. Your request is valid — try again a bit later.</td></tr><tr><td valign="top">500</td><td valign="top">"Coupon code not found"</td><td valign="top">The coupon / promo code you entered does not exist or is no longer valid. Check the code for typos or use a different coupon.</td></tr><tr><td valign="top">500</td><td valign="top">"The model is under maintenance, please contact us at help@aimlapi.com.</td><td valign="top">Your Request ID is *." | A provider-side or model-specific error that we don’t yet map to a dedicated message. The model is temporarily unavailable — contact support and include the Request ID.</td></tr><tr><td valign="top">503</td><td valign="top">"Service unavailable"</td><td valign="top">For some technical reason, the API you are calling is currently unavailable.</td></tr><tr><td valign="top">504</td><td valign="top">"Generation timeout"</td><td valign="top">The requested generation took longer than the maximum allowed time. Try reducing duration, resolution, or complexity, or implement a retry with backoff.</td></tr></tbody></table>
