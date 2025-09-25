import {isString} from "lodash-es"

/**
 * 基于Error封装属于自己的报错组件
 */
class vError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "vError"
  }

}

/**
 * 
 * @param scope 作用域
 * @param msg 
 * @description 主动抛出组件内部错误
 */
export function throwError(scope: string, msg: string) {
    throw new vError(`[${scope}] ${msg}`)
}

/* 
这里是ts的函数重载，只为声明，告诉使用者有多种参数情况，和oop语言的多态不同
*/
export function debugWarn(error: Error): void;
export function debugWarn(scope: string, msg: string): void;
export function debugWarn(scope: string | Error, msg?: string): void {
    if (process.env.NODE_ENV !=="production") {
        const err = isString(scope) ? new vError(`[${msg}]`) : scope;
        console.warn(err);
    }
}
