import type { Message } from "./chat.js";

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
				"answer(totalClips) // [4] 72",
				"```",
			].join("\n"),
		},
	],
	[
		{
			role: "user",
			content:
				"In a fruit salad, there are raspberries, green grapes, and red grapes. There are seven more than 3 times the number of red grapes as green grapes. There are 5 less raspberries than green grapes. If there are 102 pieces of fruit in the salad, how many red grapes are in the salad?",
		},
		{
			role: "assistant",
			content: [
				"```",
				"const numRedGrapes = (greenGrapes) => greenGrapes * 3 + 7; // [1] n/a",
				"const numRaspberries = (greenGrapes) => greenGrapes - 5; // [2] n/a",
				"const numFruitPieces = (greenGrapes) => greenGrapes + numRedGrapes(greenGrapes) + numRaspberries(greenGrapes); // [3] n/a",
				"// Thought: greenGrapes + greenGrapes * 3 + 7 + greenGrapes - 5 + greenGrapes === 102",
				"// Simplify: greenGrapes * 5 + (7 - 5) === 102",
				"// Simplify: greenGrapes * 5 === 102 - (7 - 5) === 102 - 2 === 100",
				"const greenGrapes = 100 / 5; // [4] 100 / 5 === 20",
				"expect(numFruitPieces(greenGrapes)).toEqual(102); // [5] ok",
				"answer(numRedGrapes(greenGrapes)); // [6] 20 * 3 + 7 === 67",
				"```",
			].join("\n"),
		},
	],
	[
		{
			role: "user",
			content:
				"Gary counted the number of whiskers on the faces of his two cats.  Princess Puff has 14 whiskers, while Catman Do has 6 less than twice the number of whiskers as Princess puff.  How many whiskers does Catman Do have?",
		},
		{
			role: "assistant",
			content: [
				"```",
				"const princessPuffWhiskers = 14 // [1] 14",
				"const catmanDoWhiskers = 2 * princessPuffWhiskers - 6 // [2] 2 * 14 - 6 === 22",
				"answer(catmanDoWhiskers) // [3] 22",
				"```",
			].join("\n"),
		},
	],
	[
		{
			role: "user",
			content:
				"Mikaela earns $10 an hour  tutoring. For the first month, she tutored for 35 hours and in the second month, she tutored 5 hours more than the first month. She spent 4/5 of her total earnings on her personal needs and saved the rest of the money. How much did she save?",
		},
		{
			role: "assistant",
			content: [
				"```",
				"const hourlyWage = 10 // [1] 10",
				"const hoursTutoredInFirstMonth = 35 // [2] 35",
				"const hoursTutoredInSecondMonth = hoursTutoredInFirstMonth + 5 // [3] 35 + 5 === 40",
				"const totalHoursTutored = hoursTutoredInFirstMonth + hoursTutoredInSecondMonth // [4] 35 + 40 === 75",
				"const totalEarnings = totalHoursTutored * hourlyWage // [5] 75 * 10 === 750",
				"const amountSpent = (4 / 5) * totalEarnings // [6] (4 / 5) * 750 === 600",
				"const amountSaved = totalEarnings - amountSpent // [7] 750 - 600 === 150",
				"answer(amountSaved); // [8] 150",
				"```",
			].join("\n"),
		},
	],
	[
		{
			role: "user",
			content:
				"Woody wants to buy a games console that costs $282. Woody already has $42 and receives an allowance of $24 every week. How many weeks will it take him to save the money he needs for the game console?",
		},
		{
			role: "assistant",
			content: [
				"```",
				"const costOfConsole = 282; // [1] 282",
				"const initialMoney = 42; // [2] 42",
				"const weeklyAllowance = 24; // [3] 24",
				"const moneyMissing = costOfConsole - initialMoney; // [4] 282 - 42 === 240",
				"const weeksNeeded = moneyMissing / weeklyAllowance; // [5] 240 / 24 === 10",
				"answer(weeksNeeded); // [6] 10",
				"```",
			].join("\n"),
		},
	],
	[
		{
			role: "user",
			content:
				"James buys 200 lotto tickets for 2 dollars each.  Of those tickets 20% are winners.  80% of the winners are for 5 dollars. 1 ticket is the grand prize of $5,000.  The other tickets win an average of $10.  How much did he profit?",
		},
		{
			role: "assistant",
			content: [
				"```",
				"const totalSpent = 200 * 2; // [1] 200 * 2 === 400",
				"const winners = 0.20 * 200; // [2] 0.20 * 200 === 40",
				"const fiveDollarWinners = 0.80 * winners; // [3] 0.80 * 40 === 32",
				"const fiveThousandWinner = 1; // [4] 1",
				"const tenDollarWinners = winners - fiveDollarWinners - fiveThousandWinner; // [5] 40 - 32 - 1 === 7",
				"let totalWon = (fiveDollarWinners * 5) // [6] (32 * 5) === 160",
				"totalWon += tenDollarWinners * 10 // [7] 160 + (7 * 10) === 160 + 70 === 230",
				"totalWon += fiveThousandWinner * 5000 // [8] 230 + 1 * 5000 === 230 + 5000 === 5230",
				"const profit = totalWon - totalSpent; // [9] 5230 - 400 === 4830",
				"answer(profit); // [10] 4830",
				"```",
			].join("\n"),
		},
	],
	[
		{
			role: "user",
			content:
				"Blake bought 4  lollipops and 6 packs of chocolate. If each lollipop costs $2 and a pack of chocolate costs the same as four lollipops, how much change will Blake get back if he gave the cashier 6 $10 bills?",
		},
		{
			role: "assistant",
			content: [
				"```",
				"const lollipops = 4; // [1] 4",
				"const packsOfChocolate = 6; // [2] 6",
				"const costPerLollipop = 2; // [3] 2",
				"const costPerPackOfChocolate = 4 * costPerLollipop; // [4] 4 * 2 === 8",
				"const totalCost = lollipops * costPerLollipop + packsOfChocolate * costPerPackOfChocolate; // [5] 4 * 2 + 6 * 8 === 8 + 48 === 56",
				"const totalPaid = 6 * 10; // [6] 6 * 10 === 60",
				"const change = totalPaid - totalCost; // [7] 60 - 56 === 4",
				"answer(change); // [8] 4",
				"```",
			].join("\n"),
		},
	],
	[
		{
			role: "user",
			content:
				"Jackson wants to improve his endurance running. His goal is to start by running 3 miles a day the first week, then spend the next four weeks running one additional mile/day each week. How many miles is Jackson running each day at the end of this exercise program?",
		},
		{
			role: "assistant",
			content: [
				"```",
				"let milesPerDay = 3; // [1] 3",
				"for (let i = 0; i < 4; i++) { // [2] i = 0, 1, 2, 3",
				"	milesPerDay++; // [3] 3 + 1 === 4, 4 + 1 === 5, 5 + 1 === 6, 6 + 1 === 7",
				"}",
				"answer(milesPerDay); // [4] 7",
				"```",
			].join("\n"),
		},
	],
	[
		{
			role: "user",
			content:
				"Hector purchased a container of gumballs.  He gave 4 to Todd, then he gave twice as many as he had given Todd to Alisha, and then he gave 5 less than four times as many to Bobby as he had given to Alisha.  If Hector had 6 gumballs remaining, what is the total number of gumballs that Hector purchased?",
		},
		{
			role: "assistant",
			content: [
				"```",
				"const gumballsGivenToTodd = 4; // [1] 4",
				"const gumballsGivenToAlisha = gumballsGivenToTodd * 2; // [2] 4 * 2 === 8",
				"const gumballsGivenToBobby = gumballsGivenToAlisha * 4 - 5; // [3] 8 * 4 = 5 === 32 - 5 === 27",
				"const gumballsRemaining = 6 // [4] 6",
				"const gumballsPurchased = gumballsGivenToTodd + gumballsGivenToAlisha + gumballsGivenToBobby + gumballsRemaining; // [5] 4 + 8 + 27 + 6 === 12 + 33 === 45",
				"answer(gumballsPurchased); // [6] 45",
				"```",
			].join("\n"),
		},
	],
	[
		{
			role: "user",
			content:
				"Karina was born in 1970 and she is currently twice as old as her brother. If her current age is 40, in what year was her brother born?",
		},
		{
			role: "assistant",
			content: [
				"```",
				"const karinaBirthYear = 1970; // [1] 1970",
				"const karinaAge = 40; // [2] 40",
				"const brotherAge = karinaAge / 2; // [3] 40 / 2 === 20",
				"const ageDifference = karinaAge - brotherAge; // [4] 40 - 20 === 20",
				"const brotherBirthYear = karinaBirthYear + ageDifference; // [5] 1970 + 20 === 1990",
				"answer(brotherBirthYear); // [6] 1990",
				"```",
			].join("\n"),
		},
	],
	[
		{
			role: "user",
			content: 'What\'s the first word of the following sentence in German? Sentence: "Hello World!"',
		},
		{
			role: "assistant",
			content: [
				"```",
				'const sentence = "Hello World!"; // [1] "Hello World!"',
				'const sentenceInGerman = "Hallo Welt!"; // [2] "Hallo Welt!"',
				'const firstWord = sentenceInGerman.split(" ")[0]; // [3] "Hallo"',
				'answer(firstWord); // [4] "Hallo"',
				"```",
			].join("\n"),
		},
	],
];

