export interface Message {
	role: "user" | "assistant";
	content: string;
}

export interface IncompleteChatStreamChunk {
	done: false;

	model: string;
	created_at: string;
	message: Message;
}

export interface CompleteChatStreamChunk {
	done: true;

	model: string;
	created_at: string;
	message: Message;
	total_duration: number;
	load_duration: number;
	prompt_eval_duration: number;
	eval_count: number;
	eval_duration: number;
}

export type ChatStreamChunk = IncompleteChatStreamChunk | CompleteChatStreamChunk;

// This should probably just be an array of byte arrays with an index pointer
// into the first byte array, where all consumed arrays are removed.
class JSONLineStream<T> implements AsyncIterable<T> {
	private buffer = "";
	private index = 0;

	append(chunk: Uint8Array): void {
		this.buffer += new TextDecoder().decode(chunk);
	}

	async *[Symbol.asyncIterator](): AsyncGenerator<T> {
		while (true) {
			const newlineIndex = this.buffer.indexOf("\n", this.index);
			if (newlineIndex === -1) break;
			const line = this.buffer.slice(this.index, newlineIndex);
			this.index = newlineIndex + 1;
			yield JSON.parse(line) as T;
		}
	}
}

export async function* chat(model: string, messages: Message[]): AsyncGenerator<ChatStreamChunk> {
	const response = await fetch("http://localhost:11434/api/chat", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			model,
			messages,
		}),
	});
	if (!response.ok) {
		throw new Error(`Unexpected ${response.status} ${response.statusText}`);
	}
	if (!response.body) {
		throw new Error("No response body");
	}
	// Simulate a chunk if we gave the assistant initial content.
	const lastMessage = messages[messages.length - 1];
	if (lastMessage?.role === "assistant" && lastMessage.content !== "") {
		yield { model, created_at: new Date().toISOString(), message: { ...lastMessage }, done: false };
	}
	// Read the response body line by line, parsing each line as JSON.
	const stream = new JSONLineStream<ChatStreamChunk>();
	for await (const chunk of response.body) {
		stream.append(chunk);
		yield* stream;
	}
}
