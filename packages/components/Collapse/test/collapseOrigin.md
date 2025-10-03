Feature：Collapse 折叠面板组件
需求内容： 该功能提供一个可折叠的面板，允许用户展开或收起内容区域。它支持两种模式：常规模式（可同时展开多个面板）和手风琴模式（一次只能展开一个面板）。组件状态通过 v-model 进行双向绑定，并提供 change 事件来响应状态变化。

1. 基础渲染与 v-model 初始化
测试名称：默认渲染及 v-model 初始化
测试描述：测试 Collapse 组件在给定 v-model 初始值时，能否正确渲染 CollapseItem 的展开/收起状态。
前置条件：
Collapse 组件包含三个 CollapseItem 子组件，name 分别为 "1", "2", "3"。
Collapse 组件的 v-model 初始值绑定为 ['1']。
测试步骤：
挂载 Collapse 组件及相应的 CollapseItem。
检查 name 为 "1" 的 CollapseItem。
检查 name 为 "2" 的 CollapseItem。
预期结果：
name 为 "1" 的 CollapseItem 的内容区域可见（v-show 为 true），其头部具有 is-active 类。
name 为 "2" 的 CollapseItem 的内容区域不可见（v-show 为 false），其头部不具有 is-active 类。
2. 常规模式（非手风琴）交互
测试名称：常规模式下点击切换状态
测试描述：测试在默认（非手风琴）模式下，点击 CollapseItem 头部能否正确切换其展开/收起状态，并更新 v-model。
前置条件：
Collapse 组件的 v-model 初始值为空数组 []。
accordion 属性为 false 或未设置。
测试步骤：
挂载组件。
点击 name 为 "1" 的 CollapseItem 头部。
检查 name 为 "1" 的 CollapseItem 的状态和 v-model 的值。
再次点击 name 为 "1" 的 CollapseItem 头部。
检查 name 为 "1" 的 CollapseItem 的状态和 v-model 的值。
点击 name 为 "2" 的 CollapseItem 头部。
检查 name 为 "1" 和 "2" 的 CollapseItem 的状态和 v-model 的值。
预期结果：
步骤 3 后，name 为 "1" 的 CollapseItem 内容可见，v-model 的值变为 ['1']。
步骤 5 后，name 为 "1" 的 CollapseItem 内容不可见，v-model 的值变回 []。
步骤 7 后，name 为 "1" 和 "2" 的 CollapseItem 内容都可见，v-model 的值变为 ['1', '2']。
3. 手风琴模式交互
测试名称：手风琴模式下点击切换状态
测试描述：测试在手风琴模式下，确保只有一个 CollapseItem 能被展开。
前置条件：
Collapse 组件的 v-model 初始值绑定为 ['1']。
accordion 属性设置为 true。
测试步骤：
挂载组件。
检查初始状态。
点击 name 为 "2" 的 CollapseItem 头部。
检查所有 CollapseItem 的状态和 v-model 的值。
再次点击 name 为 "2" 的 CollapseItem 头部。
检查所有 CollapseItem 的状态和 v-model 的值。
预期结果：
步骤 2 后，只有 name 为 "1" 的 CollapseItem 是展开的。
步骤 4 后，name 为 "2" 的 CollapseItem 变为展开状态，而 name 为 "1" 的 CollapseItem 自动收起。v-model 的值变为 ['2']。
步骤 6 后，name 为 "2" 的 CollapseItem 被收起。v-model 的值变为空数组 []。
4. CollapseItem 的 disabled 属性
测试名称：CollapseItem 的 disabled 状态
测试描述：测试当 CollapseItem 的 disabled 属性为 true 时，点击该项不会触发任何状态改变。
前置条件：
name 为 "2" 的 CollapseItem 设置 disabled 属性为 true。
Collapse 组件的 v-model 初始值为空数组 []。
测试步骤：
挂载组件。
检查 name 为 "2" 的 CollapseItem 是否有 is-disabled 类。
点击 name 为 "2" 的 CollapseItem 头部。
检查 name 为 "2" 的 CollapseItem 的状态和 v-model 的值。
预期结果：
步骤 2 后，name 为 "2" 的 CollapseItem 及其头部都应包含 is-disabled 类。
步骤 4 后，name 为 "2" 的 CollapseItem 仍然是收起状态，v-model 的值仍为空数组 []。
5. 事件触发
测试名称：update:modelValue 和 change 事件触发
测试描述：测试当 CollapseItem 状态改变时，Collapse 组件是否正确触发 update:modelValue 和 change 事件。
前置条件：
为 Collapse 组件的 update:modelValue 和 change 事件绑定监听函数。
v-model 初始值为空数组 []。
测试步骤：
挂载组件。
点击 name 为 "1" 的 CollapseItem 头部。
检查两个事件监听函数是否被调用。
预期结果：
update:modelValue 事件被触发一次，其 payload 为 ['1']。
change 事件被触发一次，其 payload 为 ['1']。
6. 插槽功能
测试名称：CollapseItem 的 title 和默认插槽
测试描述：测试 CollapseItem 的 title 插槽和默认内容插槽是否能被正确渲染。
前置条件：无。
测试步骤：
挂载一个 CollapseItem，并通过插槽提供自定义标题和内容。
vue
Apply
<Collapse v-model="activeNames">
  <CollapseItem name="1">
    <template #title>
      <span>自定义标题</span>
    </template>
    <div>自定义内容</div>
  </CollapseItem>
</Collapse>
检查 CollapseItem 的头部。
展开 CollapseItem，检查其内容区域。
预期结果：
CollapseItem 的头部渲染的是 <span>自定义标题</span>，而不是 title prop 的值。
CollapseItem 的内容区域渲染的是 <div>自定义内容</div>。