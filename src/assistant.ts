import OpenAI from "openai";

export class Assistant {
  openai: OpenAI = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });
  assistant: OpenAI.Beta.Assistants.Assistant | null;
  thread: OpenAI.Beta.Threads.Thread | null;
  run: OpenAI.Beta.Threads.Runs.Run | null;

  constructor() {
		this.assistant = null;
		this.thread = null;
		this.run = null;
	}

  async Init() {
    this.assistant = await this.openai.beta.assistants.create({
      model: "gpt-4o",
      instructions:
        "You are an image recognition bot which analyses photos to determine how they can be recycled in Portugal and other countries in Europe following similar recycling systems. Always return in json format",
    });
    this.thread = await this.openai.beta.threads.create();
  }

  async RunThread() {
    if (this.thread && this.assistant) {
      this.run = await this.openai.beta.threads.runs.createAndPoll(this.thread.id, {
        assistant_id: this.assistant.id,
        instructions: this.assistant.instructions,
      });
    }
  }

  async ResolveRun() {
    console.log("this.run", this.run);
    if (this.run?.status === "completed" && this.thread) {
      const messages = await this.openai.beta.threads.messages.list(this.thread.id);
      const responseMessageObj = messages.data[0];
      const responseMessageContent = responseMessageObj.content[0];

      this.run = null;
      return { responseMessageObj, responseMessageContent };
    }
  }

  async UserMessage(content: string) {
    if (this.thread) {
      return this.openai.beta.threads.messages.create(this.thread.id, {
        role: "user",
        content: content,
      });
    }
  }
}
