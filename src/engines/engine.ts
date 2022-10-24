export interface Engine {
  mapFilename: (filename: string) => string;
  mapImports: (imp: string[]) => string[];
}
