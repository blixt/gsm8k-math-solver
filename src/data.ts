import { readFileSync } from "node:fs";

export interface QA {
	question: string;
	answer: string;
}

function parseLine(line: string): QA {
	return JSON.parse(line);
}

// Load the test data, one question/answer pair as JSON per line.
export const testData = readFileSync("gsm8k/grade_school_math/data/test.jsonl", "utf8")
	.trim()
	.split("\n")
	.map(parseLine);

export const trainData = readFileSync("gsm8k/grade_school_math/data/train.jsonl", "utf8")
	.trim()
	.split("\n")
	.map(parseLine);
