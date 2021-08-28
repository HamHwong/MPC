// 导入Font-Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(fas, far, fab)
// 导入组件
import MPCarousel from './Components/Mpanda.Carousel'
import MPModal from './Components/MPanda.Modal'
import MPPdfReader from './Components/MPanda.PDF_Reader'
import MPCard from './Components/MPanda.Card'
import MPLayout from './Components/Mpanda.Layout'
// Directives
import MPTooltips from './Directives/Mpanda.Tooltips'
import MPSuspend from './Directives/Mpanda.Suspend'
import MPBlur from './Directives/MPanda.Blur'
import MPCopy from './Directives/MPanda.Copy'
// EventsBus
import { EventsBus,EventBusFactory } from './EventBus'
// Utils
import {
  isElementInViewport,
  getRandomBetween,
  getRenderedStyle,
  getRelativePositionOfChildParentDOMs,
} from './Utils/index'
// 样式
import './Scss/index.scss'
// 存储组件列表-对象方式
const components = {
  MPCarousel,
  MPModal,
  MPPdfReader,
  MPCard,
  ...MPLayout,
}
const directives = {
  tooltips: MPTooltips,
  suspend: MPSuspend,
  blur: MPBlur,
  copy: MPCopy,
}
const utils = {
  isElementInViewport,
  getRandomBetween,
  getRenderedStyle,
  getRelativePositionOfChildParentDOMs,
}
const config = {
  VueInstance: null,
  enableEventsBus: false,
}
// 开启事件总线
function enableEventsBus() {
  config.enableEventsBus = true
  if (
    install.installed &&
    !config.VueInstance.config.globalProperties.Emitter
  ) {
    installEventsBus(config.VueInstance)
  }
}
// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function(Vue) {
  // 判断是否安装
  if (install.installed) return

  // 遍历注册全局组件-对象方式
  Object.keys(components).forEach((key) => {
    Vue.component(key, components[key])
  })

  Object.keys(directives).forEach((key) => {
    Vue.directive(key, directives[key])
  })

  config.VueInstance = Vue
  installEventsBus(Vue)
}

// 安装事件总线
function installEventsBus(Vue) {
  console.log('安装！',config)
  if (config.enableEventsBus) {
    Vue.config.globalProperties.EnableEmitter = config.enableEventsBus
    EventBusFactory.init(Vue)
    Vue.config.globalProperties.Emitter = EventBusFactory.getInstance()
    console.log('安装成功！')
  }else{
    console.log('安装失败！')
  } 
}
// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  // 以下是具体的组件列表
  components: components,
  directives: directives,
  utils: utils,
  enableEventsBus,
  EventsBus,
  EventBusFactory,
  on:config.VueInstance && config.VueInstance.config.globalProperties.Emitter.on,
  emit:config.VueInstance && config.VueInstance.config.globalProperties.Emitter.emit,
  clean:config.VueInstance && config.VueInstance.config.globalProperties.Emitter.clean
}
