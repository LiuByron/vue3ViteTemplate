<template>
  <el-table-column v-for="column in newTableColumns" v-bind="column">
    <template v-for="(value, key) in column.slot" #[key]="scope">
      <slot :name="value" v-bind="scope">
        <div v-if="column.inner && String(key) == 'default'">
          <div v-if="typeof column.inner == 'string'" v-html="column.inner"></div>
          <component v-else :is="column.inner"></component>
        </div>
      </slot>
    </template>
    <template v-if="!column.slot" #default="scope">
      <div v-if="column.inner">
        <div v-if="typeof column.inner == 'string'" v-html="column.inner"></div>
        <component v-else :is="column.inner"></component>
      </div>
      <div v-else :style="column.style">
        {{ scope.row[column.prop] }}
      </div>
    </template>
  </el-table-column>
</template>

<script lang="ts" setup>
import { useSlots } from "vue";
const prop = defineProps({
  tableColumns: {
    type: Object,
    default: () => {},
  },
});
const slots = useSlots();
const newTableColumns = ref({});
const genNewTableHeader = () => {
  newTableColumns.value = { ...prop.tableColumns };
  Object.entries(prop.tableColumns).forEach(([key, value]) => {
    if (typeof value === "string") {
      Reflect.set(newTableColumns.value, key, {
        key: key,
        prop: key,
        label: value,
      });
    }
    if(typeof value === "object") {
      // 设置默认的key
      if (!Reflect.has(value, "key")) {
        Reflect.set(value, "key", key);
      }
      if (!Reflect.has(value, "label")) {
        Reflect.set(value, "label", key);
      }
      // 设置默认的prop，如果该列是多选项，则不需要prop
      if (!Reflect.has(value, "prop") && 
        !(Reflect.has(value, "type") && Reflect.get(value, "type") == "selection")
      ) {
        Reflect.set(value, "prop", key)
      }
      // 处理插槽
      const slotKeys = Object.keys(slots);
      slotKeys.forEach((key) => {
        const res = key.match(/^(\S+)-(\S+)/);
        // 查找不到则res为null
        if (res && res[2] == Reflect.get(value, "key")) {
          if (!Reflect.has(value, "slot")) {
            Reflect.set(value, "slot", {});
          }
          Reflect.set(Reflect.get(value, "slot"), res[1], res[0]);
        }
      })
    }
  });
};
onMounted(genNewTableHeader);
onBeforeUpdate(genNewTableHeader);
</script>
