<template>
  <CustomTable :table-data="tableData" v-loading="loading">
    <template #empty>暂无数据</template>
    <CustomColumn :table-columns="tableColumns">
      <template #default-a="scope"> 
        <el-button type="primary" @click="test(scope.row)"> I am slot of a {{ scope.$index }}</el-button>
      </template>
    </CustomColumn>
  </CustomTable>
</template>
<script setup>
import { getData } from '@/api';
import CustomTable from '@/components/CustomTable/index.vue'
import CustomColumn from '@/components/CustomColumn/index.vue'
import CustomButton from '@/components/CustomButton.vue'
const tableData = ref([]);
const loading = ref(false);
const customBtn = markRaw(CustomButton)
onMounted(() => {
  loading.value = true
  getData().then(res => {
    tableData.value = res.data
  }).finally(() => {
    loading.value = false
  })
})
const test = (row) => {
  console.log(row);
}
const tableColumns = {
  a: {
    label: '列a',
    key: 'a',
    prop: 'a',
    style: { color: 'red' },
  },
  b: {
    label: '列b',
    key: 'b',
    prop: 'b',
    inner: customBtn,
  },
  c: {
    label: '列c',
    key: 'c',
    prop: 'c',
    style: { color: 'red' },
  },
  d: "列d",
  e: "列e",
  f: "列f",
  g: "列g",
  h: "列h",
  i: "列i"
};
</script>
<style lang='scss' scoped>

</style>