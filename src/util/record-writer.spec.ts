import { csvWriter } from "./record-writer";

describe("csvWriter", () => {
  it("writes chunk to stream", (done) => {
    const writeFn = jest.fn();

    csvWriter(
      { write: writeFn } as any,
      "TEST_FILENAME",
      ["TEST_IMPORT_1", "TEST_IMPORT_2"],
      "-+-"
    ).then(() => done());

    expect(writeFn.mock.calls[0][0]).toEqual(
      "TEST_FILENAME-+-TEST_IMPORT_1-+-TEST_IMPORT_2\n"
    );
    writeFn.mock.calls[0][1]();
  });

  it("throws error when stream errors", (done) => {
    const writeFn = jest.fn();

    csvWriter(
      { write: writeFn } as any,
      "TEST_FILENAME",
      ["TEST_IMPORT_1", "TEST_IMPORT_2"],
      "-+-"
    ).catch((e) => {
      expect(e).toEqual("TEST_ERROR");
      done();
    });

    expect(writeFn.mock.calls[0][0]).toEqual(
      "TEST_FILENAME-+-TEST_IMPORT_1-+-TEST_IMPORT_2\n"
    );
    writeFn.mock.calls[0][1]("TEST_ERROR");
  });
});
