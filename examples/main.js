import { createApp } from 'vue'
import App from './App.vue'
import mpc from '../packages/index'
const Vue = createApp(App)
Vue.use(mpc)
Vue.mount('#app')
