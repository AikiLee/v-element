import type {Ref} from "vue"
export type CollapseItemName = string | number;

export interface CollapseProps {
    modelValue: CollapseItemName[];
    accordion?: boolean;   
}

export interface CollpaseItemProps {
    name: CollapseItemName;
    title?: string;
    disabled?: boolean;
}
/**
 * "update:modelValue"这是标准的Vue事件，用于支持v-model的双向绑定功能，当v-model绑定到组件上时，vue会自动监听父组件的数据变化，并将变化的值传递给子组件，子组件可以通过props接收这个值，并进行处理。
 * 而"change"事件的触发则更加符合常规操作习惯
 * 使得你的 Collapse 组件既能通过 v-model 轻松应对简单场景，又足够强大，能通过 @change 事件处理复杂的应用逻辑
 */
export interface CollapseEmits {
    (e: "update:modelValue", value: CollapseItemName[]): void;
    (e: "change", value: CollapseItemName[]): void;
}

/**
 * vue3 处理组件通信的标准方式，适合具有层级关系的组件，这样使得子组件不需要了解父组件如何处理状态，只需要通过上下文接口进行通信
 */
export interface CollapseContext {
    activeNames: Ref<CollapseItemName[]>;
    handleItemClick(name: CollapseItemName): void;
}