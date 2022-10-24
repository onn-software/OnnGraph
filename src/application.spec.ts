import { application } from "./application";
import { JavaEngine } from "./engines/java.engine";

describe("application", () => {
  it("converts stub to output", async () => {
    const cwd = process.cwd();
    const actual = await application(
      `${cwd}/__stubs__/java`,
      [new RegExp("package")],
      [],
      new JavaEngine(true),
      `${cwd}/__stubs__/output/test.csv`,
      ","
    );
    expect(actual).toEqual("");
  });
});
