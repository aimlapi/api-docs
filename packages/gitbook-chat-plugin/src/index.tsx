import {
  createIntegration,
  createComponent,
  FetchEventCallback,
  RuntimeContext,
} from "@gitbook/runtime";

type IntegrationContext = {} & RuntimeContext;
type IntegrationBlockProps = {
  defaultQuestion?: string
};
type IntegrationBlockState = {};
type IntegrationAction = { action: "click" };

const handleFetchEvent: FetchEventCallback<IntegrationContext> = async (
  request,
  context
) => {
  const { api } = context;
  const user = api.user.getAuthenticatedUser();

  return new Response(JSON.stringify(user));
};

const exampleBlock = createComponent<
  IntegrationBlockProps,
  IntegrationBlockState,
  IntegrationAction,
  IntegrationContext
>({
  componentId: "aimlapi-chat",
  initialState: () => ({}),
  action: async (element, action, context) => {
    switch (action.action) {
      case "click":
        console.log("Button Clicked");
        return {};
    }
  },
  render: async ({ props }, context) => {
    const { defaultQuestion = "" } = props;

    const encodedDefaultQuestion = encodeURIComponent(defaultQuestion);

    return (
      <block size="fullscreen">
        <webframe
          source={{
            url: `https://cdn.aimlapi.com/assets/chat/app.html?defaultQuestion=${encodedDefaultQuestion}`,
          }}
          aspectRatio={1}
        />
      </block>
    );
  },
});

export default createIntegration({
  fetch: handleFetchEvent,
  components: [exampleBlock],
  events: {},
});
