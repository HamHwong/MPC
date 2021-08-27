import PDFReader from './src/index.vue'
import PDFToolBar from './src//components/toolbar'
PDFReader.install=function(Vue){
  Vue.component(PDFReader.name,PDFReader)
  Vue.component(PDFToolBar.name,PDFToolBar)
}
export default PDFReader