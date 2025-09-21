import components from "./components";
import {makeInstaller} from '@v-element/utils'
import "@v-element/theme/index.css"
import {fas} from "@fortawesome/free-solid-svg-icons"
import { library } from "@fortawesome/fontawesome-svg-core";
/* 
梳理一下组件运行逻辑：
1. 在components中创建对应的组件
2. 将组件通过utils/install.ts装饰成插件，这样就可以通过vue plugin的形式运行
3. 再到core中引用：
    - 通过core/components.ts作为组件集合
    - 通过core/index.ts作为入口文件，将所有组件暴露出去
    - 这里core的命名就是v-element，所以就是核心
*/
library.add(fas);
const installer = makeInstaller(components);

export * from '@v-element/components';
export default installer;