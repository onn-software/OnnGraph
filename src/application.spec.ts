import { application } from "./application";
import { JavaEngine } from "./engines/java.engine";
import fs from "fs";

describe("application", () => {
  it("converts stub to output", async () => {
    const cwd = process.cwd();

    await application(
      `${cwd}/__stubs__/java`,
      [new RegExp("java")],
      [new RegExp("^package")],
      new JavaEngine(true),
      `${cwd}/__stubs__/output/test.csv`,
      ","
    );

    const expected = [
      "",
      "File1,File2.java",
      "File2,FileA1.folderA.java,FileA2.folderA.java",
      "FileA1.folderA,FileA2.folderA.java",
      "FileA2.folderA,File1.java",
    ];

    const actual = fs
      .readFileSync(`${cwd}/__stubs__/output/test.csv`)
      .toString()
      .split("\n");

    expect(actual.sort()).toEqual(expected);
  });
});
