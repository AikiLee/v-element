# Collapse 折叠面板

[toc]

## 基础用法

可以展开和收起内容，面板之间是相互独立的。

## 手风琴模式

通过 accordion 属性来设置是否以手风琴模式显示。

## 自定义面板标题

通过具名 slot 来实现自定义面板的标题内容，以实现增加图标等效果。

## 禁用状态

通过 disabled 属性来禁用面板，禁用状态下的面板无法展开和收起。
这里因为不是原生组件，所以需要自己实习

## Collapse API

### Props

| 参数      | 说明                 | 类型               | 默认值 |
| --------- | -------------------- | ------------------ | ------ |
| v-model   | 当前展开面板的 name  | CollapseItemName[] | -      |
| accordion | 是否以手风琴模式显示 | boolean            | false  |

### Events

| 事件名 | 说明           | 回调参数                           |
| ------ | -------------- | ---------------------------------- |
| change | 切换面板时触发 | (name: CollapseItemName[]) => void |

### Slots

| 插槽名  | 说明     | sub component |
| ------- | -------- | ------------- |
| default | 默认插槽 | CollapseItem  |

## CollapseItem API

### props

| 参数     | 说明              | 类型             | 默认值 |
| -------- | ----------------- | ---------------- | ------ |
| name     | 面板的 name，必填 | CollapseItemName | -      |
| title    | 面板的标题，必填  | string           | -      |
| disabled | 是否禁用面板      | boolean          | false  |

### event

| 事件名 | 说明           | 回调参数                         |
| ------ | -------------- | -------------------------------- |
| change | 切换面板时触发 | (name: CollapseItemName) => void |

### slots

| 插槽名  | 说明       |
| ------- | ---------- |
| default | 默认插槽   |
| title   | 自定义标题 |
