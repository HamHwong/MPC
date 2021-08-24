import { createApp } from 'vue'
import App from './App.vue'
import mpc from '../lib/mpc.common'
import '../lib/mpc.css'
const Vue = createApp(App)
Vue.use(mpc)
Vue.mount('#app')
