#!/bin/bash

# 脚本功能: 将纯文本格式的测试用例（如 origin.md）转换为结构化的 Markdown 格式（如 testdoc.md）。
#
# 使用方法:
# 1. 将此脚本保存为 format_tests.sh
# 2. 在终端中，赋予脚本执行权限:
#    chmod +x format_tests.sh
# 3. 运行脚本，并提供输入文件名和输出文件名:
#    ./format_tests.sh <input_file> <output_file>
#
# 示例:
#    ./format_tests.sh /Users/lee/Projects/v-element/packages/components/Alert/test/origin.md /Users/lee/Projects/v-element/packages/components/Alert/test/testdoc.md

# --- 脚本开始 ---

# 检查是否提供了足够的参数
if [ "$#" -ne 2 ]; then
    echo "错误: 参数不足。"
    echo "用法: $0 <input_file> <output_file>"
    exit 1
fi

INPUT_FILE="$1"
OUTPUT_FILE="$2"

# 检查输入文件是否存在
if [ ! -f "$INPUT_FILE" ]; then
    echo "错误: 输入文件 '$INPUT_FILE' 不存在。"
    exit 1
fi

# 使用 awk 进行核心的文本转换和格式化
# -v OFS="" and -v ORS="" are used to control output separators, but not strictly needed here.
# The logic uses a state machine (the 'state' variable) to know whether it's inside
# a "测试步骤" (state=1) or "预期结果" (state=2) block.
awk '
# BEGIN 块：初始化状态变量
BEGIN {
    # state: 0=普通, 1=在测试步骤中, 2=在预期结果中
    state=0
}

# 匹配 "Feature：" 开头的行
/^Feature：/ {
    print "# " $0
    next
}

# 匹配 "需求内容：" 开头的行
/^需求内容：/ {
    # 在需求内容前加一个换行以分隔
    print "\n" $0
    next
}

# 匹配 "测试名称：" 开头的行，这是一个新测试用例的开始
/^测试名称：/ {
    # 在每个新的测试用例前添加换行，以保证格式清晰
    print "\n"
    # 将其转换为二级标题
    sub(/^测试名称：/, "## 测试名称：")
    print $0 "\n"
    state=0 # 重置状态
    next
}

# 匹配 "测试描述：" 开头的行
/^测试描述：/ {
    sub(/^测试描述：/, "1. 测试描述：")
    print $0
    state=0
    next
}

# 匹配 "前置条件：" 开头的行
/^前置条件：/ {
    sub(/^前置条件：/, "2. 前置条件：")
    print $0
    state=0
    next
}

# 匹配 "测试步骤：" 开头的行
/^测试步骤：/ {
    print "3. 测试步骤："
    state=1 # 进入“测试步骤”状态
    next
}

# 匹配 "预期结果：" 开头的行
/^预期结果：/ {
    print "4. 预期结果："
    state=2 # 进入“预期结果”状态
    next
}

# 默认处理块：处理所有不匹配以上关键字的非空行
# NF > 0 用来过滤掉空行
NF > 0 {
    if (state == 1) {
        # 如果在“测试步骤”状态，则添加项目符号和缩进
        print "    - " $0
    } else if (state == 2) {
        # 如果在“预期结果”状态，也添加项目符号和缩进
        print "    - " $0
    }
}
' "$INPUT_FILE" > "$OUTPUT_FILE"

echo "转换完成！"
echo "输入文件: $INPUT_FILE"
echo "输出文件: $OUTPUT_FILE"

# --- 脚本结束 ---