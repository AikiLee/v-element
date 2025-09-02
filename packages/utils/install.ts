import type { App, Plugin, Directive } from "vue";
import { each } from "lodash-es";

// import { noop } from "lodash-es";
// 这里说明这里的组件具有vue插件插件性质
type SFCWithInstall<T> = T & Plugin;

/* 
有点像装饰器的用法，给Vue组件添加install方法，使其可以被Vue应用安装和注册。
*/
export const withInstall = <T>(component: T) => {
    (component as SFCWithInstall<T>).install = (app: App) => {
        const name = (component as any)?.name || "UnnamedComponent";
        app.component(name, component as SFCWithInstall<T>);
    };
    return component as SFCWithInstall<T>;
};

/**
 * 
 * @param components 批量传入组件
 * @returns 返回添加install方法之后的组件
 */
export function makeInstaller(components: Plugin[]) {
    const installer = (app: App) => each(components, (c) => app.use(c));
    return installer;
}