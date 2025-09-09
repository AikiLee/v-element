<template>
    <!-- $attrs 是一个包含所有“未被声明为 props”的父组件属性的对象。 -->
    <i
        class="v-icon"
        :class="{[`v-icon--${type}`]: type}"
        :style="customStyle"
        v-bind="$attrs"
    >
    <FontAwesomeIcon v-bind="filterProps"/>
    </i>
</template>

<script setup lang="ts">
/* 
1. 使用i标签包裹FontAwesomeIcon组件是一种常见的做法。i标签演变成一个icon的语意化标签
2. 关注点隔离：
    - i标签作为外壳，`v-bind="$attrs"`会将所有的未被声明为props的属性都应用在父组件上
*/
import type { IconProps } from "./types";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { omit } from "lodash-es";
import { computed } from "vue";

defineOptions({
    name: "vIcon",
    inheritAttrs: false,
});

const props = defineProps<IconProps>();
// omit 忽略当前组件props当中的icon属性
const filterProps = computed(() => omit(props, ["type","color"]));
const customStyle = computed(() => ({ color: props.color ?? undefined }));



</script>

<style scoped>
@import "./style.css";
</style>