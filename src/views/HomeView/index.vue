<template>
  <router-link to="/404">
    <el-button type="primary">去404</el-button>
  </router-link>
  <el-button type="primary" @click="onTime">我在编辑</el-button>
</template>
<script setup>
import { ElMessage } from 'element-plus';
const myWorker = new Worker('/worker.js'); // 创建worker

myWorker.postMessage('start');

let timeCount = 0
myWorker.onmessage = (e) => { // 接收消息
  console.log(e.data);
  if (e.data.sum >= 5) {
    onTimeEnd()
    if(document.visibilityState == "visible") {
      ElMessage.error("页面已失效");
      timeCount = 1; // 触发了提示就禁止它后续再触发
    }
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState == "visible" && timeCount == 0) {
        ElMessage.error("页面已失效");
        timeCount = 1; // 触发了提示就禁止它后续再触发
      }
    });
  }
};

const onTimeStart = () => {
    myWorker.postMessage('start');
}
// 停止定时
const onTimeEnd = () => {
    myWorker.postMessage('end');
}
// 重置定时
const onTime = () => {
    onTimeEnd();
    onTimeStart();
}

</script>
<style lang='scss' scoped>

</style>