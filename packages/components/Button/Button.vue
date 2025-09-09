<template>
    <component
        :is="props.tag"
        ref="_ref"
        class="v-button"
        :type="tag === 'button' ? props.nativeType : undefined"
        :class="{
            [`v-button--${type}`]: type,
            [`v-button--${size}`]: size,
            'is-plain': plain,
            'is-round': round,
            'is-circle': circle,
            'is-disabled': disabled,
            'is-loading': loading,
        }"
        :autofocus="autofocus"
        :disabled="disabled || loading ? true : false"
        @click="(e: MouseEvent)=> useThrottle ? handlBtnCLickThrottle(e) : handleBtnClick(e)"
    >
        <template v-if="loading">
            <slot name="loading">
                <v-icon class="loading-icon" :icon="loadingIcon ?? 'spinner'" 
                :style="iconStyle" 
                spin 
                size="1x"> </v-icon>
            </slot>
        </template>
        <!-- 当loading时，不显示其他的icon -->
        <v-icon 
            :icon="icon"
            size="1x"
            :style="iconStyle" 
            v-if="!loading && icon"
        ></v-icon>
        <!-- 调用者传入的信息的渲染出口 -->
        <slot></slot>
    </component>
</template>
<script setup lang="ts">
import { ref, computed, useSlots } from "vue";
import type { ButtonProps, ButtonEmits } from "./types";
import { throttle } from "lodash-es";
import vIcon  from "../Icon/Icon.vue";
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
5. 点击操作节流
    - 先使用一个常规的提交函数
        这里是有点要求的，要不然通过直接传递我们包装好的onClick函数，要不然使用wrapper.emitted来捕获事件
    - 再封装一个节流的提交函数
    - 使用lodash的节流
*/
// 允许在script setup中直接设置一些setup函数范围之外的组件选项，最常见的就是name
defineOptions({
    name: "vButton",
});

const iconStyle = computed(() => ({
    marginRight: slots.default ? "6px" : "0px",
}));
// 定义组件初始属性
const props = withDefaults(defineProps<ButtonProps>(), {
    tag: "button",
    nativeType: "button",
    useThrottle: true,
    // 默认节流时间500ms
    throttleDuration: 5000,
});
const emits = defineEmits<ButtonEmits>();
const slots = useSlots();
const disabled = computed(() => props.disabled || false);
const _ref = ref<HTMLButtonElement>();

const handleBtnClick = (e: MouseEvent) => {
    emits("click", e);
};
const handlBtnCLickThrottle = throttle(handleBtnClick, props.throttleDuration);

// defineExpose<ButtonInstance>({
//     ref: _ref,
//     disabled,
//     size,
//     type
// })
</script>

<style scoped>
@import "./style.css";
</style>