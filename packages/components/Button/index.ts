/* 
这里我们规定一下项目组件的基本结构：
- Xxx.test.tsx # 测试文件
- Xxx.vue       # 组件代码
- types.ts      # 类型文件
- style.css     # 样式文件
- index.ts      # 入口文件，在这里到处我们的Button组件
- * constants.ts #
*/
import Button from './Button.vue'
import ButtonGroup from './ButtonGroup.vue'
import {withInstall} from '@v-element/utils'

/* 
问题记录：
1. 如何将组件以自定义名称的形式暴露出去,不仅是这样，还需要可以以vue plugin的形式来引入。
2. 了解vue常见自定义宏defineProps,defineOptions,
3. 常用的vue内置函数和type
4. lodash-es常用函数
*/

export const vButton = withInstall(Button);
export const vButtonGroup = withInstall(ButtonGroup);
export * from "./types"