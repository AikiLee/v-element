import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { readdirSync, readdir } from "fs";
import shell from "shelljs";
import hooksPlugin from "../hooksPlugin";
import { defer, delay } from "lodash-es";
import { visualizer } from "rollup-plugin-visualizer";
import { fileURLToPath } from "url";
import terser from "@rollup/plugin-terser";
/* 
vite打包的流程：
生命周期：构建开始 ->  模块的解析与转换 -> 代码生成 -> 构建结束

1. 运行插件
    - hooksPlugin: 清理文件
    - vue: 将.vue文件拆分成html+css+js
    - dts: 处理类型文件
2. 处理和分割
根据build来执行代码的处理和分割
    - build.lib(core)
        - entry: 入口文件
        - fileName: 模块名称
        - formats: 打包格式
    - outDir: "dist/es", // 输出目录
    - minify: false,    // 
    - cssCodeSplit: true, // 拆分css
    - rollupOptions //core指定的配置项
        - rollupOptions.output.manualChunks(id) //代码分割，id 就是这个文件的绝对路径

3. 命名与输出
    - rollupOptions.output.assetFileNames: 处理资源文件的输出文件名
4. 收尾工作：压缩、移动和报告
    - terser
    - 写入磁盘
    - hooksPlugin
    - visualizer
*/

const TRY_MOVE_STYLES_DELAY = 750 as const;

/* 
分包实现逻辑：
1. 动态获取packages/components下的所有文件夹，并通过manualChunks进行分包
2. 对于特殊的文件夹，如hooks、utils，手动进行分包
3. 对于主题文件，将其移动到dist/theme下，并将所有的css文件合并为index.css
4. 在umd文件中，因为样式文件过于大，考虑将其压缩为.gz文件: 使用vite-plugin-compression2: compression来对代码进行压缩

使用Terser简化和混淆代码：
1. 我们只需要在生产环境中使用terser进行了

TODO:编写vite插件来辅助打包
1. hooksPlugin.ts，打包插件，用于辅助处理编译前后的一些操作
2. 完成umd文件的打包工作
    - 将index.cjs压缩
    - 将index.css复制到dist目录下，并将其压缩
    - 使用terser混淆代码，移除所有的调试语句包括：debug，console等
3. 完成es文件的打包工作
    - 样式文件的分割：启用cssCodeSplit: true,使得样式不再统一组合打包，而是将组件的样式单独打包，所有的样式文件统一放入es/theme目录下管理
    - 核心组件的打包需要加入hash以防重复
    - 使用terser混淆代码，移除所有调试语句
    - 使用visualizer插件，生成打包分析报告，如何分析打包文件的大小和依赖关系，并优化

*/
const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "dev";
const isTest = process.env.NODE_ENV === "test";


const metaUrl = import.meta.url;
const __filename = fileURLToPath(metaUrl);
const __dirname = path.dirname(__filename);
console.log(__dirname);

/**
 *
 * @param basePath 基址
 * @returns 返回一个文件夹中，所有的文件夹name
 * 就是为了动态获取组件下的所有目录
 */
function getDirectoriesSync(basePath: string) {
    const entries = readdirSync(basePath, { withFileTypes: true });
    return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
}

function moveStyles() {
    readdir("./dist/es/theme", (err) => {
        if (err) return delay(moveStyles, TRY_MOVE_STYLES_DELAY);
        defer(() => shell.mv("./dist/es/theme", "./dist"));
    });
}

export default defineConfig({
    plugins: [
        vue(),
        dts({
            tsconfigPath: "../../tsconfig.build.json",
            outDir: "dist/types",
        }),
        hooksPlugin({
            rmFiles: ["dist/es", "dist/theme", "dist/types"],
            afterBuild: moveStyles,
        }),
        visualizer({
            open: true,
            filename: "dist/stats.es.html",
            gzipSize: true,   //显示Gzip压缩后的大小
            brotliSize: true,  //现实Brotli压缩后的大小
        }),
        terser({
            compress: {
                sequences: isProd,
                arguments: isProd,
                drop_console: isProd &&["log"],
                drop_debugger: isProd,
                passes: isProd ? 4: 1,
                global_defs: {
                    "@DEV": JSON.stringify(isDev),
                    "@TEST": JSON.stringify(isTest),
                    "@PROD": JSON.stringify(isProd),
                }
            },
            format: {
                semicolons: false,
                shorthand: isProd,
                braces: !isProd,
                beautify: !isProd,
                comments: !isProd,
            },
            mangle: {
                toplevel: isProd,
                // properties: isProd,
                keep_classnames: isProd,
                keep_fnames: isProd
            }
        })
    ],
    build: {
        lib: {
            entry: path.resolve(__dirname, "../index.ts"),
            fileName: "index",
            formats: ["es"],
        },
        outDir: "dist/es",
        minify: false,
        cssCodeSplit: true,
        rollupOptions: {
            external: [
                "vue", 
                "@fortawesome/fontawesome-svg-core", "@fortawesome/free-solid-svg-icons", "@fortawesome/vue-fontawesome"],
            // 将css文件转换成index.css
            output: {
                assetFileNames: (chunkInfo) => {
                    /* 
                    当设置cssCodeSplit: true，并且在manualChunks中按组件拆分代码块，vite就会为每个js文件生成一个对应的css文件，这些chunkInfo就是他们自己的原始文件名，在组件中的样式会变成.asset文件
                    */
                    // 1.处理入口css
                    if (chunkInfo.name === "style.css") {
                        return "index.css";
                    }
                    // 2.处理其他的被分割css
                    if (chunkInfo.type === "asset" && /\.(css)$/i.test(chunkInfo.name as string)) {
                        return "theme/[name].[ext]";
                    }
                    // 3.处理其他的资源文件
                    return chunkInfo.name as string;
                },
                manualChunks(id) {
                    if (id.includes("node_modules")) return "vendor";

                    if (id.includes("/packages/hooks")) return "hooks";

                    if (id.includes("/packages/utils") || id.includes("plugin-vue:export-helper")) return "utils";

                    for (const item of getDirectoriesSync("../components")) {
                        if (id.includes(`/packages/components/${item}`)) return item;
                    }
                },
            },
        },
    },
});
