import { createApp } from 'vue'
import router from './router'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'
import App from './App.vue'
import 'vue-global-api'

const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(pinia)
window.pinia = pinia
app.mount('#app')
