
<script setup lang="ts">
</script>

<template>
    <h1 style="text-align: center; font-size: 36px;">实际使用测试场</h1>
    <!-- 
        问题：
        1. 图标库没有导入成功
     -->
    <v-button type="success" round="true" plain="true" size="large">test button ha ha</v-button>
    <v-button-group type="info" size="small">
        <v-button type="success" round="true" plain="true" size="large" loading="true">test button ha ha</v-button>
        <v-button type="danger" round="true" plain="true" size="default">test button ha ha</v-button>
    </v-button-group>

</template>

<style scoped>

</style>
