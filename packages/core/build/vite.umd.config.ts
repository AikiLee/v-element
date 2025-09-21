import { defineConfig } from "vite";
import { readFile } from "fs";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import { delay,defer } from "lodash-es";
import shell from 'shelljs';

const TRY_MOVE_STYLES_DELAY = 750 as const;

function moveStyles() {
    readFile("./dist/umd/index.css.gz",(err) => {
        if(err) return delay(moveStyles,TRY_MOVE_STYLES_DELAY);
        defer(() => shell.cp("./dist/umd/index.css", "./dist/index.css"))
    })
}


export default defineConfig({
    plugins: [
        vue()
        
    ],
    build: {
        outDir: "dist/umd",
        lib: {
            entry: resolve(__dirname, "../index.ts"),
            // umd模式下必须要有name，作为模块的名称
            name: "vElementUI",
            fileName: (format) => `index.${format}.js`,
            formats: ["umd"],
        },
        rollupOptions: {
            external: ["vue"],
            output: {
                exports: "named",
                globals: {
                    vue: "Vue",
                },
                assetFileNames: (chunkInfo) => {
                    if (chunkInfo.name === "style.css") {
                        return "index.css";
                    }
                    return chunkInfo.name as string;
                },
            },
        },
    },
});
