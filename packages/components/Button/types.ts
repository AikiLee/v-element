import type { Component, Ref, ComputedRef} from "vue";


// 定义按钮类型、尺寸等常量
export type ButtonType = "primary" | "success" | "warning" | "danger" | "info";
export type ButtonSize = "large" | "default" | "small";
export type NativeType = "button" | "submit" | "reset";

export interface ButtonProps {
    tag?: string | Component;
    type?: ButtonType;
    size?: ButtonSize;
    plain?: boolean;
    round?: boolean;
    circle?: boolean;
    disabled?: boolean;
    autofocus?: boolean;
    nativeType?: NativeType;
    icon?: string;
    loading?: boolean;
    loadingIcon?: string;
    useThrottle?: boolean;
    throttleDuration?: number;
}

/**
 * 最佳实践，通过ts的interface来对载荷进行类型检测；
 * 实现逻辑：利用ts的调用签名语法，精确描述一个函数是如何被调用的，括号中的就是参数类型，后面的就是返回值类型
 */
export interface ButtonEmits {
    (e: "click", value: MouseEvent): void;
}
/**
 * button实例暴露的属性
 */
export interface ButtonInstance {
    ref: Ref<HTMLButtonElement | void>;
    disabled: ComputedRef<boolean>;
    size: ComputedRef<string>;
    type: ComputedRef<string>;
}

/**
 * button-group实例暴露的属性，这是为什么上下文通信，使用context通过依赖注入的方式来传递信息
 */
export interface ButtonGroupContext {
    size?: ButtonSize;
    type?: ButtonType;
    disabled?: boolean;
}

