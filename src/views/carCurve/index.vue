<template>
  <div class="box">
    <div class="ball-box">
      <div class="ball"></div>
    </div>
    <div class="cart"></div>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
</script>
<!-- 购物车抛物弧线 -->
<style lang="scss" scoped>
.box {
  position: relative;
  width: 300px;
  height: 300px;
  margin: 0 auto;
}

.ball-box {
  position: absolute;
  right: 0;
  width: 30px;
  height: 30px;
  animation: moveX 1s linear infinite;
}

.ball {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  background-color: #777;
  animation: moveY 1s cubic-bezier(0.55, 0, 0.85, 0.36) infinite;
}

.cart {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 30px;
  background-color: #777;
}

@keyframes moveX {
  to {
    transform: translateX(-250px);
  }
}

@keyframes moveY {
  to {
    transform: translateY(250px);
  }
}

</style>
