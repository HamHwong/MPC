import WaterFall from './src/index.vue' 
WaterFall.install=function(Vue){
  Vue.component(WaterFall.name,WaterFall) 
}
export default WaterFall