/* components.ts
    在这里我们将普通的vue组件包装成vue plugin，可以将编写的功能上升为全局指令。
    vue plugin运行机制：
    1. 核心：install方法
        一个标准的vue插件接受两个参数(app,...args)，通过实现这个方法就可以将一个对象包装成插件。在业务上，我们常用于全局添加全局、过滤器
        ```ts
                // myPlugin.ts
        import { App } from 'vue'

        export default {
        install: (app: App, options?: any) => {
            // 在这里编写插件的逻辑
            console.log('MyPlugin has been installed!');
            if (options) {
            console.log('With options:', options);
            }

            // ... 接下来会介绍能在这里做什么
        }
        }
        ```

    2. 拓展全局属性或方法
        app.config.globalProperties
    
    3. 使用插件：
    通常只需要在应用的入口文件中调用：app.use()

*/
import { vButton,vIcon } from "@v-element/components";

import type { Plugin } from "vue";

export default [vButton,vIcon] as Plugin[];