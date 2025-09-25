/* 
DONE: 
1. 编写插件，在编译之前移除旧产物，编写后移动产物
2. 具体实现需要借助shelljs来处理在node环境中的rm -rf 操作
3. 熟悉构建的声明周期和钩子函数
*/
import { each, isFunction } from "lodash-es";
import shell from "shelljs";

/**
 * @params rmFiles 待移除的文件夹
 * @params afterBuild 编译后执行的函数
 * @params beforeBuild 编译前执行的函数
 * @description
 * 自定义插件：
 * 1. 编译前移除旧产物
 * 2. 编译后移动样式文件
 */
export default function hooksPlugin({
    rmFiles = [],
    afterBuild,
    beforeBuild,
}: {
    rmFiles?: string[];
    afterBuild?: Function;
    beforeBuild?: Function;
}) {
    return {
        name: "custom-hooks-plugin",
        /**
         * @description 编译前删除指定目录下的所有文件夹，检测beforeBuild类型并执行
         */
        buildStart() {
            each(rmFiles, (fName) => shell.rm("-rf", fName));
            isFunction(beforeBuild) && beforeBuild();
        },
        /**
         * 
         * @param err 检测
         */
        buildEnd(err?:Error) {
            !err && isFunction(afterBuild) && afterBuild();

        }
    }

}
