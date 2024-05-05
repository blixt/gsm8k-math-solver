import { readFileSync } from "node:fs";

export interface TestPair {
	question: string;
	answer: string;
}

function parseTestLine(line: string): { question: string; answer: string } {
	return JSON.parse(line);
}

// Load the test data, one question/answer pair as JSON per line.
export const testData = readFileSync("gsm8k/grade_school_math/data/test.jsonl", "utf8")
	.trim()
	.split("\n")
	.map(parseTestLine);
