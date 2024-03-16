import path from "path";
import { execa } from "execa";
import { expect, test } from "vitest";
import scenario from "./parameters/index.js";

const command = "vale";
const args = [
	"--output=line",
	"--sort",
	"--normalize",
	"--relative",
	"test.md"
]
const fixturesDirectory = "fixtures";

function trimEveryLine(multiline) {
	return multiline.trim().split(/\r?\n/)
		.map(line => line.trim())
		.join("\n");
}

test.each(scenario)(`Test: %s`, async (rule, expected) => {
	let result;
	try {
		const cwd = path.resolve(process.cwd(), fixturesDirectory, rule);
		const output = await execa(command, args, { cwd: cwd });
		result = output.stdout;
	} catch (error) {
		result = error.stdout;
	}

	expect.soft(trimEveryLine(result)).toBe(trimEveryLine(expected));
});
