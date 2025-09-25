<script lang="ts" setup>

import { ref,provide,watch } from "vue";

import type { CollapseItemName, CollapseProps, CollapseEmits } from "./types";
import { COLLAPSE_CTX_KEY } from './constant';

// todo: 对于实现同时传入accordion和多个active数组的情况，输出告警处理

const COMPONENT_NAME = "vCollapse";
defineOptions({
    name: COMPONENT_NAME
})
const props = defineProps<CollapseProps>();
const emits = defineEmits<CollapseEmits>();
const activeNames = ref<CollapseItemName[]>(props.modelValue);

function handleItemClick(item: CollapseItemName) {
    let _activeNames = [...activeNames.value];
    // 如果时手风琴模式则同一时间只允许一个标签展开：只需要查看数组是否包含当前的item，如果是，则关闭；如果不是则打开
    if (props.accordion) {
        _activeNames = _activeNames.includes(item) ? [] : [item];
        updateActiveNames(_activeNames);
    }else {

        const index = _activeNames.indexOf(item);
        // 非手风琴模式：如果找到item，就从数组中删除；如果找不到就添加进数组
        if (index > -1) {
            _activeNames.splice(index, 1);
        } else {
            _activeNames.push(item);
        }
        updateActiveNames(_activeNames);
    }
}

function updateActiveNames(val: CollapseItemName[]) {
    activeNames.value = val;
    ["update:modelValue","change"].forEach(event => {
        emits(event as "update:modelValue" & "change", val);
    })
}

watch(
    // 这里props时对象，无法使用watch简单监听，此处使用的getter形式的函数，当modelValue发生变化时，会触发回调,既保持了变量的响应性又保持了变量的更新
    () => props.modelValue,
    (val:CollapseItemName[]) => updateActiveNames(val)
)


provide(COLLAPSE_CTX_KEY, {
    activeNames,
    handleItemClick
})

/* 
几个遗留的任务：
1. 项目打包的优化：分别导出样式文件，将umd打包文件压缩
2. 组件的测试用例的补充：单元测试
3. 相关开发过程的记录
4. 封装组件内的报错处理
5. vue事件debug的学习
*/

</script>
<template>
    <div class="v-collapse">
        <slot></slot>
    </div>
</template>
<style scoped>
@import "./style.css"
</style>
