import { createApp } from 'vue'
import './style.css'
import App from './App.vue';
import store from './store';
import router from './router';
import TDesign from 'tdesign-vue-next';
import 'tdesign-vue-next/es/style/index.css';

const app = createApp(App);

app.use(store);
app.use(router);
app.use(TDesign);
app.mount('#app');
