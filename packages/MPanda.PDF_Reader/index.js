import PDFReader from './src/index.vue'
PDFReader.install=function(Vue){
  Vue.component(PDFReader.name,PDFReader)
}
export default PDFReader