import MPCard from './src/index.vue'
// import {TEMPLATE_ENUM as Type} from './src'
MPCard.install=function(Vue){
  Vue.component(MPCard.name,MPCard)
}
// MPCard.Type = Type

export default MPCard