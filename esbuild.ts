import glob from "tiny-glob";
import { build } from "esbuild";

(async () => {
  const entryPoints = await glob("src/**/*.ts");

  await build({
    entryPoints,
    logLevel: "info",
    outdir: "dist",
    platform: "node",
    format: "cjs",
    sourcemap: true,
  });
})().catch((err) => {
  console.error({
    msg: "[ESBUILD]: Error building app",
    err,
  });
  process.exit(1);
});
