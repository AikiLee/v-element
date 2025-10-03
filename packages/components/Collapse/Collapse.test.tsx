import { describe, test, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import Collapse from "./Collapse.vue";
import CollapseItem from "./CollapseItem.vue";
import { h } from "vue";
import transitionEvents from "./transitionEvents";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
library.add(faAngleRight);

describe("Collapse.vue", () => {
    test("默认渲染及 v-model 初始化", async () => {
        const wrapper = mount(Collapse, {
            props: {
                modelValue: ["1"],
            },
            slots: {
                default: () => [h(CollapseItem, { name: "1", title: "title1" }), h(CollapseItem, { name: "2", title: "title2" })],
            },
        });

        const items = wrapper.findAllComponents(CollapseItem);
        expect(items.length).toBe(2);

        const firstItem = items[0];
        const secondItem = items[1];

        expect(firstItem.vm.isActive).toBe(true);
        expect(secondItem.vm.isActive).toBe(false);

        const firstHeader = firstItem.find(".v-collapse-item__header");
        const secondHeader = secondItem.find(".v-collapse-item__header");
        expect(firstHeader.classes()).toContain("is-active");
        expect(secondHeader.classes()).not.toContain("is-active");

        const firstContent = firstItem.find(".v-collapse-item__wapper");
        const secondContent = secondItem.find(".v-collapse-item__wapper");
        expect(firstContent.attributes("style")).not.toBe("display: none;");
        expect(secondContent.attributes("style")).toBe("display: none;");
    });

    test("常规模式下点击切换状态", async () => {
        const wrapper = mount(Collapse, {
            props: {
                modelValue: [],
            },
            slots: {
                default: () => [h(CollapseItem, { name: "1", title: "title1" }), h(CollapseItem, { name: "2", title: "title2" })],
            },
        });

        const items = wrapper.findAllComponents(CollapseItem);
        const firstItem = items[0];
        const secondItem = items[1];

        const firstHeader = firstItem.find(".v-collapse-item__header");
        await firstHeader.trigger("click");
        expect(firstItem.vm.isActive).toBe(true);
        expect(wrapper.emitted()["update:modelValue"][0]).toEqual([["1"]]);

        await firstHeader.trigger("click");
        expect(firstItem.vm.isActive).toBe(false);
        expect(wrapper.emitted()["update:modelValue"][1]).toEqual([[]]);

        const secondHeader = secondItem.find(".v-collapse-item__header");
        await secondHeader.trigger("click");
        expect(firstItem.vm.isActive).toBe(false);
        expect(secondItem.vm.isActive).toBe(true);
        expect(wrapper.emitted()["update:modelValue"][2]).toEqual([["2"]]);
    });

    test("手风琴模式下点击切换状态", async () => {
        const wrapper = mount(Collapse, {
            props: {
                accordion: true,
                modelValue: ["1"],
            },
            slots: {
                default: () => [h(CollapseItem, { name: "1", title: "title1" }), h(CollapseItem, { name: "2", title: "title2" })],
            },
        });

        const items = wrapper.findAllComponents(CollapseItem);
        const firstItem = items[0];
        const secondItem = items[1];

        expect(firstItem.vm.isActive).toBe(true);
        expect(secondItem.vm.isActive).toBe(false);

        const secondHeader = secondItem.find(".v-collapse-item__header");
        await secondHeader.trigger("click");

        expect(firstItem.vm.isActive).toBe(false);
        expect(secondItem.vm.isActive).toBe(true);
        expect(wrapper.emitted()["update:modelValue"][0]).toEqual([["2"]]);

        await secondHeader.trigger("click");
        expect(secondItem.vm.isActive).toBe(false);
        expect(wrapper.emitted()["update:modelValue"][1]).toEqual([[]]);
    });

    test("v-model 响应式更新", async () => {
        const wrapper = mount(Collapse, {
            props: {
                modelValue: ["1"],
            },
            slots: {
                default: () => [h(CollapseItem, { name: "1", title: "title1" }), h(CollapseItem, { name: "2", title: "title2" })],
            },
        });

        const items = wrapper.findAllComponents(CollapseItem);
        const firstItem = items[0];
        const secondItem = items[1];

        expect(firstItem.vm.isActive).toBe(true);

        await wrapper.setProps({ modelValue: ["2"] });

        expect(firstItem.vm.isActive).toBe(false);
        expect(secondItem.vm.isActive).toBe(true);
    });

    test("CollapseItem 的 disabled 状态", async () => {
        const wrapper = mount(Collapse, {
            props: {
                modelValue: [],
            },
            slots: {
                default: () => [h(CollapseItem, { name: "1", title: "title1" }), h(CollapseItem, { name: "2", title: "title2", disabled: true })],
            },
        });

        const items = wrapper.findAllComponents(CollapseItem);
        const secondItem = items[1];

        expect(secondItem.find(".v-collapse-item__header").classes()).toContain("is-disabled");

        await secondItem.find(".v-collapse-item__header").trigger("click");
        expect(secondItem.vm.isActive).toBe(false);
        expect(wrapper.emitted()["update:modelValue"]).toBeUndefined();
    });

    test("update:modelValue 和 change 事件触发", async () => {
        const onUpdate = vi.fn();
        const onChange = vi.fn();

        const wrapper = mount(Collapse, {
            props: {
                modelValue: [],
                "onUpdate:modelValue": onUpdate,
                onChange: onChange,
            },
            slots: {
                default: () => [h(CollapseItem, { name: "1", title: "title1" })],
            },
        });

        await wrapper.find(".v-collapse-item__header").trigger("click");

        expect(onUpdate).toHaveBeenCalledWith(["1"]);
        expect(onChange).toHaveBeenCalledWith(["1"]);
    });

    test("CollapseItem 的 title 和默认插槽", () => {
        const wrapper = mount(Collapse, {
            props: {
                modelValue: ["1"],
            },
            slots: {
                default: () =>
                    h(
                        CollapseItem,
                        { name: "1" },
                        {
                            title: () => h("span", null, "自定义标题"),
                            default: () => h("div", null, "自定义内容"),
                        }
                    ),
            },
        });

        const header = wrapper.find(".v-collapse-item__title");
        expect(header.html()).toContain("<span>自定义标题</span>");

        const content = wrapper.find(".v-collapse-item__content");
        expect(content.html()).toContain("<div>自定义内容</div>");
    });

    // 测试过度动画样式
    test("应该在进入过渡期间应用正确的样式", () => {
        // 1. 创建一个模拟的 HTML 元素
        const el = document.createElement("div");
        // 2. 模拟 scrollHeight，因为 JSDOM 中它总是 0
        Object.defineProperty(el, "scrollHeight", { value: 150 });

        // 3. 测试 beforeEnter 钩子
        transitionEvents.beforeEnter(el);
        expect(el.style.height).toBe("0px");
        expect(el.style.overflow).toBe("hidden");

        // 4. 测试 enter 钩子
        transitionEvents.enter(el);
        expect(el.style.height).toBe("150px");

        // 5. 测试 afterEnter 钩子
        transitionEvents.afterEnter(el);
        expect(el.style.height).toBe("");
        expect(el.style.overflow).toBe("");
    });

    test("应该在离开过渡期间应用正确的样式", () => {
        const el = document.createElement("div");
        Object.defineProperty(el, "scrollHeight", { value: 200 });

        // 测试 beforeLeave 钩子
        transitionEvents.beforeLeave(el);
        expect(el.style.height).toBe("200px");
        expect(el.style.overflow).toBe("hidden");

        // 测试 leave 钩子
        transitionEvents.leave(el);
        expect(el.style.height).toBe("0px");

        // 测试 afterLeave 钩子
        transitionEvents.afterLeave(el);
        expect(el.style.height).toBe("");
        expect(el.style.overflow).toBe("");
    });
});
