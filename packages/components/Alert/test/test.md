# Feature：Alert 组件功能测试

需求内容：验证 Alert 组件的各项功能是否符合预期，包括基础渲染、属性配置、插槽内容以及交互事件。

## 测试名称：默认属性渲染测试

1. 测试描述：验证 Alert 组件在不传递任何 props 的情况下，是否能正确渲染，并应用默认的 type、effect 和 closable 属性。
2. 前置条件：在测试环境中挂载一个不带任何 props 的 VAlert 组件。
3. 测试步骤：
    - 渲染 <v-alert /> 组件。
    - 检查组件根元素是否存在。
    - 检查组件根元素的 class 是否包含 v-alert\_\_primary (默认 type)。
    - 检查组件根元素的 class 是否包含 v-alert\_\_light (默认 effect)。
    - 检查组件是否默认可见。
    - 检查关闭按钮 (.v-alert\_\_close) 是否存在 (默认 closable: true)。
4. 预期结果：
    - 组件成功渲染。
    - 组件的 class 列表包含 v-alert**primary 和 v-alert**light。
    - 组件在页面上可见。
    - 关闭按钮被渲染出来。

## 测试名称：title 和 description 属性渲染测试

1. 测试描述：验证 title 和 description 属性是否能被正确渲染到对应的 DOM 结构中。
2. 前置条件：挂载一个传递了 title 和 description 字符串的 VAlert 组件。
3. 测试步骤：
    - 渲染 <v-alert title="测试标题" description="这是一段描述" />。
    - 查找 .v-alert\_\_title 元素。
    - 查找 .v-alert\_\_description 元素。
4. 预期结果：
    - .v-alert\_\_title 元素的文本内容应为“测试标题”。
    - .v-alert\_\_description 元素的文本内容应为“这是一段描述”。

## 测试名称：type 属性功能测试

1. 测试描述：验证当 type 属性设置为不同值（如 success, danger 等）时，组件是否能正确应用对应的 CSS class。
2. 前置条件：挂载一个 VAlert 组件，并设置 type 属性。
3. 测试步骤：
    - 渲染 <v-alert type="success" />。
    - 检查组件根元素的 class 是否包含 v-alert\_\_success。
    - 将 type 属性更改为 danger。
    - 检查组件根元素的 class 是否包含 v-alert**danger，并且不再包含 v-alert**success。
4. 预期结果：

## 测试名称：showIcon 属性功能测试

1. 测试描述：验证 showIcon 属性是否能控制图标的显示与隐藏。
2. 前置条件：挂载 VAlert 组件。
3. 测试步骤：
    - 渲染 <v-alert show-icon />。
    - 检查 .v-alert\_\_icon 元素是否存在。
    - 将 showIcon 属性设置为 false 或移除该属性。
    - 检查 .v-alert\_\_icon 元素是否不存在。
4. 预期结果：
    - 当 showIcon 为 true 时，图标被渲染。
    - 当 showIcon 为 false 时，图标不被渲染。

## 测试名称：closable 属性与关闭事件测试

1. 测试描述：验证 closable 属性控制关闭按钮的显示，并测试点击关闭按钮后组件是否会隐藏。
2. 前置条件：挂载 VAlert 组件。
3. 测试步骤：
    - 渲染 <v-alert :closable="false" />。
    - 检查 .v-alert\_\_close 元素是否不存在。
    - 重新渲染一个默认的 <v-alert />，并确认组件可见。
    - 模拟用户点击 .v-alert\_\_close 元素中的关闭图标。
    - 检查组件是否变为不可见（v-show="false"）。
4. 预期结果：
    - 当 closable 为 false 时，关闭按钮不渲染。
    - 当 closable 为 true 时，点击关闭按钮会隐藏 Alert 组件。

## 测试名称：slots 插槽功能测试

1. 测试描述：验证 title 插槽和默认插槽是否能被正确渲染。
2. 前置条件：挂载一个使用插槽的 VAlert 组件。
3. 测试步骤：
    - 渲染
    - plainText
    - <v-alert> <template #title>自定义标题</template> 自定义描述内容 </v-alert>
    - 。
    - 检查 .v-alert\_\_title 元素的文本内容。
    - 检查 .v-alert\_\_description 元素的文本内容。
4. 预期结果：
    - .v-alert\_\_title 的内容应为“自定义标题”。
    - .v-alert\_\_description 的内容应为“自定义描述内容”。

## 测试名称：open() 和 close() 方法测试

1. 测试描述：验证通过 ref 调用的 open() 和 close() 方法是否能正确控制组件的显示与隐藏。
2. 前置条件：在测试脚本中获取到 VAlert 组件的实例。
3. 测试步骤：
    - 渲染 <v-alert ref="alertRef" />。
    - 确认组件初始状态为可见。
    - 调用 alertRef.value.close() 方法。
    - 检查组件是否变为不可见。
    - 调用 alertRef.value.open() 方法。
    - 检查组件是否重新变为可见。
4. 预期结果：
    - close() 方法能隐藏组件，open() 方法能显示组件。
