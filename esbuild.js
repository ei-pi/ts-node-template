// @ts-check
import esbuild from "esbuild";

await esbuild.build({
    bundle: true,
    minify: false,
    outdir: "./dist",
    platform: "node",
    packages: "external",
    dropLabels: ["DEBUG"],
    entryNames: "[name]",
    sourcemap: "linked",
    logLevel: "info",
    format: "esm",
    entryPoints: ["src/index.ts"]
});
