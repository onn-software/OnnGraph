import * as fs from 'fs';
import LineByLineReader = require('line-by-line');

export class LineReader {
    readLineByLine(readStream: fs.ReadStream, batchSize: number, onLine: (line: string) => Promise<void>) {
        const lblr = new LineByLineReader(readStream);

        const handle: {
            resolve?: any;
            reject?: any;
        } = {};

        const res = new Promise((resolve, reject) => {
            handle.resolve = resolve;
            handle.reject = reject;
        });

        let runningLines = 0;
        let endReached = false;
        lblr.on('line', line => {
            runningLines++;
            if (runningLines >= batchSize) {
                lblr.pause();
            }
            onLine(line)
                .then(() => {
                    runningLines--;
                    if (runningLines <= 0) {
                        if (endReached) {
                            handle.resolve(true);
                        } else {
                            lblr.resume();
                        }
                    }
                })
                .catch(e => {
                    console.log(`Error in line: ` + line);
                    LineReader.handleLineReadError(e, handle.reject, lblr);
                });
        });

        lblr.on('error', e => {
            LineReader.handleLineReadError(e, handle.reject, lblr);
        });

        lblr.on('end', () => {
            endReached = true;
            if (runningLines <= 0) {
                handle.resolve(true);
            }
        });

        return res;
    }

    private static handleLineReadError(e: Error, reject: any, lblr: LineByLineReader) {
        console.log(e);
        reject(e);
        lblr.close();
    }
}
