[#references:start]: <> ({ "template": "openapi" })
{% hint style="info" %}
This documentation is valid for the following list of our models:
* #g1_whisper-medium
{% endhint %}

# Model Overview
The Whisper models are primarily for AI research, focusing on model robustness, generalization, and biases, and are also effective for English speech recognition. The use of Whisper models for transcribing non-consensual recordings or in high-risk decision-making contexts is strongly discouraged due to potential inaccuracies and ethical concerns.
The models are trained using 680,000 hours of audio and corresponding transcripts from the internet, with 65% being English audio and transcripts, 18% non-English audio with English transcripts, and 17% non-English audio with matching non-English transcripts, covering 98 languages in total.

# Setup your API Key
If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

# Submit a request
## API Schema
{% swagger src="./g1_whisper-medium.json" path="/stt" method="post" %}
./g1_whisper-medium.json
{% endswagger %}

[#references:end]: <> ({})