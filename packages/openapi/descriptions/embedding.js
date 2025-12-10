export default {
  input: {
    desc: `Input text to embed, encoded as a string or array of tokens.`,
  },
  encoding_format: {
    desc: `The format in which to return the embeddings.`,
  },
  dimensions: {
    desc: `The number of dimensions the resulting output embeddings should have.`,
  },
  input_type: {
    desc: `The type of input data for the model.`,
  },
  auto_truncate: {
    desc: `If enabled, this parameter automatically truncates the input text to fit within the model’s maximum token limit. It helps ensure that longer texts are processed without errors.`,
  },
  task_type: {
    desc: `Optional task type for which the embeddings will be used`,
  },
  title: {
    desc: `An optional title for the text. Only applicable when task_type is RETRIEVAL_DOCUMENT.
  
  Note: Specifying a title for RETRIEVAL_DOCUMENT provides better quality embeddings for retrieval.`,
  },
  dimensions: {
    desc: `The number of dimensions for the embedding. Default is 1024.`,
  },
};
