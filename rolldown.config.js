// @ts-check
import { defineConfig } from "rolldown";

// oxlint-disable-next-line import/no-default-export
export default defineConfig({
    input: "src/index.ts",
    output: {
        comments: false,
        minify: {
            compress: {
                dropLabels: ["DEBUG"],
            },
        },
        topLevelVar: true,
    },
});
