<script lang="ts" setup>
import type { ButtonGroupContext } from "./types";
import { BUTTON_GROUP_CTX_KEY } from "./constant";
import { provide, reactive, toRef } from "vue";


/* 
实现逻辑：
1. 基本逻辑理一下：
        统一管理一组按钮的样式，做到多个按钮合并统一
        形式如下：

        ```vue
        <button-group >
            <button>按钮1</button>
            <button>按钮2</button>
            <button>按钮3</button>
        </button-group>
        ```

2. 样式处理：
    就是将多个button在视觉上连接起来，仅有最左边和最右边是圆角，中间的button都是没有圆角的

3. props继承：
    buttonGroup组件上设置的属性：size/type/disable应该被内部的button组件继承下来，且优先级肯定需要高于button组件上的属性

4. 技术实现：
    使用vue的依赖注入，在group上provide size/type/disable ; 这样当button上接收到group传来的数据时，就可以将其覆盖掉button上的属性，避免了全部使用props来区别数据来源的问题
*/

const props = defineProps<ButtonGroupContext>();

provide(
    BUTTON_GROUP_CTX_KEY,
    reactive({
        size: toRef(props.size),
        type: toRef(props.type),
        disabled: toRef(props.disabled),
    })
);

defineOptions({
    name: "vButtonGroup",
})
</script>
<template>
    <!-- 没有这么简单，这种跨级别的组件通信需要通过依赖注入实现数据传递 -->
    <div class="v-button-group">
        <slot></slot>
    </div>
</template>
<style scoped>
@import  "./style.css";
</style>