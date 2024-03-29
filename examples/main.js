import { createApp } from 'vue'
import App from './App.vue'
import mpc from '../packages'
import '../packages/Scss/index.scss'
const Vue = createApp(App)
mpc.enableEventsBus() 
Vue.use(mpc)
Vue.mount('#app')
