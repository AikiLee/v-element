# Alert

## 核心用法

展示页面的重要信息，并根据不同的优先级和类型会有颜色和样式上的区分

### 实现基础

这并不是一个原生的html元素，所以我们需要自己实现功能和样式。


## API

### Props属性

| 名称              | 说明                               | 类型    | 默认值 |
| ----------------- | ---------------------------------- | ------- | ------ |
| title             | Alert 标题。                       | string  | —      |
| type              | Alert 类型。                       | enum    |        |
| description       | 描述性文本                         | string  | —      |
| closable          | 是否可以关闭                       | boolean | true   |
| center            | 文字是否居中                       | boolean | false  |
| close-text        | 自定义关闭按钮文本                 | string  | —      |
| show-icon         | 是否显示类型图标                   | boolean | false  |
| effect            | 主题样式                           | enum    |        |
| show-after 2.10.0 | 在触发后多久显示内容，单位毫秒     | number  | 0      |
| hide-after 2.10.0 | 延迟关闭，单位毫秒                 | number  | 200    |
| auto-close 2.10.0 | alert 出现后自动隐藏延时，单位毫秒 | number  | 0      |

### Events

| 名称   | 说明           | 类型 |
| ------ | -------------- | -------- |
| open  | 开启时触发的事件 | Function        |
| close | 关闭时触发的事件 | Function       |

### Slots

| 名称    | 说明           |
| ------- | -------------- |
| default | Alert文字中的内容描述     |
| title   | 自定义标题     |
| icon    | 自定义图标     |