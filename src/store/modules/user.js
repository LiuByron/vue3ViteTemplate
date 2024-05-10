import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null,
  }),
  actions: {
    setUserInfo(userInfo) {
      this.userInfo = userInfo
    },
  },
  // 开启数据持久化
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'userInfo',
        storage: localStorage
      }
    ]
  }
})