# OpenAI SDK doesn't work?

#### Check OpenAI SDK installation

Depending on your environment, the steps may differ. For Python and NodeJS, you can proceed to the setup article and check if all steps are completed correctly.

#### Check base URL

OpenAI SDK is a configurable package. To use it with our AI/ML API server, you need to pass a parameter called `base URL`. Depending on your environment, this process can differ, but here is an example for Python and NodeJS:

{% code title="api.py" %}
```python
from openai import OpenAI

api_key = "my_key"
base_url = "https://api.aimlapi.com/v1"

api = OpenAI(api_key=api_key, base_url=base_url)
```
{% endcode %}

{% code title="api.js" %}
```javascript
const { OpenAI } = require("openai");

const apiKey = "my_key";
const baseURL = "https://api.aimlapi.com/v1";

const api = new OpenAI({
  apiKey,
  baseURL,
});
```
{% endcode %}

#### Check API key

When you use the AI/ML API, you should use our API key. This API key is listed on your account page, and you should keep it safe. When sending a request to the API, you need to ensure that you have included the API key in your query.

Look at the example with the base URL above and check if you passed the correct API key to the `api_key` or `apiKey` parameters.
