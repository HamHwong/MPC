<template>
  <div
    :id="`pdf_reader_${id}`"
    :class="{__PDF_Reader:true,loading:LoadingPDF}"
  >
    <PDFToolBar position="top" />
    <div
      class="__PDF_Reader_Inner_Wrapper"
      :style="{minHeight:200+'px'}"
    >
      <PDFThumbs
        @ToPage="ToPage"
        :PDF="pdfDoc"
        :height="Height"
        :maxPage="MaxPage"
      />
      <div class="Canvas_Wrapper">
        <canvas ref="canvasDOM"></canvas>
      </div>
    </div>
    <PDFToolBar position="bottom" />
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
// import { computed } from '@vue/runtime-core'
import PDFToolBar from './components/toolbar'
import PDFThumbs from './components/thumbs.vue'
import {nextTick, onMounted, provide, watch } from '@vue/runtime-core'
import pdfjsLib from 'pdfjs-dist'
// const pdfjsLib = require("./pdfjs.es5");
// var pdfjsLib = require('pdfjs-dist/build/pdf.js');
pdfjsLib.disableWorker = true
export default {
  props: {
    pdfurl: {
      type: String,
      default: () => "",
      required: true
    },
    width: {
      type: Number,
      default: () => 0
    },
    height: {
      type: Number,
      default: () => 0
    }
  },
  components: {
    PDFToolBar,
    PDFThumbs
  },
  setup (props) {
    const canvasDOM = ref(null)
    const ctx = ref(null)
    const pdfDoc = ref(null)
    onMounted(() => {
      nextTick(() => {
        ctx.value = canvasDOM.value.getContext('2d')
        if (props.height && props.height > 0)
          canvasDOM.value.height = props.height
        if (props.width && props.width > 0)
          canvasDOM.value.width = props.width
      })
    })
    let MaxPage = ref(0)
    let CurrentPage = ref(0)
    let LoadingPDF = ref(false)
    let id = ref(randomString(6))
    let Scale = ref(1)
    let Width = ref(props.width)
    let Height = ref(props.height)
    provide('MaxPage', MaxPage)
    provide('CurrentPage', CurrentPage)
    watch(() => props.pdfurl, (url, oldURL) => {
      if (!!url && url !== oldURL) {
        LoadingPDF.value = true
        pdfjsLib.getDocument(url).promise.then((pdf) => {
          pdfDoc.value = pdf
          MaxPage.value = pdf.numPages
          CurrentPage.value = 1
          LoadingPDF.value = false
          ToPage(1)
        })
      }
    }, {
      immediate: true
    })
    function ToPage (num) {
      nextTick(()=>{
        num = Number(num) || 1
        LoadingPDF.value = true;
        ctx.value = ctx.value || canvasDOM.value.getContext('2d')
        pdfDoc.value.getPage(num).then(function (page) {
          var viewport = page.getViewport({ scale: Scale.value });
          canvasDOM.value.height = viewport.height;
          canvasDOM.value.width = viewport.width;
          Width.value = viewport.width;
          Height.value = viewport.height;
          var renderContext = {
            canvasContext: ctx.value,
            viewport: viewport
          };
          var renderTask = page.render(renderContext);
          renderTask.promise.then(function () {
            CurrentPage.value = num
          }).finally(function () {
            LoadingPDF.value = false;
          });
        });
      })
    }
    // let width = ref(props.width)
    // let _height = ref(props.height)
    // let url = ref(props.pdfurl)
    // let Reader = ref(null)
    // let contentDOM = ref(null)
    // let canvasDOM = ref(null)
    // let canvasWrapper = ref(null)
    // let thumbs = ref([])
    // let thumbsDOM = ref(null)
    // let thumbsInnerWrapperHeight = ref(0)
    // let ctx = ref(null)
    // let dragging = ref(false)
    // let pdfDoc = ref(null)
    // let keyboardHasBound = ref(false)
    // let height = computed({
    //   set: (val) => {
    //     _height.value = val
    //     // debugger
    //     var height = 0
    //     if (val <= 450) {
    //       height = 450
    //     } else if (val >= 900) {
    //       height = 900
    //     } else {
    //       height = val
    //     }
    //     thumbsInnerWrapperHeight.value = height + 'px'
    //   },
    //   get: () => {
    //     return _height.value
    //   }
    // })

    // // watch(()=>MaxPage.value,()=>{
    // //   generateThumbs()
    // // })



    function randomString (len) {
      len = len || 32
      var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz'
      var maxPos = $chars.length
      var pwd = ''
      for (var i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
      }
      return pwd
    }


    function handleEnlarge () {

    }
    return {
      // PDFToolBar,
      handleEnlarge,
      id,
      canvasDOM,
      pdfDoc,
      ToPage,
      Width,
      Height,
      MaxPage
    }
  }
}
</script>

<style lang="scss" scoped>
.__PDF_Reader {
  position: relative;
  background: #666666;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  // font-family: "Microsoft YaHei", Arial, Helvetica, sans-serif;

  @keyframes zoom {
    from {
      transform: scale(1);
      box-shadow: #333333 0 0 10px, #818181 0 0 10px inset,
        rgb(255, 93, 29) 0 10px 20px, rgb(217, 255, 0) 0 -10px 20px,
        rgb(0, 183, 255) 10px 0px 20px, rgb(255, 10, 202) -10px 0px 20px;
    }
    to {
      transform: scale(1.2);
      box-shadow: #777777 0 0 20px, #818181 0 0 10px inset;
    }
  }
  @keyframes cycle {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  &.loading::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #3333336c;
    z-index: 999;
  }
  &.loading::after {
    content: "";
    border-radius: 50%;
    border: 7px solid #fff;
    box-sizing: border-box;
    position: absolute;
    top: calc(50% - 20px);
    left: calc(50% - 20px);
    width: 40px;
    height: 40px;
    color: #fff;
    z-index: 1000;
    transform-origin: 50% 50%;
    animation: zoom 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) alternate infinite;
  }

  .Canvas_Wrapper {
    flex: 1;
    margin-left: 200px;
    width: 100%;
    min-height: 450px;
    max-height: 900px;
    overflow: auto;
    /* margin-top: 20px;
  margin-bottom: 20px; */
    scrollbar-width: none;
    -ms-overflow-style: none;
    &.zoom {
      cursor: grab;
    }
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .__PDF_Reader_Inner_Wrapper {
    display: flex;
    flex-direction: row;
    position: relative;
    width: 100%;
    overflow: hidden;
    canvas {
      padding: 10px;
      display: block;
      margin: 0 auto;
    }
  }
}
</style>