<script setup>
import { Expand, Fold } from '@element-plus/icons-vue'
import { ref } from 'vue'

defineProps({
  msg: String
})

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>
  
  <icon-user-phone />
  <icon-home-avatar />
  <icon-home-ic_project />
  <icon-home-Kitchen />
  <icon-home-avg />
  <icon-home-test />
  <icon-uiw-alipay />
  <icon-el-edit />

  <el-icon size="18" color="red">
      <icon-uiw-alipay />
    </el-icon>
    <icon-user-phone />
    <icon-home-avatar />
    <el-icon size="12" color="red">
      <icon-el-edit />
    </el-icon>
  <div>
    <el-link href="https://element-plus.org" target="_blank">default</el-link>
    <el-link type="primary">primary</el-link>
    <el-link type="success">success</el-link>
    <el-link type="warning">warning</el-link>
    <el-link type="danger">danger</el-link>
    <el-link type="info">info</el-link>
  </div>
  <el-icon size="38" color="red">
    <Expand />
    <Fold />
    <IconIcBaseline5g />
  </el-icon>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
