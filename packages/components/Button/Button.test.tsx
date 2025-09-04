/* 
测试点梳理：
1. Button核心属性
    - type: primary, success, warning, danger, info
    - size: large, default, small
    - other Props: plain, round, circle, disabled, loading, nativeType, tag 

2. Events: click

*/

import { describe, it, expect } from "vitest";
// @vue/test-utils是vue官方的测试工具，mount是最重要的哈数，他会在一个虚拟的DOM环境中渲染vue组件，并且返回一个wrapper，包裹着挂在着你的组件的实例
import { mount } from "@vue/test-utils";

import Button from "./Button.vue";

/*
核心用法：describe, it, expect
1. describe(name, function): 用于创建一个测试套件，这里的"Button.vue"是针对所有的Button组件组织测试
2. it(name, fn): 用于定义一个独立的”测试用例”，每个it代码块应该只测试一个特定的功能点
3. expect(value): 断言函数，需要和匹配器组合使用例如：.toContain()/.toBe()/.toHaveLength()来检测某个值是否符合预期
*/
describe("Button.vue", () => {
  // Props: type
  it("should has the correct type class when type prop is set", () => {
    const types = ["primary", "success", "warning", "danger", "info"];
    types.forEach((type) => {
        /* 
        通过调用@vue/test-utils/mount函数, 返回一个wrapper对象，这个对象包含了挂载的组件的实例，其还提供一套强大的API，让我们可以方便的与组件和渲染出的DOM进行交互，例如：
        1. wrapper.classes()：获取组件根元素上的css类名数组
        2. wrapper.element： 获取原始DOM元素
        3. wrapper.trigger()： 触发一个DOM事件
        4. wrapper.emitted(): 获取一个包含了组件所触发的自定义事件
        */
      const wrapper = mount(Button, {
        props: { type: type as any },
      });
      expect(wrapper.classes()).toContain(`v-button--${type}`);
    });
  });

  // Props: size
  it("should has the correct size class when size prop is set", () => {
    const sizes = ["large", "default", "small"];
    sizes.forEach((size) => {
      const wrapper = mount(Button, {
        props: { size: size as any },
      });
      expect(wrapper.classes()).toContain(`v-button--${size}`);
    });
  });

  // Props: plain, round, circle
  it.each([
    ["plain", "is-plain"],
    ["round", "is-round"],
    ["circle", "is-circle"],
    ["disabled", "is-disabled"],
    ["loading", "is-loading"],
  ])(
    "should has the correct class when prop %s is set to true",
    (prop, className) => {
      const wrapper = mount(Button, {
        props: { [prop]: true },
        global: {
          stubs: ["ErIcon"],
        },
      });
      expect(wrapper.classes()).toContain(className);
    }
  );

  it("should has the correct native type attribute when native-type prop is set", () => {
    const wrapper = mount(Button, {
      props: { nativeType: "submit" },
    });
    expect(wrapper.element.tagName).toBe("BUTTON");
    expect((wrapper.element as any).type).toBe("submit");
  });

  // Props: tag
  it("should renders the custom tag when tag prop is set", () => {
    const wrapper = mount(Button, {
      props: { tag: "a" },
    });
    expect(wrapper.element.tagName.toLowerCase()).toBe("a");
  });

  // Events: click
  it("should emits a click event when the button is clicked", async () => {
    const wrapper = mount(Button, {});
    await wrapper.trigger("click");
    expect(wrapper.emitted().click).toHaveLength(1);
  });
});