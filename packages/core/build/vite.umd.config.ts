import { defineConfig } from "vite";
import { readFile } from "fs";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import { delay,defer } from "lodash-es";
import shell from 'shelljs';
import  hooksPlugin from "../hooksPlugin";
import compression from "vite-plugin-compression";
import terser from "@rollup/plugin-terser";
import {visualizer} from "rollup-plugin-visualizer";

const TRY_MOVE_STYLES_DELAY = 750 as const;

const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "dev";
const isTest = process.env.NODE_ENV === "test";


function moveStyles() {
    readFile("./dist/umd/index.css.gz",(err) => {
        if(err) return delay(moveStyles,TRY_MOVE_STYLES_DELAY);
        defer(() => shell.cp("./dist/umd/index.css", "./dist/index.css"))
    })
}


export default defineConfig({
    plugins: [
        vue(),
        visualizer({
            open: true,
            filename: "dist/stats.umd.html",
        }),
        hooksPlugin({
            rmFiles: ["./dist/umd","./dist/index.css","./dist/stats.html","./dist/stats.umd.html"],
            afterBuild: moveStyles
        }),
        compression({
            filter: /.(cjs|css)$/i,
        }),
        terser({
            compress: {
                drop_console: ["log"],
                drop_debugger: true,
                passes: 3,
                global_defs: {
                    "@DEV": JSON.stringify(isDev),
                    "@TEST": JSON.stringify(isTest),
                    "@PROD": JSON.stringify(isProd),
                }
            }
        })
        
    ],
    build: {
        outDir: "dist/umd",
        lib: {
            entry: resolve(__dirname, "../index.ts"),
            // umd模式下必须要有name，作为模块的名称
            name: "vElementUI",
            fileName: "index",
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
