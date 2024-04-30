import type { Message } from "./chat";

const exampleSessions: Message[][] = [
	[
		{
			role: "user",
			content:
				"Natalia sold clips to 48 of her friends in April, and then she sold half as many clips in May. How many clips did Natalia sell altogether in April and May?",
		},
		{
			role: "assistant",
			content: [
				"```",
				"const clipsInApril = 48 // (1) 48",
				"const clipsInMay = clipsInApril / 2 // (2) 24",
				"const totalClips = clipsInApril + clipsInMay // (3) 72",
				'console.log(`Natalia sold ${totalClips} clips altogether in April and May.`) // (4) "Natalia sold 72 clips altogether in April and May."',
				"```",
			].join("\n"),
		},
	],
	[
		{
			role: "user",
			content:
				"Alison qualified for a spot on the running team, so she went shopping for some athletic gear. She bought a tank top for $10, a pair of running shorts for $5 more than the top cost, and a pair of tennis shoes that were originally $48 but were on sale for half price. She had a coupon for $2 off the package of $8 athletic socks that she also bought. How much did she spend on athletic gear?",
		},
		{
			role: "assistant",
			content: [
				"```",
				"const tankTopCost = 10 // (1) 10",
				"const shortsCost = tankTopCost + 5 // (2) 15",
				"let shoesPrice = 48 // (3) 48",
				"shoesPrice /= 2 // (4) 24",
				"let socksPrice = 8 // (5) 8",
				"const socksDiscount = 2 // (6) 2",
				"socksPrice -= socksDiscount // (7) 6",
				"let totalCost = tankTopCost // (8) 10",
				"totalCost += shortsCost // (9) 25",
				"totalCost += shoesPrice // (10) 49",
				"totalCost += socksPrice // (11) 55",
				'console.log(`Alison spent $${totalCost} on athletic gear.`) // (12) "Alison spent $55 on athletic gear."',
				"```",
			].join("\n"),
		},
	],
	[
		{
			role: "user",
			content:
				"Lee rears only sheep and geese on his farm.  If the total number of animal legs is 70, and the total number of animal heads is 20, how many sheep live on Lee's farm?",
		},
		{
			role: "assistant",
			content: [
				"```",
				"let sheep = 0; // (1) 0",
				"while (sheep <= 20) { // (2) 0 <= 20 === true",
				"    const geese = 20 - sheep; // (3) 20 - 0 === 20",
				"    const sheepLegs = sheep * 4; // (4) 0 * 4 === 0",
				"    const geeseLegs = geese * 2; // (5) 20 * 2 === 40",
				"    const totalLegs = sheepLegs + geeseLegs; // (6) 0 + 40 === 40",
				"    if (totalLegs === 70) { // (7) 40 === 70 === false",
				"        break; // (8) no break",
				"    }",
				"    sheep++; // (9) 0 + 1 === 1",
				"}",
				"// Loop continues:",
				"// (2) 1 <= 20 === true",
				"// (3) 20 - 1 === 19",
				"// (4) 1 * 4 === 4",
				"// (5) 19 * 2 === 38",
				"// (6) 4 + 38 === 42",
				"// (7) 42 === 70 === false",
				"// (8) no break",
				"// (9) 1 + 1 === 2",
				"// (...)",
				"// Loop continues:",
				"// (2) 15 <= 20 === true",
				"// (3) 20 - 15 === 5",
				"// (4) 15 * 4 === 60",
				"// (5) 5 * 2 === 10",
				"// (6) 60 + 10 === 70",
				"// (7) 70 === 70 === true",
				"// (8) break",
				'console.log(`There are ${sheep} sheep.`); // (10) "There are 15 sheep."',
				"```",
			].join("\n"),
		},
	],
];
const intro =
	"Respond to all my messages with JavaScript where you analyze my message, then extract any relevant variable values from my text (if any), perform any necessary compute on aforementioned variables whenever that is required to produce an answer, with a comment next to each statement that represents what would happen (and in what order) if the code was evaluated. The code should always finish with a `console.log(…)` call where the argument is a string of your final answer. Please read the rules below for additional details.";

const environmentRules = [
	"All variables defined throughout the conversation are available at any point",
	"It's possible to define a variable with the same name twice, it will just shadow the old one",
	"Imagine this JavaScript as running a notebook so prefer concise direct code over abstractions",
	"DO NOT USE functions or loops unless they are required to solve the problem",
	"You cannot use imports",
	"All modern browser APIs are available without any security restrictions",
	"There is no build step or external files",
];

const outputRules = [
	"Write your responses entirely within a single code block, DO NOT write anything before or after the code block",
	"Write the JavaScript logic that generates the correct output without any comments or empty lines",
	"Decompose your logic into multiple statements and lines to avoid a lot of complexity in a single statement of code",
	"IMPORTANT: Do not jump to conclusions where you bypass multiple calculations, try to do only one calculation at a time",
	"After each statement, write the execution step number in parentheses, followed by the resulting value of the statement",
	'IMPORTANT: For loops, write a chain of comments (starting with "// Loop continues:") describing how the values change over each loop iteration',
	"When possible, try to skip loop iterations in your comments, instead inferring what the values would become",
];

export function createPrompt(message: string): string {
	return `${intro}


# Environment rules

${environmentRules.map((rule) => `- ${rule}`).join("\n")}


# Output rules

${outputRules.map((rule) => `- ${rule}`).join("\n")}


# Example sessions (as JSON, one per line)

${exampleSessions.map((session) => JSON.stringify(session)).join("\n")}


# Message to be answered

${message}`;
}
