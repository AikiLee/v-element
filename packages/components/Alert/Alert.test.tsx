import { describe, expect, test, vi } from "vitest";
import { mount } from "@vue/test-utils";
import Alert from "./Alert.vue";
import Icon from "../Icon/Icon.vue";
import type { AlertType } from "./types";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faXmark,faCircleInfo } from "@fortawesome/free-solid-svg-icons";
library.add(faXmark,faCircleInfo);

describe("Alert.vue", () => {
    // 1. 默认属性渲染测试
    test("default attribute rendering test", () => {
        const wrapper = mount(Alert, {});

        // 检查组件根元素是否存在
        expect(wrapper.find(".v-alert").exists()).toBe(true);
        // 检查默认 type class
        expect(wrapper.classes()).toContain("v-alert__success");
        // 检查默认 effect class
        expect(wrapper.classes()).toContain("v-alert__light");
        // 检查默认可见性
        expect(wrapper.isVisible()).toBe(true);
        // 检查默认可关闭
        expect(wrapper.find(".v-alert__close").exists()).toBe(true);
    });

    // 2. title 和 description 属性渲染测试
    test("title and description props rendering test", () => {
        const wrapper = mount(Alert, {
            props: {
                title: "测试标题",
                description: "这是一段描述",
            },
        });

        expect(wrapper.find(".v-alert__title").text()).toBe("测试标题");
        expect(wrapper.find(".v-alert__description").text()).toBe("这是一段描述");
    });

    // 3. type 属性功能测试
    test("type prop functionality test", () => {
        const types: AlertType[] = ["success", "warning", "info", "danger"];
        types.forEach((type) => {
            const wrapper = mount(Alert, {
                props: { type },
            });
            expect(wrapper.classes()).toContain(`v-alert__${type}`);
        });
    });

    // 测试 effect 属性
    test("effect prop test", () => {
        const wrapper = mount(Alert, {
            props: {
                effect: "dark",
            },
        });
        expect(wrapper.classes()).toContain("v-alert__dark");
    });

    // 4. showIcon 属性功能测试
    test("showIcon prop functionality test", async () => {
        const wrapper = mount(Alert, {
            props: {
                showIcon: true,
            },
        });

        expect(wrapper.find(".v-alert__icon").exists()).toBe(true);
        expect(wrapper.findComponent(Icon).exists()).toBe(true);

        await wrapper.setProps({ showIcon: false });

        expect(wrapper.find(".v-alert__icon").exists()).toBe(false);
    });

    // 5. closable 属性与关闭事件测试
    test("closable prop functionality test", () => {
        const wrapper = mount(Alert, {
            props: {
                closable: false,
            },
        });

        expect(wrapper.find(".v-alert__close").exists()).toBe(false);
    });

    test("close event test", async () => {
        const onClose = vi.fn();
        const wrapper = mount(Alert, {
            props: {
                onClose,
            },
        });

        await wrapper.find(".v-alert__close .v-icon").trigger("click");
        expect(onClose).toHaveBeenCalledOnce();
        expect(wrapper.isVisible()).toBe(false);
    });

    // 6. slots 插槽功能测试
    test("slots functionality test", () => {
        const wrapper = mount(Alert, {
            slots: {
                title: "自定义标题",
                default: "自定义描述内容",
            },
        });

        expect(wrapper.find(".v-alert__title").text()).toBe("自定义标题");
        expect(wrapper.find(".v-alert__description").text()).toBe("自定义描述内容");
    });

    // 7. open() 和 close() 方法测试，这里有点小问题，使用常规的调用无法触发我们通过defineExpose暴露的方法,所以这里我使用的是断言事件的触发
    test("open() and close() methods test", async () => {
        const wrapper = mount(Alert, {});
        expect(wrapper.isVisible()).toBe(true);

        // wrapper.vm is the component instance
        await (wrapper.vm as any).close();
        // await wrapper.vm.$nextTick();
        expect(wrapper.emitted()).toHaveProperty("close");

        await (wrapper.vm as any).open();
        // await wrapper.vm.$nextTick();
        expect(wrapper.emitted()).toHaveProperty("open");
    });
    // 8. 传入的type为空时的case
    test("type is enull", async () => {
        const wrapper = mount(Alert, {
            props: {
                type: "",
                showIcon: true,
            },
        });
        const iconComponent = wrapper.findAllComponents(Icon);
        console.log(iconComponent)
        const item1 = iconComponent[0];
        expect(item1.exists()).toBe(true);
        expect(item1.props("icon")).toBe("circle-info");
    });
});
