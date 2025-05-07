export default {
  id: {
    desc: `The identifier, which can be referenced in API endpoints.`,
  },
  created_at: {
    desc: `The Unix timestamp (in seconds) for when the Assistant was created.`,
  },
  object: {
    desc: `The object type.`,
  },
  model: {
    desc: `ID of the model to use.`,
  },
  description: {
    desc: `The description of the Assistant. The maximum length is 512 characters.`,
  },
  instructions: {
    desc: `The system instructions that the Assistant uses. The maximum length is 256,000 characters. Instructions can indeed be very large and complex, including full action frameworks, example messages, response formatting guidelines, topic restrictions, and stylistic rules.`,
  },
  metadata: {
    desc: `Set of 16 key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format, and querying for objects via API or the dashboard.
  Keys are strings with a maximum length of 64 characters. Values are strings with a maximum length of 512 characters.`,
  },
  name: {
    desc: `The name of the Assistant. The maximum length is 256 characters.`,
  },
  reasoning_effort: {
    desc: `Constrains effort on reasoning for reasoning models.`,
  },
  response_format: {
    desc: `Specifies the format that the model must output.`,
    text: {
      desc: `Default response format. Used to generate text responses.`,
      type: {
        desc: `The type of response format being defined. Always text.`,
      },
    },
    json_schema: {
      desc: `JSON Schema response format. Used to generate structured JSON responses.`,
      type: {
        desc: `The type of response format being defined. Always json_schema.`,
      },
      json_schema: {
        desc: `Structured Outputs configuration options, including a JSON Schema.`,
        name: {
          desc: `The name of the response format. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.`,
        },
        description: {
          desc: `A description of what the response format is for, used by the model to determine how to respond in the format.`,
        },
        schema: {
          desc: `The schema for the response format, described as a JSON Schema object.`,
        },
        strict: {
          desc: `Whether to enable strict schema adherence when generating the output. If set to True, the model will always follow the exact schema defined in the schema field. Only a subset of JSON Schema is supported when strict is True.`,
        },
      },
    },
    json_object: {
      desc: `An older method of generating JSON responses. Using json_schema is recommended for models that support it. Note that the model will not generate JSON without a system or user Message instructing it to do so.`,
      type: {
        desc: `The type of response format being defined. Always json_object.`,
      },
    },
  },
  temperature: {
    desc: `What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.`,
  },
  tool_resources: {
    desc: `A set of resources that are used by the Assistant's tools. The resources are specific to the type of tool. For example, the code_interpreter tool requires a list of file IDs, while the file_search tool requires a list of vector store IDs.`,
    code_interpreter: {
      file_ids: {
        desc: `A list of file IDs made available to the code_interpreter tool. There can be a maximum of 20 files associated with the tool.`,
      },
    },
    file_search: {
      vector_store_ids: {
        desc: `The vector store attached to this Assistant. There can be a maximum of 1 vector store attached to the Assistant.`,
      },
      vector_stores: {
        desc: `A helper to create a vector store with file_ids and attach it to this Assistant. There can be a maximum of 1 vector store attached to the Assistant.`,
        chunking_strategy: {
          desc: `The chunking strategy used to chunk the file(s). If not set, will use the auto strategy.`,
          static: {
            chunk_overlap_tokens: {
              desc: `The number of tokens that overlap between chunks. The default value is 400. Note that the overlap must not exceed half of max_chunk_size_tokens.`,
            },
            max_chunk_size_tokens: {
              desc: `The maximum number of tokens in each chunk. The default value is 800. The minimum value is 100 and the maximum value is 4096`,
            },
          },
        },
        file_ids: {
          desc: `A list of file IDs to add to the vector store. There can be a maximum of 10000 files in a vector store.`,
        },
      },
    },
  },
  tools: {
    desc: `A list of tool enabled on the Assistant. There can be a maximum of 128 tools per Assistant.`,
    type: {
      desc: `The type of tool being defined.`,
    },
    file_search: {
      desc: `Overrides for the file search tool`,
      max_num_results: {
        desc: `The maximum number of results the file search tool should output`,
      },
      ranking_options: {
        desc: `The ranking options for the file search. If not specified, the file search tool will use the auto ranker and a score_threshold of 0.`,
        score_threshold: {
          desc: `The score threshold for the file search. All values must be a floating point number between 0 and 1`,
        },
        ranker: {
          desc: `The ranker to use for the file search. If not specified will use the auto ranker`,
        },
      },
    },
    function: {
      name: {
        desc: `The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.`,
      },
      description: {
        desc: `A description of what the function does, used by the model to choose when and how to call the function.`,
      },
      parameters: {
        desc: `The parameters the functions accepts, described as a JSON Schema object`,
      },
      strict: {
        desc: `Whether to enable strict schema adherence when generating the function call. If set to True, the model will follow the exact schema defined in the parameters field. Only a subset of JSON Schema is supported when strict is True`,
      },
    },
  },
  top_p: {
    desc: `An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.
  
  We generally recommend altering this or temperature but not both.`,
  },
  limit: {
    desc: `A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.`,
  },
  order: {
    desc: `Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order.`,
  },
  before: {
    desc: `A cursor for use in pagination. before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list.`,
  },
  after: {
    desc: `A cursor for use in pagination. after is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.`,
  },
  run_id: {
    desc: `Filter Messages by the Run ID that generated them.`,
  },
};
