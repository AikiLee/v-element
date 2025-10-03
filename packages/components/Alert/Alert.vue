<script lang="ts" setup>
import { computed, ref, useSlots } from "vue";
import vIcon from "../Icon/Icon.vue";
import type { AlertProps, AlertEmits, AlertInstance } from "./types.ts";
import { typeIconMap } from "./typeIconMap";
/* 
TODO:
1. showIcon属性不生效 ✅
2. 漏了visible属性 ✅ storybook的问题
3. 借助ai进行测试覆盖率的提升
*/
defineOptions({
    name: "vAlert",
});
defineExpose<AlertInstance>({
    open,
    close,
});
const props = withDefaults(defineProps<AlertProps>(), {
    type: "success",
    effect: "light",
    closable: true,
});
const emits = defineEmits<AlertEmits>();
const slots = useSlots();
const visible = ref(true);
const iconName = computed(() => typeIconMap.get(props.type) ?? "circle-info");
const withDescription = computed(() => props.description || slots.description);
function close() {
    visible.value = false;
    emits("close");
}

function open() {
    visible.value = true;
    emits("open");
}
</script>
<template>
    <transition name="v-alert-fade">
        <div
            class="v-alert"
            v-show="visible"
            :class="{
                [`v-alert__${type}`]: type,
                [`v-alert__${effect}`]: effect,
                'text-center': center,
            }"
        >
            <v-icon class="v-alert__icon" :class="{ 'big-icon': withDescription }" :icon="iconName" v-if="showIcon"> </v-icon>
            <div class="v-alert__content">
                <span class="v-alert__title" :class="{ 'with-desc': withDescription }">
                    <slot name="title"> {{ title }}</slot>
                </span>
                <p class="v-alert__description">
                    <slot>{{ description }}</slot>
                </p>
                <div class="v-alert__close" v-if="closable">
                    <v-icon icon="xmark" @click="close"></v-icon>
                </div>
            </div>
        </div>
    </transition>
</template>
<style scoped>
@import "./style.css";
</style>
