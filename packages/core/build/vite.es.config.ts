import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { readdirSync, writeFileSync, readFileSync } from "fs";
import shell from "shelljs";
const TRY_MOVE_STYLES_DELAY = 750 as const;
// function getDirectoriesSync(basePath: string) {
//     const entries = readdirSync(basePath, { withFileTypes: true });

//     return map(
//         filter(entries, (entry) => entry.isDirectory()),
//         (entry) => entry.name
//     );
// }
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

// function moveStyles() {
//     readdir("./dist/es/theme", (err) => {
//         if (err) return delay(moveStyles, TRY_MOVE_STYLES_DELAY);
//         defer(() => shell.mv("./dist/es/theme", "./dist"));
//     });
// }

export default defineConfig({
    plugins: [
        vue(),
        dts({
            tsconfigPath: "../../tsconfig.build.json",
            outDir: "dist/types",
        }),
        {
            name: "move-and-combine-styles",
            closeBundle() {
                const distDir = path.resolve(__dirname, "../dist");
                const esThemeDir = path.resolve(__dirname, "../dist/es/theme");
                const finalThemeDir = path.resolve(distDir, "theme");

                try {
                    if (shell.test("-d", esThemeDir)) {
                        // Move dist/es/theme to dist/theme
                        shell.mv(esThemeDir, finalThemeDir);
                        console.log(`
✅ Theme directory moved successfully to ${finalThemeDir}
`);

                        // Concatenate CSS files into dist/theme/index.css
                        const cssFiles = readdirSync(finalThemeDir).filter((file) => file.endsWith(".css"));
                        const combinedCss = cssFiles.map((file) => readFileSync(path.join(finalThemeDir, file), "utf-8")).join("\n");
                        writeFileSync(path.join(finalThemeDir, "index.css"), combinedCss);
                        console.log(`✅ Combined CSS file created at ${path.join(finalThemeDir, "index.css")}\n`);
                    } else {
                        console.log("\nℹ️ No 'dist/es/theme' directory found to process.\n");
                    }
                } catch (e) {
                    console.error("\n❌ Error during post-build CSS processing:", e, "\n");
                }
            },
        },
    ],
    build: {
        lib: {
            entry: path.resolve(__dirname, "../index.ts"),
            fileName: (format) => `index.${format}.js`,
            formats: ["es"],
        },
        outDir: "dist/es",
        minify: false,
        cssCodeSplit: true,
        rollupOptions: {
            external: ["vue", "@fortawesome/fontawesome-svg-core", "@fortawesome/free-solid-svg-icons", "@fortawesome/vue-fontawesome"],
            // 将css文件转换成index.css
            output: {
                assetFileNames: (chunkInfo) => {
                    if (chunkInfo.name === "style.css") {
                        return "index.css";
                    }
                    if (chunkInfo.type === "asset" && /\.(css)$/i.test(chunkInfo.name as string)) {
                        return "theme/[name].[ext]";
                    }
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