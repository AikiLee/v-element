import Collapse from './Collapse.vue'
import CollapseItem from './CollapseItem.vue'
import { withInstall } from '../../utils/install';
// 将组件注册为插件
// DONE:需要理解vue插件和普通组件的区别?
// defineOptions 来让组件“认识自己”，也需要 import 来让其他文件“认识”这个组件
export const vCollapseItem = withInstall(CollapseItem);
export const vCollapse = withInstall(Collapse);