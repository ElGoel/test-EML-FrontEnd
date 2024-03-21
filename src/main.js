import { createApp } from 'vue'
import router from '@/router/index.js';
import './assets/main.scss'
import App from './App.vue'
import store from './store/UserStore'; 
import ClickOutside from './directives/ClickOutside';

createApp(App)
.use(router)
.use(store)
.use('click-outside', ClickOutside)
.mount('#app')
