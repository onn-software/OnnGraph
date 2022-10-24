import { dirAnalyzer } from "./util/dir-analyser";
import { importAnalyzer } from "./util/import-analyser";
import fs from "fs";
import { LineReader } from "./util/line-reader";
import { Engine } from "./engines/engine";
import { csvWriter } from "./util/record-writer";

export const application = async (
  directory: string,
  inclusions: RegExp[] = [],
  exclusions: RegExp[] = [],
  engine: Engine,
  outFile: string,
  separator: string
) => {
  const writeStream = fs.createWriteStream(outFile);
  const files = await dirAnalyzer(directory);

  try {
    await Promise.all(
      files.map(async (f) => {
        const readStream = fs.createReadStream(f);
        const filename = engine.mapFilename(f.replace(directory, ""));
        const imports = await importAnalyzer(readStream, new LineReader(), {
          inclusions: inclusions,
          exclusions: exclusions,
        });

        await csvWriter(
          writeStream,
          filename,
          engine.mapImports(imports),
          separator
        );
      })
    );
  } finally {
    writeStream.close();
  }
};
