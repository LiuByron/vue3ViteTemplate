<template>
  <el-select
    remote
    filterable
    collapse-tags
    v-bind="$attrs"
    style="width: 100%;"
    v-model="selectVal"
    @change="handleChange"
    v-loadMore="handleScroll"
    :multiple="isMultiple"
    :remote-method="remoteMethod"
  >
    <el-option
      v-for="item in options"
      :key="item[fields.value]"
      :label="item[fields.label]"
      :value="item[fields.value]"
    />
  </el-select>
</template>

<script>
export default {
  name: 'page-select',
  props: {
    questFun: {
      type: Function,
      required: true,
    },
    fields: {
      type: Object,
      default: () => ({
        label: 'name',
        value: 'id'
      }),
    },
    isMultiple:{
      type: Boolean,
      default: false
    },
    otherParams: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      loading: false,
      selectVal: '',
      options: [], //选项数据
      curTotal: 0, //当前总数(每次存储的长度)
      pageNum: 1
    };
  },
  created() {
    this.getOptions();
  },
  directives: {
    // 在模板中启用 v-focus
    'loadMore': {
      inserted(el, binding) {
        // 获取element-ui定义好的scroll盒子
        const SELECT_DOWN_DOM = el.querySelector(
          '.el-select-dropdown .el-select-dropdown__wrap'
        )
        SELECT_DOWN_DOM.addEventListener('scroll', function () { // 加个2补齐差距
          const CONDITION = (this.scrollHeight - this.scrollTop) <= this.clientHeight + 2
          if (CONDITION) {
            binding.value()
          }
        })
      },
    }
  },
  methods: {
    handleScroll() {
      const isQuest = this.options.length < this.curTotal;
      this.pageNum += 1;
      isQuest && this.getOptions();
    },
    // 获取案件
    getOptions() {
      this.requestFun({
        pageNum: this.pageNum,
        pageSize: 10,
      }, (res) => {
        this.curTotal = res.total;
        const { value } = this.fields;
        const _list = Array.isArray(res.rows) ? [...this.options, ...res.rows] : [];
        this.options = this.filterAry(_list, value);
      })
    },
    // 关联案件下拉菜单远程搜索
    remoteMethod(val) {
      if(!val) return
      this.requestFun({
        pageNum: 1,
        pageSize: 10,
        searchValue: val
      }, (res) => {
        this.curTotal = res.total;
        this.options = res.rows;
      })
    },
    requestFun(params, callback) {
      this.loading = false;
      const _params = Object.assign(params, this.otherParams)
      this.questFun(_params).then((res) => {
        if (res.code === 200) {
          callback && callback(res)
        } else {
          this.$message.error(res.msg);
        }
      }).finally(() => {
        this.loading = false;
      });
    },
    handleChange(selected) {
      const { value } = this.fields;
      let targetSelect = null;
      if(this.isMultiple) {
        let target = [];
        selected.forEach(id => {
          const choice = this.options.find(item => item[value] === id);
          if(choice) {
            target.push(choice);
          }
        })
        targetSelect = this.filterAry(target, value);
        (!targetSelect.length) && this.getOptions()
      } else {
        targetSelect = this.options.find(item => item[value] === selected);
      }
      this.$emit('selectChange', targetSelect);
    },
    filterAry(list, type) {
      return [...new Map(list.map(item => [item[type], item])).values()];
    }
  },
};
</script>

<style scoped lang="scss"></style>
