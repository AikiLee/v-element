/* 
1. 基本场景测试
2. 属性测试
3. 特殊场景测试：失败
*/

import { describe, it, expect, vi, test, beforeEach, beforeAll } from "vitest";
// @vue/test-utils是vue官方的测试工具，mount是最重要的哈数，他会在一个虚拟的DOM环境中渲染vue组件，并且返回一个wrapper，包裹着挂在着你的组件的实例
import { DOMWrapper, VueWrapper, mount } from "@vue/test-utils";
import Icon from "../Icon/Icon.vue";
import Collapse from "./Collapse.vue";
import CollapseItem from "./CollapseItem.vue";
import type { CollpaseItemProps, CollapseProps } from "./types";
import type { title } from "process";

describe("Collapse.vue", () => {
    const onClick = vi.fn();
    // 每次操作之后清楚onClick调用
    beforeEach(() => {
        onClick.mockClear();
    });
    let wrapper: VueWrapper,
    headers: DOMWrapper<Element>[],
    contents: DOMWrapper<Element>[];

    beforeAll(() => {
        wrapper = mount(
            <Collapse
            modelValue={["a"] 
            title="title a"}
            ></Collapse>
        )

    })

    // 基本场景测试
    test("basic collapse", async () => {
        const wrapper = mount(() => (
            <Collapse >

            </Collapse>
        ))

    });
});
