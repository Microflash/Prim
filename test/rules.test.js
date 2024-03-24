import path from "path";
import { execa } from "execa";
import { expect, it } from "vitest";
import scenario, { testDirectory, fixturesDirectory } from "./rules.parameters.js";

const command = "vale";
const args = [
	"--output=line",
	"--sort",
	"--normalize",
	"--relative",
	"test.md"
]
const snapshotsDirectory = "snapshots";

it.each(scenario)(`Test: %s`, async (rule) => {
	let result;
	try {
		const fixtureLocation = path.resolve(process.cwd(), testDirectory, fixturesDirectory, rule);
		const output = await execa(command, args, { cwd: fixtureLocation });
		result = output.stdout;
	} catch (error) {
		result = error.stdout;
	}

	const snapshotFile = path.resolve(process.cwd(), testDirectory, snapshotsDirectory, `${rule}.log`);
	await expect(result).toMatchFileSnapshot(snapshotFile);
});
