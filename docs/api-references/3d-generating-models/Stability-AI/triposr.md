[#references:start]: <> ({ "template": "openapi" })
{% hint style="info" %}
This documentation is valid for the following list of our models:
* triposr
{% endhint %}

# Model Overview
Nova-2 builds on the advancements of Nova-1 with speech-specific optimizations to its Transformer architecture, refined data curation techniques, and a multi-stage training approach. /n These improvements result in a lower word error rate (WER) and better entity recognition (including proper nouns and alphanumeric sequences), as well as enhanced punctuation and capitalization. Nova-2 offers the following model options: /n - **atc**: Optimized for audio from air traffic control. /n - **automotive**: Optimized for audio with automative oriented vocabulary. /n - **conversationalai**: Optimized for use cases in which a human is talking to an automated bot, such as IVR, a voice assistant, or an automated kiosk. /n- **drivethru**: Optimized for audio sources from drivethrus. /n- **finance**: Optimized for multiple speakers with varying audio quality, such as might be found on a typical earnings call. Vocabulary is heavily finance oriented. /n- **general**: Optimized for everyday audio processing. /n- **medical**: Optimized for audio with medical oriented vocabulary. /n- **meeting**: Optimized for conference room settings, which include multiple speakers with a single microphone. /n- **phonecall**: Optimized for low-bandwidth audio phone calls. /n- **video**: Optimized for audio sourced from videos. /n- **voicemail**: Optimized for low-bandwidth audio clips with a single speaker. Derived from the phonecall model.

# Setup your API Key
If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

# Submit a request
## API Schema
{% swagger src="./triposr.json" path="/v1/images/generations/with-url" method="post" %}
./triposr.json
{% endswagger %}


[#references:end]: <> ({})
