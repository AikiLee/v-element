import type {Meta,StoryObj} from '@storybook/vue3';
import { vAlert } from "@v-element/components/Alert"
import {fn} from "@storybook/test";
import { AlertProps } from "@v-element/components/Alert/types"
import { ref, effect, watch } from 'vue';
import ArgTypes from '@storybook/vue3';
import { AlertInstance } from '../../../components/Alert/types';

type Story = StoryObj<typeof vAlert>;
const meta: Meta<typeof vAlert> ={
    title: "Components/Alert",
    component: vAlert,
    tags: ["autodocs"],
    argTypes: {
        type: {
            control: { type: 'select' },
            options: ['success', 'warning', 'danger', 'info'],
        },
        effect: {
            control: { type:'select' },
            options: ['light', 'dark'],
        },
        closable: {
            control: { type:'boolean' },
            default: true
        },
        center: {
            control: { type:'boolean' },
            default: false
        }
    },
    args: {
        onClose: fn()
    }
}

export const Default: Story & {args: {visible: boolean}}= {
    args: { 
        title: "标题",
        description: "描述",
        type: "success",
        effect: "light",
        closable: true,
        center: true,
        showIcon: true,
        visible: true
    },
    render: (args) => ({
        components: { vAlert },
        setup() {
            const alertRef = ref<AlertInstance>();
            watch(
                () => (args as any).visible,
                (val: boolean) => {
                    if(val) {
                        alertRef.value?.open();
                    }else {
                        alertRef.value?.close();
                    }
                }
            )
            return { args ,alertRef};
        },
        template: `<v-alert v-bind="args">
        <template #icon></template>`
        
    })

}
export default meta;