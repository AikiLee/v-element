<template>
    <component
    :is="props.tag"
    ref="_ref"
    class="v-button"
    :type="tag === 'button' ? props.nativeType : undefined "
    :class="{
        [`v-button--${type}`]: type,
        [`v-button--${size}`]: size,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle,
        'is-disabled': disabled,
        'is-loading': loading,
    }"
    >
    <slot>
    </slot>
    </component>
</template>
<script setup lang="ts">
import { ref } from "vue";
import type { ButtonProps } from "./types";

/* 
逻辑梳理：
1. 在types.ts中定义Button组件相关类型，核心的就是
    - ButtonSize
    - ButtonType
    - NativeType
    - vue组件的props只用ts相关类型来定义buttonType，然后在相关vue文件中，使用使用withDefaults来定义

2. 使用默认编译器宏withDefaults来定义默认值
    等价的运行时 props 的 default 选项。此外，withDefaults 辅助函数提供了对默认值的类型检查，并确保返回的 props 的类型删除了已声明默认值的属性的可选标志。

3. 使用defineOptions来定义组件的name，防止重名

4. 使用_ref来响应式获取组件的dom节点，便于操作

*/
// 允许在script setup中直接设置一些setup函数范围之外的组件选项，最常见的就是name
defineOptions({
    name: "vButton",
});
// 定义组件初始属性
const props = withDefaults(defineProps<ButtonProps>(), {
    tag: "button",
    nativeType: "button",
});

const slots = defineSlots();

const _ref = ref<HTMLButtonElement>();

</script>
