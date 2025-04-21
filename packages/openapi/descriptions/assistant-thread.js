export default {
  role: {
    desc: `The role of the entity that is creating the message`,
  },
  content: {
    text: {
      desc: `The text contents of the message`,
    },
    array: {
      desc: `An array of content parts with a defined type, each can be of type text or images can be passed with image_url or image_file`,
      image_file: {
        file_id: {
          desc: `The File ID of the image in the message content.`,
        },
        detail: {
          desc: `Specifies the detail level of the image if specified by the user. low uses fewer tokens, you can opt in to high resolution using high.`,
        },
      },
      image_url: {
        url: {
          desc: `The external URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.`,
        },
        detail: {
          desc: `Specifies the detail level of the image. low uses fewer tokens, you can opt in to high resolution using high. Default value is auto.`,
        },
      },
      text: {
        desc: `Text content to be sent to the model`,
      },
    },
  },
  attachments: {
    desc: `A list of files attached to the message, and the tools they should be added to.`,
    file_id: {
      desc: `The ID of the file to attach to the message`,
    },
    tools: {
      desc: `The tools to add this file to`,
      type: {
        desc: `The type of tool being defined`,
      },
    },
  },
};
