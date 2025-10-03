# Feature：Alert 组件功能测试

需求内容：验证 Alert 组件的各项功能是否符合预期，包括基础渲染、属性配置、插槽内容以及交互事件。

## 测试名称：默认属性渲染测试

1. 测试描述：验证 Alert 组件在不传递任何 props 的情况下，是否能正确渲染，并应用默认的 type、effect 和 closable 属性。
2. 前置条件：在测试环境中挂载一个不带任何 props 的 VAlert 组件。
3. 测试步骤：
    - 渲染 <v-alert /> 组件。
    - 检查组件根元素是否存在。
    - 检查组件根元素的 class 是否包含 v-alert__primary (默认 type)。
    - 检查组件根元素的 class 是否包含 v-alert__light (默认 effect)。
    - 检查组件是否默认可见。
    - 检查关闭按钮 (.v-alert__close) 是否存在 (默认 closable: true)。
4. 预期结果：
    - 组件成功渲染。
    - 组件的 class 列表包含 v-alert__primary 和 v-alert__light。
    - 组件在页面上可见。
    - 关闭按钮被渲染出来。
