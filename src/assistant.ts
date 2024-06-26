import OpenAI from "openai";
import { ResponseMessage } from "./context/AssistantContext";

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

	async init() {
		this.assistant = await this.openai.beta.assistants.create({
			model: "gpt-4o",
			instructions:
				"You are an image recognition bot which analyses photos to determine how they can be recycled in Portugal and other countries in Europe following similar recycling systems. Always return in json format with the following fields: nameOfObject, whereToRecycle (with this format: Name bin - color), howToRecycle (how prepare the object before placing into the bin), co2EstimativeReduction (Only with the weight and the materials the object have and with the same format e. g. 0.05 kg), objectMaterials. Just send me the object json without markdown syntax. Resolve the image as url.",
		});
		this.thread = await this.openai.beta.threads.create();
	}

	async createAndPoolRun(): Promise<void> {
		if (this.thread && this.assistant) {
			this.run = await this.openai.beta.threads.runs.createAndPoll(
				this.thread.id,
				{
					assistant_id: this.assistant.id,
					instructions: this.assistant.instructions,
				}
			);
		}
	}

	async receiveMessage(): Promise<ResponseMessage | undefined> {
		if (this.run?.status === "completed" && this.thread) {
			const messages = await this.openai.beta.threads.messages.list(
				this.thread.id
			);
			const responseMessageObj = messages.data[messages.data.length - 1];
			const responseMessageContent = responseMessageObj.content[0] as {
				text: {
					value: string;
				};
			};

			const responseMessage =
				typeof responseMessageContent.text.value === "string"
					? JSON.parse(responseMessageContent.text.value)
					: responseMessageContent.text.value;

			this.run = null;

			return responseMessage as ResponseMessage;
		}
	}

	async sendMessage(imageUrl: string): Promise<void> {
		await this.createAndPoolRun();
		if (this.thread) {
			console.log("imageUrl", imageUrl);
			await this.openai.beta.threads.messages.create(this.thread.id, {
				role: "user",
				content: [{"type": "text", "text": `What's in this image? ${imageUrl}`}],

			});
		}
	}
}
