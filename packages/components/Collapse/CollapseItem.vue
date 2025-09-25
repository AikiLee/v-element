<script lang="ts" setup>
/* 
基本流程再回顾一下：
1. 在types.ts中定义CollapseItem组件相关类型
2. 在CollapseItem.vue使用defineOptions来定义组件的name，防止重名
3. 使用依赖注入来实现跨级别组件之间的通信
4. 折叠通过v-show来实现
5. 具体的实现逻辑：
- Collapse.vue
    - slot 渲染出口
- CollapseItem.vue 这里负责具体信息渲染
    - header 标题部分
    - container 内容展示
*/

import { COLLAPSE_CTX_KEY } from "./constant";
import type { CollpaseItemProps } from "./types";
import { inject, computed } from "vue";
import vIcon from "../Icon/Icon.vue";
import transitionEvents from "./transitionEvents"
defineOptions({
    name: "vCollapseItem",
});

const props = defineProps<CollpaseItemProps>();
// 这里的ctx其实代表的是上下文数据
const ctx = inject(COLLAPSE_CTX_KEY);
const isActive = computed(() => ctx?.activeNames.value?.includes(props.name));

function handleClick() {
    if(props.disabled) return;
    ctx?.handleItemClick(props.name);
}
</script>

<template>
    <div
        class="v-collapse-item"
        :class="{
            'is-disabled': disabled,
        }"
    >
        <div
            class="v-collapse-item__header"
            :id="`item-header-${name}`"
            :class="{
                'is-disabled': disabled,
                'is-active': isActive,
            }"
            @click="handleClick"
        >
            <span class="v-collapse-item__title">
                <slot name="title">
                    {{ title }}
                </slot>
            </span>
            <v-icon icon="angle-right" class="header-angle"> </v-icon>
        </div>
        <transition name="slide" v-on="transitionEvents">
            <div class="v-collapse-item__wapper" v-show="isActive">
                <div class="v-collapse-item__content" :id="`item-content-${name}`">
                    <slot></slot>
                </div>
            </div>
        </transition>
    </div>
</template>
<style scoped>
@import "./style.css";
</style>
