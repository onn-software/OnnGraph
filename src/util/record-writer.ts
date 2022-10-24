import fs, { WriteStream } from "fs";

export const csvWriter: (
  writeStream: fs.WriteStream,
  filename: string,
  imports: string[],
  separator: string
) => Promise<unknown> = async (writeStream, filename, imports, separator) => {
  await safeWrite(writeStream, [filename, ...imports].join(separator));
};

const safeWrite: (writeStream: WriteStream, chunk: string) => Promise<any> = (
  writeStream,
  chunk
) => {
  return new Promise((resolve, reject) => {
    writeStream.write(chunk + "\n", (e) => (e ? reject(e) : resolve(chunk)));
  });
};
