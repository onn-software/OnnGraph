import { Engine } from "./engine";

export class JavaEngine implements Engine {
  constructor(private reversed: boolean) {}

  mapFilename(filename: string): string {
    return this.reversal(
      filename.substring(1, filename.length - 5).replace(/\//gi, ".")
    );
  }

  mapImports(imp: string[]): string[] {
    return imp.map((i) =>
      this.reversal(i.replace("import ", "").replace(";", ""))
    );
  }

  reversal(text): string {
    return this.reversed ? text.split(".").reverse().join(".") : text;
  }
}