export function createPrompt(message: string, shots?: number): string {
	return `Answer the message below using ONLY JavaScript in a code block, following the rules and examples below VERY CAREFULLY.


# Rules to follow

${[
	"Write your responses entirely within a single code block, DO NOT write anything before or after the code block",
	"You must not write the answer without first writing the code that calculates the answer, and the answer should only be provided as a call to `answer(…)`",
	"Analyze the message and extract any relevant variable values (such as numbers, strings, booleans, lists, or the text itself)",
	"Make the JavaScript perform any necessary computations on aforementioned variables whenever that is required to produce the correct answer",
	"The JavaScript must be valid and executable, you cannot use placeholders or introduce syntax errors",
	"Each JavaScript statement should end with a comment with the execution step in brackets and what would happen if the code was evaluated",
	"The comments after each statement must not be empty, see the examples for exact format",
	"The code block should always end with a call to a globally available function `answer(…)` where the argument is your final answer",
	"Imagine this JavaScript as running a notebook so prefer concise direct code over abstractions",
	"Write the JavaScript logic that generates the correct output without any unnecessary comments or empty lines",
	"You cannot use imports and the only globals available to you are common browser APIs, `answer` (takes your final answer), and `expect` (from Jest)",
	"Avoid using functions or loops unless they are required to solve the problem",
	"Decompose your logic into multiple statements and lines to avoid a lot of complexity in a single statement of code",
	"Don't perform too many evaluations or arithmetic on one line, instead split it up into multiple statements",
	"Do not jump to conclusions where you bypass a calculation or infer a value, try to do only one calculation at a time",
	'When values must be inferred, write a "// Thought:" comment followed with your thought process to infer the value',
	'For more complicated thought comments, follow up with one or more "// Simplify:" comments to distill the thought',
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
