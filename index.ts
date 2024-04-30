import { writeFileSync } from "node:fs";
import { createPrompt } from "./prompt";
import { chat } from "./chat";
import { testData } from "./data";

function* testIndices(): IterableIterator<number> {
	// yield 680; // Question 1 from README
	// yield 1103; // Question 2 from README
	// yield 1176; // Question 3 from README
	// return;

	// Create a shuffled list of all indices so that all tests are seen only
	// once, but in a random order.
	const allIndices = Array.from(testData.keys());
	for (let i = allIndices.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[allIndices[i], allIndices[j]] = [allIndices[j], allIndices[i]];
	}
	yield* allIndices;
}

async function main() {
	// Keep asking random questions until process exits.
	for (const testIndex of testIndices()) {
		console.log("--- WAITING 3 SECONDS... ---");
		await new Promise((resolve) => setTimeout(resolve, 3000));

		const { question, answer } = testData[testIndex];
		console.log(`(${testIndex})`, question);

		const prompt = createPrompt(question);

		console.log("---\nGENERATING RESPONSE");
		const before = performance.now();
		const response = await chat("llama3:70b", [{ role: "user", content: prompt }]);
		const chatDuration = performance.now() - before;
		console.log(response.message.content);

		console.log("---\nEXPECTED ANSWER:\n");
		console.log(answer);

		console.log(`\n--- TIME: ${(chatDuration / 1000).toFixed(2)}s ---\n\n`);

		// Write debug.txt where you can see the exact prompt and response.
		const debugData = `${prompt}\n\n${JSON.stringify(response, null, 2)}`;
		writeFileSync("debug.txt", debugData);
	}
}

// Kick off the main function.
main();
