export default {
  test1: {
    desc: 'desciption1'
  },
  id: {
    desc: `The identifier, which can be referenced in API endpoints.`,
  },
  created_at: {
    desc: `The Unix timestamp (in seconds) for when the Thread was created.`,
  },
  object: {
    desc: `The object type.`,
  },
  role: {
    desc: `The role of the entity that is creating the Message`,
  },
  content: {
    text: {
      desc: `The text contents of the Message`,
    },
    array: {
      desc: `An array of content parts with a defined type, each can be of type text or images can be passed with image_url or image_file`,
      image_file: {
        file_id: {
          desc: `The File ID of the image in the Message content.`,
        },
        detail: {
          desc: `Specifies the detail level of the image if specified by the user. Low uses fewer tokens, you can opt in to high resolution using high.`,
        },
      },
      image_url: {
        url: {
          desc: `The external URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.`,
        },
        detail: {
          desc: `Specifies the detail level of the image. Low uses fewer tokens, you can opt in to high resolution using high. Default value is auto.`,
        },
      },
      text: {
        desc: `Text content to be sent to the model`,
      },
    },
  },
  attachments: {
    desc: `A list of files attached to the Message, and the tools they should be added to.`,
    file_id: {
      desc: `The ID of the file to attach to the Message.`,
    },
    tools: {
      desc: `The tools to which this file should be added.`,
      type: {
        desc: `The type of tool being defined.`,
      },
    },
  },
  tool_resources: {
    desc: `A set of resources that are made available to the assistant's tools in this Thread. The resources are specific to the type of tool. For example, the code_interpreter tool requires a list of file IDs, while the file_search tool requires a list of vector store IDs.`,
    file_search: {
      vector_store_ids: {
        desc: `The vector store attached to this Thread. There can be a maximum of 1 vector store attached to the Thread.`,
      },
    },
  },
  messages: {
    desc: `A list of messages to start the Thread with.`,
  },
};
