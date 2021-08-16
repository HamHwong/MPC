import MPCard from './src/index.vue'
import PDFToolBar from './src//components/toolbar'
MPCard.install=function(Vue){
  Vue.component(MPCard.name,MPCard)
  Vue.component(PDFToolBar.name,PDFToolBar)
}
export default MPCard