import type { Meta, StoryObj, ArgTypes } from "@storybook/vue3";
import { fn, within, userEvent, expect } from "@storybook/test";
import { library } from "@fortawesome/fontawesome-svg-core";
// 
import { fas } from "@fortawesome/free-solid-svg-icons";

import { vIcon } from "@leeburn/v-element";

library.add(fas);

type Story = StoryObj<typeof vIcon & { argTypes: ArgTypes }>;

const iconNames = Object.values(fas).map(icon => icon.iconName)

// 3. 定义组件的 meta 信息，包含完整的 argTypes
const meta: Meta<typeof vIcon> = {
    title: "Components/Icon",
    component: vIcon,
    tags: ["autodocs"],
    argTypes: {
        icon: {
            control: { type: "select" },
            options: iconNames,
        },
        type: {
            control: { type: "select" },
            options: ["primary", "success", "warning", "danger", "info", ""],
        },
        size: {
            control: { type: "select" },
            options: ["2xs", "xs", "sm", "lg", "xl", "2xl"],
        },
        rotation: {
            control: { type: "select" },
            options: [90, 180, 270,0],
        },
        flip: {
            control: { type: "select" },
            options: ["horizontal", "vertical", "both"],
        },
        spin: { control: "boolean" },
        pulse: { control: "boolean" },
        border: { control: "boolean" },
        fixedWidth: { control: "boolean" },
        color: { control: "color" },
    },
};
export default meta;
const container = (val: string) => `
    <div style="margin: 5px">
    ${val}
    </div>
`;

// 4. 默认故事：展示最基本的用法
export const Default: Story = {
    args: {
        icon: "fa2",
    },
    render: (args) => ({
        components: { vIcon },
        setup() {
            return { args };
        },
        template: container(`<vIcon v-bind="args" />`),
    }),
};

// 5. 尺寸故事：仿照 Button 的 Circle 故事，展示一个特定属性
export const Sizes: Story = {
    render: () => ({
      components: { vIcon },
      template: container(`
        <vIcon icon="user-secret" size="2xs" />
        <vIcon icon="user-secret" size="xs" />
        <vIcon icon="user-secret" size="sm" />
        <vIcon icon="user-secret" size="lg" />
        <vIcon icon="user-secret" size="xl" />
        <vIcon icon="user-secret" size="2xl" />
      `),
    }),
};