import fs from "fs"

import path from "path";
import {fileURLToPath} from "url"
import YAML from "yaml"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const openApiPath = path.join(__dirname, "../docs/openapi.yaml")

const openApiFile = fs.readFileSync(openApiPath, "utf8")

const openApiDocument = YAML.parse(openApiFile);


export default openApiDocument;