import { dirAnalyzer } from "./dir-analyser";

describe("dir-analyser", () => {
  it("return all as flat map", async () => {
    const cwd = process.cwd();
    const res = (await dirAnalyzer(`${cwd}/__stubs__/java`))
      .map((f) => f.replace(cwd, ""))
      .filter((f) => !f.includes(".DS_Store"));

    expect(res).toEqual([
      "/__stubs__/java/File1.java",
      "/__stubs__/java/File2.java",
      "/__stubs__/java/folderA/FileA1.java",
      "/__stubs__/java/folderA/FileA2.java",
    ]);
  });
});
