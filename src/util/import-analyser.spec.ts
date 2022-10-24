import fs from "fs";
import { importAnalyzer } from "./import-analyser";
import { LineReader } from "./line-reader";

describe("importAnalyzer", () => {
  it("analyses all lines in a file", async () => {
    const sourceFile = `${process.cwd()}/__stubs__/java/folderA/FileA1.java`;

    const readStream = fs.createReadStream(sourceFile);
    const actual = await importAnalyzer(readStream, new LineReader(), {
      inclusions: [new RegExp("^import")],
      exclusions: [new RegExp("package")],
    });

    expect(actual).toEqual(["import java.folderA.FileA2;"]);
  });
});
