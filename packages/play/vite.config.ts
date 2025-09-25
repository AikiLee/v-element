import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import tsconfigPaths from 'vite-tsconfig-paths'
import {visualizer} from "rollup-plugin-visualizer";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx({}), tsconfigPaths(),
    visualizer({
        open: true, // 在打包后自动在浏览器中打开报告
        filename: 'dist/stats.html', // 将报告输出到 dist 目录下
      }),
],
})