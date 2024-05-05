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
				"const clipsInApril = 48 // [1] 48",
				"const clipsInMay = clipsInApril / 2 // [2] 48 / 2 === 24",
				"const totalClips = clipsInApril + clipsInMay // [3] 48 + 24 === 72",
				'console.log(`Natalia sold ${totalClips} clips altogether in April and May.`) // [4] "Natalia sold 72 clips altogether in April and May."',
				"```",
			].join("\n"),
		},
	],
	[
		// WARNING: This is from test data, not training data. Needs to be replaced!
		{
			role: "user",
			content:
				"Alison qualified for a spot on the running team, so she went shopping for some athletic gear. She bought a tank top for $10, a pair of running shorts for $5 more than the top cost, and a pair of tennis shoes that were originally $48 but were on sale for half price. She had a coupon for $2 off the package of $8 athletic socks that she also bought. How much did she spend on athletic gear?",
		},
		{
			role: "assistant",
			content: [
				"```",
				"const tankTopCost = 10 // [1] 10",
				"const shortsCost = tankTopCost + 5 // [2] 10 + 5 === 15",
				"let shoesPrice = 48 // [3] 48",
				"shoesPrice /= 2 // [4] 48 / 2 === 24",
				"let socksPrice = 8 // [5] 8",
				"const socksDiscount = 2 // [6] 2",
				"socksPrice -= socksDiscount // [7] 8 - 2 === 6",
				"let totalCost = tankTopCost // [8] 10",
				"totalCost += shortsCost // [9] 10 + 15 === 25",
				"totalCost += shoesPrice // [10] 25 + 24 === 49",
				"totalCost += socksPrice // [11] 49 + 6 === 55",
				'console.log(`Alison spent $${totalCost} on athletic gear.`) // [12] "Alison spent $55 on athletic gear."',
				"```",
			].join("\n"),
		},
	],
	[
		// WARNING: This is from test data, not training data. Needs to be replaced!
		{
			role: "user",
			content:
				"Lee rears only sheep and geese on his farm.  If the total number of animal legs is 70, and the total number of animal heads is 20, how many sheep live on Lee's farm?",
		},
		{
			role: "assistant",
			content: [
				"```",
				"let sheep = 0; // [1] 0",
				"while (sheep <= 20) { // [2] (0 <= 20) === true",
				"    const geese = 20 - sheep; // [3] 20 - 0 === 20",
				"    const sheepLegs = sheep * 4; // [4] 0 * 4 === 0",
				"    const geeseLegs = geese * 2; // [5] 20 * 2 === 40",
				"    const totalLegs = sheepLegs + geeseLegs; // [6] 0 + 40 === 40",
				"    if (totalLegs === 70) { // [7] (40 === 70) === false",
				"        break; // [8] n/a",
				"    }",
				"    sheep++; // [9] 0 + 1 === 1",
				"}",
				"// Loop continues:",
				"// [2] while (1 <= 20) === true",
				"// [3] geese = 20 - 1 === 19",
				"// [4] sheepLegs = 1 * 4 === 4",
				"// [5] geeseLegs = 19 * 2 === 38",
				"// [6] totalLegs = 4 + 38 === 42",
				"// [7] if (42 === 70) === false",
				"// [8] n/a",
				"// [9] sheep = 1 + 1 === 2",
				"// (...)",
				"// Loop continues:",
				"// [2] while (14 <= 20) === true",
				"// [3] geese = 20 - 14 === 6",
				"// [4] sheepLegs = 14 * 4 === 56",
				"// [5] geeseLegs = 6 * 2 === 12",
				"// [6] totalLegs = 56 + 12 === 68",
				"// [7] if (68 === 70) === false",
				"// [8] n/a",
				"// [9] sheep = 14 + 1 === 15",
				"// Loop continues:",
				"// [2] while (15 <= 20) === true",
				"// [3] geese = 20 - 15 === 5",
				"// [4] sheepLegs = 15 * 4 === 60",
				"// [5] geeseLegs = 5 * 2 === 10",
				"// [6] totalLegs = 60 + 10 === 70",
				"// [7] if (70 === 70) === true",
				"// [8] break",
				"// Loop ended.",
				"// [0] sheep = 15",
				'console.log(`There are ${sheep} sheep.`); // [10] "There are 15 sheep."',
				"```",
			].join("\n"),
		},
	],
];

export function createPrompt(message: string, shots?: number): string {
	return `Answer the message below using JavaScript in a code block, following the rules and examples below exactly.

# Rules to follow

${[
	"When writing the JavaScript, analyze the message and extract any relevant variable values (such as numbers, strings, booleans, lists, or the text itself)",
	"Make the JavaScript perform any necessary computations on aforementioned variables whenever that is required to produce the correct answer",
	"Each JavaScript statement should end with a comment that shows the execution order and value of the statement, to show what would happen if the code was evaluated",
	"The code should always end with a `console.log(…)` call where the argument is a string with your final answer",
	"Please read the rules below for additional details and see the examples for exact structure",
	"Imagine this JavaScript as running a notebook so prefer concise direct code over abstractions",
	"Write your responses entirely within a single code block, DO NOT write anything before or after the code block",
	"Write the JavaScript logic that generates the correct output without any comments or empty lines",
	"Do not infer values, instead be explicit about them",
	"You cannot use imports and there are no global variables or scoped values available to you outside of the code you write",
	"You may assume that all common browser APIs are available to you",
	"Avoid using functions or loops unless they are required to solve the problem",
	"Decompose your logic into multiple statements and lines to avoid a lot of complexity in a single statement of code",
	"Don't perform too many evaluations or arithmetic on one line, instead split it up into multiple statements",
	"IMPORTANT: Do not jump to conclusions where you bypass multiple calculations, try to do only one calculation at a time",
	"After each statement, write the execution step number in square brackets, followed by the resulting value of the statement",
	'IMPORTANT: After loop blocks that did not immediately break, write a chain of comments (starting with "// Loop continues:") describing how the values change over each loop iteration',
	'When possible, try to skip loop iterations in your comments (indicating it with "(...)"), instead inferring what the values would become, just don\'t omit the last iteration where the loop breaks',
]
	.map((rule) => `- ${rule}`)
	.join("\n")}


# Example sessions (as JSON, one per line)

${exampleSessions
	.slice(0, shots)
	.map((session) => JSON.stringify(session))
	.join("\n")}


# Message to be answered

${message}`;
}
