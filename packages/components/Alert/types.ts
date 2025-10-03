
// DONE: alert类型文件的描述，这里摘取核心的类型排除后续增加的属性
export type AlertType  = "success" | "warning" | "danger"  | "info";
export type effectType = "light" | "dark";

/**
 * @description Alert组件的props
 */
export interface AlertProps {
    /**
     * @description 警告提示的类型
     */
    type?: AlertType;
    /**
     * @description 警告提示的标题
     */
    title?: string;
    /**
     * @description 警告提示的描述性文字
     */
    description?: string;
    /**
     * @description 是否可以关闭警示
     */
    closable?: boolean;
    /**
     * @description 居中
     */
    center?: boolean;
    /**
     * @description 展示图标
     */
    showIcon?: boolean;
    
    /**
     * @description 现实模式切换
     */
    effect?: effectType;

    
}
/**
 * @description Alert中关闭按钮向父组件传递消息的类型
 */
export interface AlertEmits {
    (e: "close"): void;
    (e: "open"): void;
}

/**
 * @description Alert向外部暴露的属性
 */
export interface AlertInstance {
    open(): void;
    close(): void;
}