import type { Meta, StoryObj, ArgTypes } from "@storybook/vue3";
import { fn, within, userEvent, expect } from "@storybook/test";

import { vButton } from "v-element";

type Story = StoryObj<typeof vButton> & { argTypes?: ArgTypes };

const meta: Meta<typeof vButton> = {
    title: "Components/Button",
    component: vButton,
    // subcomponents: { ButtonGroup: vButtonGroup },
    tags: ["autodocs"],
    argTypes: {
        type: {
            control: { type: "select" },
            options: ["primary", "success", "warning", "danger", "info", ""],
        },
        size: {
            control: { type: "select" },
            options: ["large", "default", "small", ""],
        },
        disabled: {
            control: "boolean",
        },
        loading: {
            control: "boolean",
        },
        useThrottle: {
            control: "boolean",
        },
        throttleDuration: {
            control: "number",
        },
        autofocus: {
            control: "boolean",
        },
        tag: {
            control: { type: "select" },
            options: ["button", "a", "div"],
        },
        nativeType: {
            control: { type: "select" },
            options: ["button", "submit", "reset", ""],
        },
        icon: {
            control: { type: "text" },
        },
        loadingIcon: {
            control: { type: "text" },
        },
    },
    // args: { onClick: fn() },
};

const container = (val: string) => `
<div style="margin:5px">
  ${val}
</div>
`;

export const Default: Story & { args: { content: string } } = {
    argTypes: {
        // 继承了meta中的argTypes，这里是在story内部添加了新的控制方式：content
        content: {
            control: { type: "text" },
        },
    },
    //定义默认的props
    args: {
        type: "primary",
        content: "Button",
    },
    // 核心函数：指定storybook如何渲染vue组件
    render: (args) => ({
        components: { vButton },
        setup() {
            return { args };
        },
        template: container(`<v-button v-bind="args">{{args.content}}</v-button>`),
    }),
    // 交互测试：模拟用户行为并执行断言
    play: async ({ canvasElement, args, step }) => {
        const canvas = within(canvasElement);
        await step("click button", async () => {
            await userEvent.tripleClick(canvas.getByRole("button"));
        });

        // expect(args.onClick).toHaveBeenCalled();
    },
};

export const Circle: Story = {
    args: {
        icon: "search",
    },
    render: (args) => ({
        components: { vButton },
        setup() {
            return { args };
        },
        template: container(`
        <v-button circle v-bind="args"/>
      `),
    }),
    play: async ({ canvasElement, args, step }) => {
        const canvas = within(canvasElement);
        await step("click button", async () => {
            await userEvent.click(canvas.getByRole("button"));
        });

        expect(args.onClick).toHaveBeenCalled();
    },
};

Circle.parameters = {};

export const Group: Story & { args: { content1: string; content2: string } } = {
    argTypes: {
        groupType: {
            control: { type: "select" },
            options: ["primary", "success", "warning", "danger", "info", ""],
        },
        groupSize: {
            control: { type: "select" },
            options: ["large", "default", "small", ""],
        },
        groupDisabled: {
            control: "boolean",
        },
        content1: {
            control: { type: "text" },
            defaultValue: "Button1",
        },
        content2: {
            control: { type: "text" },
            defaultValue: "Button2",
        },
    },
    args: {
        round: true,
        content1: "Button1",
        content2: "Button2",
    },
    render: (args) => ({
        // todo vButton-Group
        components: { vButton },
        setup() {
            return { args };
        },
        template: container(`
         <v-button-group :type="args.groupType" :size="args.groupSize" :disabled="args.groupDisabled">
           <v-button v-bind="args">{{args.content1}}</v-button>
           <v-button v-bind="args">{{args.content2}}</v-button>
         </v-button-group>
      `),
    }),
    play: async ({ canvasElement, args, step }) => {
        const canvas = within(canvasElement);
        await step("click btn1", async () => {
            await userEvent.click(canvas.getByText("Button1"));
        });
        await step("click btn2", async () => {
            await userEvent.click(canvas.getByText("Button2"));
        });
        // expect(args.onClick).toHaveBeenCalled();
    },
};

export default meta;
