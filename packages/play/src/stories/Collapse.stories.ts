import type { Meta, StoryObj } from "@storybook/vue3";
import { vCollapse, vCollapseItem } from "@v-element/components/Collapse";
import type {CollapseItemName} from "@v-element/components/Collapse/types";
import { ref } from "vue";

type Story = StoryObj<typeof vCollapse>;

const meta: Meta<typeof vCollapse> = {
    title: "Components/Collapse",
    component: vCollapse,
    tags: ["autodocs"],
    subcomponents: { vCollapseItem }
};

export const Default: Story  = {
    
    args: {
        accordion: true,
        modelValue: ["title1"],
    },
    render: (args) => ({
        components: {
            vCollapse,
            vCollapseItem,
        },
        setup() {
            
            return { args };
        },
        template: `
        <v-collapse v-bind="args" :accordion="args.accordion">
            <v-collapse-item name="title1" title="标题1">内容11212</v-collapse-item>
            <v-collapse-item name="title2" title="标题2">内容2123</v-collapse-item>
            <v-collapse-item name="title3" title="标题3">内容3</v-collapse-item>
        </v-collapse>
        `,
        
    }),
};

export default meta;