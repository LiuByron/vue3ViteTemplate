<script setup>
import selectModal from './modal/selectModal.vue';
const name = ref('我是传奇')
const { x, y } = useMouse()
console.log(x.value)
console.log(y.value)
</script>
<template>
  <div>hello {{ name }}, this is helloworld components</div>
  <icon-material-symbols-360 />
  <icon-material-symbols-3g-mobiledata-badge-outline-sharp />

  <icon-user-phone class=""/>
  <button
    class="
      text-sm
      text-white
      font-mono
      font-light
      py-2
      px-4
      rounded
      border-2
      border-blue-200
      bg-blue-400
      dark:bg-blue-500
      hover:bg-blue-500
      dark:hover:bg-blue-600"
    >
    Button
  </button>
  <button 
    bg="blue-400 dark:blue-500 hover:blue-500 dark:hover:blue-600"
    text="sm white"
    font="mono light"
    p="y-2 x-4"
    border="2 rounded blue-200"
  >
    Button
  </button>
  <button class="btn-style">
    Button
  </button>
  <selectModal />
</template>

<style scoped>
.aa {
  width: 28px;
  height: 28px;
  border: 1px solid red;
}
.btn-style{
  @apply text-sm text-white font-mono font-light
  @apply py-2 px-4 rounded border-2 border-blue-200;
  @apply bg-blue-400 hover:bg-blue-500;
  @apply dark:bg-blue-500 dark:hover:bg-blue-600;
}
</style>