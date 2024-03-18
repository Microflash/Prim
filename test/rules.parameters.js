import fs from "fs";
import path from "path";

function* walkSync(dir) {
	const files = fs.readdirSync(dir, { withFileTypes: true });
	for (const file of files) {
		if (file.isDirectory()) {
			yield* walkSync(path.join(dir, file.name));
		} else {
			yield path.join(dir, file.name);
		}
	}
}

const dir = path.resolve(process.cwd(), "test", "expectations");
const extension = ".log";
const parameters = [];

for (const filePath of walkSync(dir)) {
  if (path.extname(filePath).toLowerCase() === extension) {
		const fileName = path.basename(filePath).replace(extension, "");
		const fileContent = fs.readFileSync(filePath).toString().trim();
		parameters.push([fileName, fileContent]);
	}
}

export default parameters;
