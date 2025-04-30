export default {
  status: {
    desc: `The status of the message.`,
  },
  created_at: {
    desc: `The Unix timestamp (in seconds) for when the message was created.`,
  },
  completed_at: {
    desc: `The Unix timestamp (in seconds) for when the message was completed.`,
  },
  incomplete_at: {
    desc: `The Unix timestamp (in seconds) for when the message was marked as incomplete.`,
  },
  incomplete_details: {
    desc: `On an incomplete message, details about why the message is incomplete.`,
    reason: {
      desc: `The reason the message is incomplete.`,
    },
  },
  assistant_id: {
    desc: `If applicable, the ID of the assistant that authored this message.`,
  },
  thread_id: {
    desc: `The thread ID that this message belongs to.`,
  },
  content: {
    desc: `The content of the message in array of text and/or images.`,
    array: {
      text_content: {
        annotations: {
          file_citation: {
            file_id: {
              desc: `The ID of the specific File the citation is from.`,
            },
          },
          text: {
            desc: `The text in the message content that needs to be replaced.`,
          },
          file_path: {
            file_id: {
              desc: `The ID of the file that was generated.`,
            },
          },
        },
      },
    },
  },
};
