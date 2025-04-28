export default {
  dimensions: {
    desc: `The number of dimensions the resulting output embeddings should have.`,
  },
  input_type: {
    desc: ``,
  },
  auto_truncate: {
    desc: ``,
  },
  task_type: {
    desc: `Optional task type for which the embeddings will be used`,
  },
  title: {
    desc: `An optional title for the text. Only applicable when task_type is RETRIEVAL_DOCUMENT.

Note: Specifying a title for RETRIEVAL_DOCUMENT provides better quality embeddings for retrieval.`,
  },
};
