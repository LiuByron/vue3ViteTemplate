<template>
  <el-form ref="form"  label-width="80px">
    <el-form-item label="联系人">
      <el-select @change="changeGetValue" v-model="userValue" placeholder="请选择活动区域">
        <el-option v-for="(item,index) in listAtt" :key="index" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
</el-form>
</template>
<script>
  export default {
    model: {
      event: 'input-change', // 这个事件与下面的emit事件与之对应
      prop: 'propsInfoValue' // 
    },
    props:{
      // 父组件传递的值，用于数据回填
      propsInfoValue:{
        type:String,
        default:()=>{
          return ''
        }
      }
    }, 
    data() {
      return {
        listAtt:[],
        userValue: this.propsInfoValue
      }
    },
    created() {
      this.getUserList()
    },
    methods: {
      // 模拟接口
      getUserList(){
        setTimeout(()=>{
          this.listAtt = [{
            name:'张三1',id:'1'
          },{
            name:'张三2',id:'2'
          },{
            name:'张三3',id:'3'
          },{
            name:'张三4',id:'4'
          }]
        },1600)
      },
      // 值发生变化会被触发,就去更新
      changeGetValue(){
        this.$emit('input-change', this.userValue)
      }
    }
  }
</script>