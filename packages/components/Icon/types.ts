import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface IconProps {
    // 在图标周围添加一个细边框
    border?: boolean;
    // 将图标渲染在一个固定宽度的容器中。这对于创建需要图标完美对齐的列表或菜单非常有用
    fixedWidth?: boolean;
    // 水平、垂直或同时翻转图标
    flip?: "horizontal" | "vertical" | "both";
    // 允许您使用一个图标作为另一个图标的“蒙版”，从而创建复合图标
    icon: object | Array<string> | string | IconDefinition;
    mask?: object | Array<string> | string;
    // 专用于列表（<ul>, <ol>）中。它会用图标替换默认的列表项目符号，并进行正确的对齐。
    listItem?: boolean;
    // 将图标浮动到其容器的左侧或右侧，允许文本环绕它。
    pull?: "right" | "left";
    pulse?: boolean;
    // 按指定的角度旋转图标
    rotation?: 90 | 180 | 270 | "90" | "180" | "270";
    swapOpacity?: boolean;
    // 使用fontawesome预设尺寸来控制图标大小
    size?: "2xs" | "xs" | "sm" | "lg" | "xl" | "2xl" | "1x" | "2x" | "3x" | "4x" | "5x" | "6x" | "7x" | "8x" | "9x" | "10x";
    //  连续旋转
    spin?: boolean;
    // 允许进行更高级、更精细的组合变换，如缩放、位移和旋转
    transform?: object | string;
    // 将图标渲染为 SVG 的 <symbol> 元素。当您需要多次重用同一个图标时，这对于性能优化很有帮助
    symbol?: boolean | string;
    // 在图标的 SVG 内部添加一个可访问的 <title> 元素，屏幕阅读器可以读取它
    title?: string;
    // 反转图标的颜色。通常用于在深色背景上放置浅色图标。
    inverse?: boolean;
    // 上下跳动
    bounce?: boolean;
    // 水平晃动
    shake?: boolean;
    // 轻微地放大和缩小
    beat?: boolean;
    // 淡入淡出
    fade?: boolean;
    beatFade?: boolean;
    // 结合了旋转和脉冲
    spinPulse?: boolean;
    // 反转旋转方向
    spinReverse?: boolean;
    // 预设样式
    type?: "primary" | "success" | "warning" | "danger" | "info";
    // 允许您为图标设置自定义颜色
    color?: string;
}
