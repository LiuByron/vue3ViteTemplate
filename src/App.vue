<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import { generateArray } from 'Utils/tools' // 使用Utils别名
console.log(generateArray(20))
</script>

<template>
  <HelloWorld msg="Vite + Vue" />
</template>

<style lang="scss" scoped>
a {
  color: #42b983;
}
</style>
