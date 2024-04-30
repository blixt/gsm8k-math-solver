import { writeFileSync } from "node:fs";
import { createPrompt } from "./prompt";
import { chat } from "./chat";
import { getRandomTestPair, getTestPair } from "./data";

async function main() {
	// Keep asking random questions until process exits.
	while (true) {
		console.log("---\nWAITING 3 SECONDS...\n---");
		await new Promise((resolve) => setTimeout(resolve, 3000));

		// In the future we should of course use the evaluation folder.
		const [i, { question, answer }] = getRandomTestPair();
		console.log(i, question);

		// A particularly tricky test case:
		// const { question, answer } = getTestPair(1176);
		// console.log(1176, question);

		const prompt = createPrompt(question);
		console.log("---\nGENERATING RESPONSE\n---");
		const response = await chat("llama3:70b", [{ role: "user", content: prompt }]);
		console.log(response.message.content);
		console.log("---\nEXPECTED ANSWER\n---");
		console.log(answer);
		console.log("---\n\n");
		const debugData = `${prompt}\n\n${JSON.stringify(response, null, 2)}`;
		writeFileSync("debug.txt", debugData);
	}
}

// Kick off the main function.
main();
