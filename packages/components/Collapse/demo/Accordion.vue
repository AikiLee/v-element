<template>
  <div>
    <er-collapse accordion v-model="openedValue">
      <er-collapse-item name="a" title="Title a">
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

const openedValue = ref('a')
</script>