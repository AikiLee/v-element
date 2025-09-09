/* 
测试点梳理：
1. Button核心属性
    - type: primary, success, warning, danger, info
    - size: large, default, small
    - other Props: plain, round, circle, disabled, loading, nativeType, tag 

2. Events: click

3. //todo 
    需要一些测试覆盖率的观测工具
*/

import { describe, it, expect, vi, test, beforeEach } from "vitest";
// @vue/test-utils是vue官方的测试工具，mount是最重要的哈数，他会在一个虚拟的DOM环境中渲染vue组件，并且返回一个wrapper，包裹着挂在着你的组件的实例
import { mount } from "@vue/test-utils";
import Icon from "../Icon/Icon.vue";
import Button from "./Button.vue";
import type { ButtonSize, ButtonType } from "./types";

/*
核心用法：describe, it, expect，这是一种BDD驱动的测试用例编写方法：
1. describe(name, function): 用于创建一个测试套件，这里的"Button.vue"是针对所有的Button组件组织测试
2. it(name, fn): 用于定义一个独立的”测试用例”，每个it代码块应该只测试一个特定的功能点
3. expect(value): 断言函数，需要和匹配器组合使用例如：.toContain()/.toBe()/.toHaveLength()来检测某个值是否符合预期
*/

/* 
切换成更加直接的test描述方法：
基本逻辑:
1. test(name, fn): 用于定义一个独立的”测试用例”，每个it代码块应该只测试一个特定的功能点
2. 通过vue-test-plugin提供的mount函数，返回一个wrapper对象，这个对象包含了挂载的组件的实例，其还提供一套强大的API，让我们可以方便的与组件和渲染出的DOM进行交互，例如：
    - wrapper.classes()：获取组件根元素上的css类名数组
    - wrapper.element： 获取原始DOM元素
    - wrapper.trigger()： 触发一个DOM事件
3. expect(value): 断言函数，需要和匹配器组合使用例如：.toContain()/.toBe()/.toHaveLength()来检测某个值是否符合预期
常见形式的断言：
    - class
        - wrapper.classes().toContain(className)
        - 

    - slot
        - 测试button中透传的slot内容是否正确：
            wrapper.get("button").text().toBe("button content")
    - attrs
        - 测试样式是否符合预期：
            wrapper.element.disabled.toBeTruthy
        
    - events
        - 测试事件的触发是否符合预期
            wrapper.get("button").trigger("click")
            expect(onClick).toHaveBeenCalledOnce() 这里的onClick是一个拦截函数，用于测试回调函数

这里再来介绍一下vue-test中的wrapper对象，我们这里其实就是基于vue-test来进行测试的
1. wrapper properities:
    - wrapper.vm: 获取组件实例
    - wrapper.element: 获取组件的DOM元素

2. wrapper methods:
    - find(): 查找组件中的子组件或DOM元素
    - get(): 查找组件中的子组件或DOM元素，与find()类似，但是如果找不到匹配的元素，会抛出一个错误
    - findComponent(): 查找组件中的子组件
    - classes(): 获取组件的class数组
    - trigger(): trigger a event
    - text(): return text content of wrapper 
    - props(): return wrapper vm prop objects, if key provided , will return value

*/
/* 
测试顺序：
1. 先写最基本的用例，用以保证基本功能的使用
2. 功能测试，测试各种属性和方法
3. 场景测试，用以测试组件在不同场景下的表现。例如：
    - disabled button, 按钮样式不一样，click事件不能emit
    
*/
describe("Button.vue", () => {
    // 这里使用vi.fn()创建一个拦截函数，用于测试回调
    const onClick = vi.fn();

    beforeEach(() => {
        onClick.mockClear();
    });

    // primary type button
    test("basic button", async () => {
        const wrapper = mount(() => (
            <Button type="primary" onClick={onClick}>
                button content
            </Button>
        ));
        // class
        expect(wrapper.classes()).toContain("v-button--primary");

        // slot
        expect(wrapper.get("button").text()).toBe("button content");

        // events
        await wrapper.get("button").trigger("click");
        expect(onClick).toHaveBeenCalledOnce();
    });

    // test disable button
    test("disabled button", async () => {
        const wrapper = mount(() => (
            <Button type="primary" disabled {...{ onClick }}>
                button content
            </Button>
        ));
        // class contain is-disable
        expect(wrapper.classes()).toContain("is-disabled");
        // attrs
        expect(wrapper.attributes("disabled")).toBeDefined();
        expect(wrapper.find("button").element.disabled).toBeTruthy();
        // events, 事件调用时不应该触发
        await wrapper.get("button").trigger("click");
        expect(onClick).not.toHaveBeenCalled();
        expect(wrapper.emitted().click).toBeUndefined();
    });

    // test loading button
    test("loading button", async () => {
        const wrapper = mount(Button, {
            props: {
                loading: true,
            },
            slots: {
                default: "button content",
            },
        });
        // class
        expect(wrapper.classes()).toContain("is-loading");

        // attrs
        expect(wrapper.attributes("disabled")).toBeDefined();
        expect(wrapper.find("button").element.disabled).toBeTruthy();

        // events
        await wrapper.get("button").trigger("click");
        expect(wrapper.emitted()).not.toHaveProperty("click");

        // icon
        const iconElement = wrapper.findComponent(Icon);
        expect(iconElement.exists()).toBeTruthy();
        expect(iconElement.props("icon")).toBe("spinner");
    });

    // test button icon
    test("icon button", () => {
        const wrapper = mount(Button, {
            props: {
                icon: "arrow-up",
            },
            slots: {
                default: "icon button",
            },
        });
        // get icon element
        const iconElement = wrapper.findComponent(Icon);
        expect(iconElement.exists()).toBeTruthy();
        expect(iconElement.props("icon")).toBe("arrow-up");
    });

    //   button props test
    test("button props test", async () => {
        const wrapper = mount(Button, {
            props: {
                plain: true,
                round: true,
                circle: true,
                disabled: true,
                loading: true,
                autofocus: true,
            },
            slots: {
                default: "button props test",
            },
        });
        expect(wrapper.classes()).toContain("is-plain");
        expect(wrapper.classes()).toContain("is-round");
        expect(wrapper.classes()).toContain("is-circle");
        expect(wrapper.classes()).toContain("is-disabled");
        expect(wrapper.classes()).toContain("is-loading");
        expect(wrapper.attributes("autofocus")).toBeDefined();
    });

    // tag is not button test
    test("tag is not button test", async () => {
        const wrapper = mount(Button, {
            props: {
                tag: "a",
            },
            slots: {
                default: "button props test",
            },
        });
        expect(wrapper.attributes("type")).toBe(undefined);
    });

    // button not thorttle test
    test("not throttle button test", async () => {
        const wrapper = mount(Button, {
            props: {
                useThrottle: false,
                onClick: onClick,
            },
        });
        await wrapper.get("button").trigger("click");
        await wrapper.get("button").trigger("click");
        expect(onClick).toHaveBeenCalledTimes(2);
    });

    // icon style test
    // 检查 Button 组件是否向 Icon 组件传递了正确的 style 属性。这里避免直接使用jsdom生成的不可靠的属性，直接在vue组件层面进行检测，使用wrapper.vm.$attrs.style来获取组件的style属性
    test("should pass correct style to Icon component based on slot content", () => {
        // Case 1: 当有默认插槽时，应该传递 margin-right: 6px
        const wrapperWithSlot = mount(Button, {
            props: { icon: "arrow-up" },
            slots: { default: "icon button" }
        });
        const iconComponentWithSlot = wrapperWithSlot.findComponent(Icon);
        expect(iconComponentWithSlot.vm.$attrs.style).toEqual({ marginRight: '6px' });

        // Case 2: 当没有默认插槽时，应该传递 margin-right: 0px
        const wrapperWithoutSlot = mount(Button, {
            props: { icon: "arrow-up" }
        });
        const iconComponentWithoutSlot = wrapperWithoutSlot.findComponent(Icon);
        expect(iconComponentWithoutSlot.vm.$attrs.style).toEqual({ marginRight: '0px' });
    });

    // Props: type
    it("should has the correct type class when type prop is set", () => {
        const types = ["primary", "success", "warning", "danger", "info"];
        types.forEach((type) => {
            const wrapper = mount(Button, {
                props: { type: type as ButtonType },
            });
            expect(wrapper.classes()).toContain(`v-button--${type}`);
        });
    });

    // Props: size
    it("should has the correct size class when size prop is set", () => {
        const sizes = ["large", "default", "small"];
        sizes.forEach((size) => {
            const wrapper = mount(Button, {
                props: { size: size as ButtonSize },
            });
            expect(wrapper.classes()).toContain(`v-button--${size}`);
        });
    });

    // click event
    // Events: thorttle click
    it("should emits a click event when the button is clicked", async () => {
        const wrapper = mount(Button, {});
        await wrapper.trigger("click");
        await wrapper.trigger("click");
        expect(wrapper.emitted().click).toHaveLength(1);
    });
    // non throttle click
    it("non throttle button should emits a click event when the button is clicked", async () => {
        const wrapper = mount(Button, {
            props: {
                useThrottle: false,
            },
        });
        await wrapper.trigger("click");
        await wrapper.trigger("click");
        expect(wrapper.emitted().click).toHaveLength(2);
    });

    // Exception Handling: loading state
    it("should display loading icon and not emit click event when button is loading", async () => {
        const wrapper = mount(Button, {
            props: { loading: true },
        });
        const iconElement = wrapper.findComponent(Icon);

        expect(wrapper.find(".loading-icon").exists()).toBe(true);
        expect(iconElement.exists()).toBeTruthy();
        expect(iconElement.props("icon")).toBe("spinner");
        await wrapper.trigger("click");
        expect(wrapper.emitted("click")).toBeUndefined();
    });
});