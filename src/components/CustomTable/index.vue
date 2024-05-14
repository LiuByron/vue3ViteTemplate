<template>
  <el-table :data="tableData" style="width: 100%">
    <template v-for="slot in Object.keys($slots)" :key="slot" #[slot]>
      <slot :name="slot" />
    </template>
  </el-table>
</template>

<script lang="ts" setup>
defineProps({
  tableData: {
    type: Array,
    default: () => [],
  }
});
</script>
