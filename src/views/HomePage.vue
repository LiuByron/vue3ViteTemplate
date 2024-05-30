<script setup>
const handleClickMini = () => {
  AMessage.info('Hello word!')
}
</script>

<template>
  <div> 娃哈哈！！</div>
  <a-space>
    <a-button type="primary" size="mini" @click="handleClickMini">Mini</a-button>
    <a-button type="primary" size="small">Small</a-button>
    <a-button type="primary">Medium</a-button>
    <a-button type="primary" size="large">Large</a-button>
  </a-space>

   <!-- 这里 -->
   <HelloWorld />
</template>

<style lang="scss" scoped></style>
