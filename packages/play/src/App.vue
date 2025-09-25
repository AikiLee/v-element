
<script setup lang="ts">
// import { vButton, vButtonGroup } from "@leeburn/v-element";
// import "@leeburn/v-element/theme/Button.css";
</script>

<template>
    <h1 style="text-align: center; font-size: 36px;">实际使用测试场</h1>
    <!-- 
        问题：
        1. 图标库没有导入成功
     -->
    <v-button type="success" round plain size="large">test button ha ha</v-button>
    <v-button-group type="info" size="small">
        <v-button type="success" round plain size="large" loading>test button ha ha</v-button>
        <v-button type="danger" round plain size="default">test button ha ha</v-button>
    </v-button-group>

</template>

<style scoped>

</style>