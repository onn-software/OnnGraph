import * as fs from "fs";
import * as path from "path";

export const dirAnalyzer: (pwd: string) => Promise<string[]> = async (
  pwd: string
) => {
  let res: string[] = [];
  const content = fs.readdirSync(pwd, { withFileTypes: true });
  for (let i = 0; i < content.length; i++) {
    const fullPath = path.join(pwd, content[i].name);
    if (content[i].isDirectory()) {
      res.push(...(await dirAnalyzer(fullPath)));
    } else {
      res.push(fullPath);
    }
  }

  return res;
};
