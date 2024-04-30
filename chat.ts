export interface Message {
	role: "user" | "assistant";
	content: string;
}

export interface ChatResponse {
	model: string;
	created_at: string;
	message: Message;
	done: boolean;
	total_duration: number;
	load_duration: number;
	prompt_eval_duration: number;
	eval_count: number;
	eval_duration: number;
}

export async function chat(model: string, messages: Message[]): Promise<ChatResponse> {
	// You need to have Ollama running.
	const response = await fetch("http://localhost:11434/api/chat", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			model,
			messages,
			stream: false,
		}),
	});
	const data = (await response.json()) as ChatResponse;
	return data;
}
