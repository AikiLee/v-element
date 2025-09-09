import {vi,test,expect,beforeEach,describe} from "vitest";
import { mount } from "@vue/test-utils";
import Button from "./Button.vue";
import ButtonGroup from "./ButtonGroup.vue";
import type { ButtonSize, ButtonType } from "./types";


describe("ButtonGroup.vue",()=> {
    const onClick = vi.fn();
    beforeEach(() => {
        onClick.mockClear();
    });
    // basic button group function test:
    test("basic button group", () => {
        const wrapper = mount(ButtonGroup, {
            slots: {
                default: () => [
                    <Button type="primary">button content 1</Button>,
                    <Button type="primary" size="small">
                        button content 2
                    </Button>,
                ],
            },
        });
        // class
        expect(wrapper.find('.v-button-group').exists()).toBe(true);
        const buttons = wrapper.findAllComponents(Button);
        expect(buttons.length).toBe(2);

        // The first button should have default size
        expect(buttons[0].classes()).not.toContain("v-button--large");
        expect(buttons[0].classes()).not.toContain("v-button--small");

        // The second button should have small size
        expect(buttons[1].classes()).toContain("v-button--small");
    });

    test("button group props should have higher priority", () => {
        const wrapper = mount(ButtonGroup, {
            props: {
                size: "large",
                type: "success",
            },
            slots: {
                default: () => [
                    <Button type="primary">button content 1</Button>,
                    <Button type="primary" size="small">
                        button content 2
                    </Button>,
                ],
            },
        });

        expect(wrapper.find('.v-button-group').exists()).toBe(true);
        const buttons = wrapper.findAllComponents(Button);
        expect(buttons.length).toBe(2);

        // The first button should inherit size and type from ButtonGroup
        expect(buttons[0].classes()).toContain("v-button--large");
        expect(buttons[0].classes()).toContain("v-button--success");

        // The second button should also inherit size from ButtonGroup, overriding its own size prop
        expect(buttons[1].classes()).toContain("v-button--large");
        expect(buttons[1].classes()).not.toContain("v-button--small");
        // Type is also inherited and overrides the button's own type
        expect(buttons[1].classes()).toContain("v-button--success");
        expect(buttons[1].classes()).not.toContain("v-button--primary");
    });
})