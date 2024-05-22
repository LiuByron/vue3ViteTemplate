<template>
  <el-main>
    <router-view class="display-page"></router-view>
  </el-main>
</template>
<script setup>
import { ref, reactive } from 'vue'

</script>
<style lang='scss' scoped>
.el-main {
  background-color: var(--el-color-primary-light-9);
  color: var(--el-text-color-primary);
  text-align: center;
}

.display-page {
  background-color: rgb(210, 223, 228);
}
</style>