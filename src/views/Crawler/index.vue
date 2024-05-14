<template>
  <div class="wrap">
    <div class="form-box">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="auto"
        status-icon
      >
        <el-form-item label="账号" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-card>
      <template #header><span>查看信息</span></template>
      <p v-for="(item, index) in showList" :key="index" class="log-item">{{ item.name }}</p>
    </el-card>
  </div>
</template>
<script setup>
  import { reactive, ref } from 'vue'
  import { encrypt_ecb } from '@/utils/encryption'
  import {login} from '@/api/index'
  const ruleFormRef = ref()
  const ruleForm = reactive({
    name: '',
    password: ''
  })

  const rules = reactive({
    name: [
      { required: true, message: '请输入账号', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' }
    ]
  })

  const showList = ref([
    {
      name: '张三',
      age: 18,
      address: '北京'
    },
    {
      name: '李四',
      age: 20,
      address: '上海'
    },
    {
      name: '王五',
      age: 22,
      address: '广州'
    },
  ])

  const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        login({
          sessionId: '',
          sig: '',
          if_check_slide_passcode_token: '',
          scene: '',
          checkMode: 0,
          randCode: '135343',
          username: ruleForm.name,
          password: '@' + encrypt_ecb(ruleForm.password, 'tiekeyuankp12306'),
          appid: 'otn'
        }).then((res) => {
          console.log(res)
        }).catch((err) => {
          console.log(err)
        })
      } else {
        console.log('error submit!', fields)
      }
    })
  }

  const resetForm = (formEl) => {
    if (!formEl) return
    formEl.resetFields()
  }
</script>

<style scoped lang="scss">
.wrap {
  padding: 20px;
  .form-box {
    width: 40%;
    margin: 15px auto 30px;
    padding: 50px;
    border: 1px solid #f2f2f2;
    border-radius: 5px;
    box-shadow: 5px 10px 10px #ccc;
  }
  .log-item {
    margin: 10px 0;
  }
}
</style>

