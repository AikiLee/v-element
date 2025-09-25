<template>
  <div>
    <er-collapse v-model="openedValue">
      <er-collapse-item name="a">
        <template #title>
          <h2>this is title a</h2>
        </template>
        <div>this is content a</div>
      </er-collapse-item>
      <er-collapse-item name="b" title="Title b">
        <div>this is content b</div>
      </er-collapse-item>
      <er-collapse-item name="c" title="Title c">
        <div>this is content c</div>
      </er-collapse-item>
    </er-collapse>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const openedValue = ref(['a'])
</script>