import * as fs from "fs";
import { LineReader } from "./line-reader";

export interface ImportAnalyzerOptions {
  exclusions?: RegExp[];
  inclusions?: RegExp[];
}

export const importAnalyzer: (
  readStream: fs.ReadStream,
  lineReader: LineReader,
  options: ImportAnalyzerOptions
) => Promise<string[]> = async (readStream, lineReader, options) => {
  const res: string[] = [];
  await lineReader.readLineByLine(readStream, 50, async (line) => {
    if (options.exclusions.filter((r) => r.test(line)).length > 0) {
      return;
    }

    if (options.inclusions.filter((r) => r.test(line)).length <= 0) {
      return;
    }

    res.push(line);
  });

  return res;
};
