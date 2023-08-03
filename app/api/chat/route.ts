import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { CallbackManager } from "langchain/callbacks";
import { ChatOpenAI } from "langchain/chat_models/openai"
import { Calculator } from "langchain/tools/calculator";


const calc = new Calculator();
export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    // 获取最后一条消息
    const input = messages.map((m:any) => m.content).join("\n");
    // Check if the request is for a streaming response.
    const streaming = true
    console.log("server streaming", streaming);
      const encoder = new TextEncoder();
      const stream = new TransformStream();
      const writer = stream.writable.getWriter();
      console.log("creating llm");
      const llm = new ChatOpenAI({
        openAIApiKey: process.env.OPENAI_API_KEY,
        streaming,
        callbackManager: CallbackManager.fromHandlers({
          handleLLMNewToken: async (token: string) => {
            await writer.ready;
            await writer.write(encoder.encode(`${token}`));
          },
          handleLLMEnd: async () => {
            await writer.ready;
            // 输入换行符
            await writer.write(
              encoder.encode(`\n\n`),
            );
          },
          handleLLMError: async (e: Error) => {
            await writer.ready;
            await writer.abort(e);
          },
        }),
      });
      console.log("creating chain");
      const agent = await initializeAgentExecutorWithOptions([calc], llm, {
        agentType: "zero-shot-react-description",
        verbose: true,
      });
      // Add a hook function to be executed when the agent call completes
      const onAgentCallComplete = async () => {
        // Perform any additional actions you want here
        console.log("Agent call completed");
        // For example, you can close the writer here if needed
        await writer.ready;
        await writer.close();
      };
      // We don't need to await the result of the chain.run() call because
      // the LLM will invoke the callbackManager's handleLLMEnd() method
      
      agent
        .call({ input: input })
        .catch((e: Error) => console.error(e))
        .finally(onAgentCallComplete);
      console.log("returning response");
      return new Response(stream.readable, {
        headers: { "Content-Type": "text/event-stream" },
      });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as any).message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export const runtime = "edge";
