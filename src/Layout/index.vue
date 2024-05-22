<template>
  <el-container class="container">
    <el-header>Header</el-header>
    <el-container>
      <AsideView />
      <MainView />
    </el-container>
  </el-container>
</template>
<script setup>
  import AsideView from './components/asideView.vue'
  import MainView from './components/mainView.vue'
</script>
<style lang="scss" scoped>
  .container {
    width: 100vw;
    height: 100vh;
    .el-header {
      background-color: var(--el-color-primary-light-7);
      color: var(--el-text-color-primary);
      text-align: center;
      line-height: 60px;
    }
  }
</style>