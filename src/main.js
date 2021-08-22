import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
// 引入base和iconfontcss(两个css都引入到index.scss再由index.scss引入到main.js中)
import './style/index.scss'

createApp(App).use(store).use(router).mount('#app')
