import type { PropType , Component} from "vue";

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
