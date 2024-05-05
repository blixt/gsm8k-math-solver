import { writeFileSync } from "node:fs";
import { createPrompt } from "./prompt.js";
import { chat } from "./chat.js";
import { testData } from "./data.js";
import chalk from "chalk";

chalk.level = 3;

function* inputs(): IterableIterator<{ question: string; answer?: string }> {
	// Allow a custom question to be passed as an argument. Example:
	// node index.js "How many words does this prompt contain?"
	const question = process.argv[2];
	if (question) {
		yield { question };
		return;
	}

	// yield testData[680]; // Question 1 from README
	// yield testData[1103]; // Question 2 from README
	// yield testData[1176]; // Question 3 from README
	// return;

	// Create a shuffled list of all indices so that all tests are seen only
	// once, but in a random order.
	const allIndices = Array.from(testData.keys());
	for (let i = allIndices.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[allIndices[i], allIndices[j]] = [allIndices[j], allIndices[i]];
	}
	for (const testIndex of allIndices) {
		yield testData[testIndex];
	}
}

async function main() {
	// Keep asking random questions until process exits.
	for (const { question, answer } of inputs()) {
		const prompt = createPrompt(question);

		console.log(chalk.magenta(question));
		console.log(chalk.gray("---"));

		const before = performance.now();
		for await (const chunk of chat("llama3:70b", [{ role: "user", content: prompt }])) {
			if (chunk.done) {
				// Write debug.txt where you can see the exact prompt and response.
				const debugData = `${prompt}\n\n${JSON.stringify(chunk, null, 2)}`;
				writeFileSync("debug.txt", debugData);
				break;
			}
			process.stdout.write(chalk.cyan(chunk.message.content));
		}
		const chatDuration = performance.now() - before;

		console.log("");

		if (answer) {
			console.log(chalk.gray("---"));
			console.log(chalk.green(answer));
		}

		console.log(chalk.gray("---"));
		console.log(chalk.gray(`Done after ${chalk.yellow(`${(chatDuration / 1000).toFixed(2)}s`)}.`));
		console.log("");
	}
}

// Kick off the main function.
main();
