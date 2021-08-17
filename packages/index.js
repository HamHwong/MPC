// 导入Font-Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(fas, far, fab)
// 导入组件
import MPCarousel from './Mpanda.Carousel'
import MPModal from './MPanda.Modal'
import MPPdfReader from './MPanda.PDF_Reader'
import MPCard from './MPanda.Card'
// Directives
import MPTooltips from './Mpanda.Tooltips'
import MPSuspend from './Mpanda.Suspend'
import MPBlur from './MPanda.Blur'
// Utils
import { isElementInViewport } from './Mpanda.Utils/index'
// 样式
import './Scss/index.scss'
// 存储组件列表-对象方式
const components = {
  MPCarousel,
  MPModal,
  MPPdfReader,
  MPCard,
  // PDFToolBar
}
const directives = {
  tooltips: MPTooltips,
  suspend: MPSuspend,
  blur: MPBlur,
}
const utils = {
  isElementInViewport,
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
}
