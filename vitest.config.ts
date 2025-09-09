/// <reference types="vitest/config" />
// vitest.config.ts
/// <reference types="vitest" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/

export default defineConfig({
    plugins: [vue(), vueJsx()],
    test: {
        globals: true,
        environment: "jsdom",
        coverage: {
            provider: "istanbul",
            reporter: ["text", "json", "html"],
            reportsDirectory: "./.coverage",
            // 开启后，即使文件没有被测试到，也会被统计进来
            all: true,
            // 设置覆盖率阈值
            thresholds: {
                lines: 90,
                functions: 90,
                branches: 90,
                statements: 90,
            },
            exclude: [
                "node_modules/",
                "dist/",
                "**/coverage/**",
                "**/vite.config.ts",
                "**/vitest.config.ts",
                "packages/play/**",
                "**/index.ts",
                "packages/components/**/index.ts"
            ],
        },
    },
    // ... existing code ...},
});

// "test": "vitest --coverage"