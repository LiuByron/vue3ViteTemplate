<template>
  <div>HomeView</div>
</template>

<script>
import User from '@/api/user';

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  created() {
    this.login();
  },
  methods: {
    async login() {
      const res = await User.login(this.username, this.password);
      console.log(res);
    }
  },
};
</script>

<style lang="less" scoped>
/*样式穿透方法*/

/* 深度选择器 */
:deep(selector) {
  /* ... */
}

/* 插槽选择器 */
:slotted(selector) {
  /* ... */
}

/* 全局选择器 */
:global(selector) {
  /* ... */
}
</style>
