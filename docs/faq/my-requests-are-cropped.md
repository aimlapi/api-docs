---
description: >-
  Find out why your API requests are being cropped and how to prevent data
  truncation.
icon: circle-question
---

# Are my requests cropped?

AI/ML API has a parameter called `max_tokens`. Usually, this parameter can be crucial if your requests are large and can lead to text cropping. This parameter controls the maximum number of input and output tokens combined that your model will use inside your request and can save your tokens if the generation is larger than you expect. Try to adjust it and see the result.
