// 导入组件
import MPCarousel from "./Mpanda.Carousel/index";
import MPModal from "./MPanda.Modal/index";
// 
import MPTooltips from './Mpanda.Tooltips/index.js'

// 存储组件列表-数组方式
// const components = [tedMenu]

// 存储组件列表-对象方式
const components = {
  MPCarousel,
  MPModal
}; 
const directives = {
  tooltips:MPTooltips
}

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue) {
  // 判断是否安装
  if (install.installed) return;

  // 遍历注册全局组件-数组方式
  // components.forEach(component => {
  //   Vue.component(component.name, component)
  // });

  // 遍历注册全局组件-对象方式
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key]);
  });

  Object.keys(directives).forEach(key=>{
    Vue.directive(key,directives[key])
  })
};

// 判断是否是直接引入文件
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  // 以下是具体的组件列表
  components: components
}; 