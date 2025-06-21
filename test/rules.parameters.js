import fs from "fs";
import path from "path";

const testDirectory = "test";
const fixturesDirectory = "fixtures";

const fixturesRoot = path.resolve(process.cwd(), testDirectory, fixturesDirectory);
const parameters = fs.readdirSync(fixturesRoot, {
	withFileTypes: false,
	recursive: false
})
.filter(fpath => !(/(^|\/)\.[^\/\.]/g).test(fpath))
.map(fpath => path.basename(fpath));

export {
	parameters as default,
	testDirectory,
	fixturesDirectory
};
