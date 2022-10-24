import { JavaEngine } from "./java.engine";

describe("JavaEngine", () => {
  it("maps the filename", async () => {
    expect(new JavaEngine(false).mapFilename("/File1.java")).toEqual("File1");
    expect(new JavaEngine(true).mapFilename("/folderA/FileA2.java")).toEqual(
      "FileA2.folderA"
    );
  });
  it("maps the import", async () => {
    expect(
      new JavaEngine(false).mapImports(["import xxx.package.folder.FileA2;"])
    ).toEqual(["xxx.package.folder.FileA2"]);
    expect(
      new JavaEngine(true).mapImports(["import xxx.package.folder.FileA2;"])
    ).toEqual(["FileA2.folder.package.xxx"]);
  });
});
