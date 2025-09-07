# 说明

[toc]

## .stoorybook

这个就是storybook的核心配置文件，其包含：

- main.ts: 配置

    1. stories指定故事文件的地址例如`["../src/**/*.mdx"],"../src/**/*.stories.@(js/ts/mjs/ts/tsx)`

    2. addons指定插件的地址例如`["@storybook/addon-links","@storybook/addon-docs"]`

    3. framework指定框架的地址例如`"framework: {
        name: "@storybook/vue3-vite"
    }"`

- preview.ts

## story

故事文件, 通常一个故事文件对应一个组件

### 基本元素

1. 类型定义

    ```JS
    import type { Meta, StoryObj } from '@storybook/vue3'


    const meta: Meta<typeof Button> = { 
        // title定义目录结构：如果定义为Example/Button 在目录中的结构就是Example/Button 
        title: 'Button',
        //!important定义了组件的props如何在control面板交互, 在这里可以定义props中的属性
        //接着再说一说里面的选项，control定义面板上的操作方式例如：select就是下拉框,options就是选项了；如果是基础类型 boolean/number/text就是文本框了
        argTypes: {
            //这个就是我们在组件中定义的props: type,在这里可以指定与面板交互的方式
            type: {
                control: {type: 'select'},
                options: ['primary', 'default', 'danger', 'warning', 'info',""]
            }
        }
     } 
    //这里是定义每个故事之间的关系，这里很简单，就是外边距为5px
    const container = (val: string) => `
    <div style="margin:5px">
    ${val}
    </div>
    `;

    //接下来就是定义一个故事
    //在.stories.ts文件中，每一个命名导出，都代表一个独立的故事
    export const Default: Story & { args: { content: string } } = {
        argTypes: {
            content: {
                control: { type: "text" },
            },
        },
        args: {
            type: "primary",
            content: "Button",
        },
        render: (args) => ({
            components: { vButton },
            setup() {
                return { args };
            },
            template: container(`<v-button v-bind="args">{{args.content}}</v-button>`),
        }),
        play: async ({ canvasElement, args, step }) => {
            const canvas = within(canvasElement);
            await step("click button", async () => {
                await userEvent.tripleClick(canvas.getByRole("button"));
            });

            // expect(args.onClick).toHaveBeenCalled();
        },
    };
    ```
