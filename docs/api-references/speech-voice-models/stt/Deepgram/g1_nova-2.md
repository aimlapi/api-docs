[#references:start]: <> ({ "template": "openapi" })
{% hint style="info" %}
This documentation is valid for the following list of our models:
* #g1_nova-2-general
* #g1_nova-2-meeting
* #g1_nova-2-phonecall
* #g1_nova-2-voicemail
* #g1_nova-2-finance
* #g1_nova-2-conversationalai
* #g1_nova-2-video
* #g1_nova-2-medical
* #g1_nova-2-drivethru
* #g1_nova-2-automotive
{% endhint %}

# Model Overview
Nova-2 builds on the advancements of Nova-1 with speech-specific optimizations to its Transformer architecture, refined data curation techniques, and a multi-stage training approach. These improvements result in a lower word error rate (WER) and better entity recognition (including proper nouns and alphanumeric sequences), as well as enhanced punctuation and capitalization.

Nova-2 offers the following model options:
general: Optimized for everyday audio processing.
meeting: Optimized for conference room settings, which include multiple speakers with a single microphone.
phonecall: Optimized for low-bandwidth audio phone calls.
voicemail: Optimized for low-bandwidth audio clips with a single speaker. Derived from the phonecall model.
finance: Optimized for multiple speakers with varying audio quality, such as might be found on a typical earnings call. Vocabulary is heavily finance oriented.
conversationalai: Optimized for use cases in which a human is talking to an automated bot, such as IVR, a voice assistant, or an automated kiosk.
video: Optimized for audio sourced from videos.
medical: Optimized for audio with medical oriented vocabulary.
drivethru: Optimized for audio sources from drivethrus.
automotive: Optimized for audio with automative oriented vocabulary.
atc: Optimized for audio from air traffic control.

# Setup your API Key
If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

# Submit a request
## API Schema
{% swagger src="./g1_nova-2.json" path="/v1/stt" method="post" %}
./g1_nova-2.json
{% endswagger %}

[#references:end]: <> ({})