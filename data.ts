import { readFileSync } from "node:fs";

export interface TestPair {
	question: string;
	answer: string;
}

function parseTestLine(line: string): { question: string; answer: string } {
	return JSON.parse(line);
}

// Load the test data, one question/answer pair as JSON per line.
const testData = readFileSync("gsm8k/grade_school_math/data/test.jsonl", "utf8").trim().split("\n").map(parseTestLine);

export function getTestPair(i: number): TestPair {
	return testData[i];
}

export function getRandomTestPair(): [number, TestPair] {
	const i = Math.floor(Math.random() * testData.length);
	return [i, testData[i]];
}
