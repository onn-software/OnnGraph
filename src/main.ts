import { application } from "./application";
import { JavaEngine } from "./engines/java.engine";

const main = async () => {
  console.log(`main`);

  const cwd = process.cwd();
  await application(
    `${cwd}/__stubs__/java`,
    [new RegExp("package")],
    [],
    new JavaEngine(true),
    `${cwd}/__stubs__/output/test.csv`,
    ","
  );
};

main()
  .then(() => console.log(`Done`))
  .catch((e) => console.log("Exit with error", e));
