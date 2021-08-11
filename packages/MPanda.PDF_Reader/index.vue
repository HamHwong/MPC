<template>
  <div
    :id="`pdf_reader_${id}`"
    :class="{__PDF_Reader:true,loading:LoadingPDF}"
  >
    <PDFToolBar
      position="top"
      @pre="prePage"
      @next="nextPage"
      @zoom:in="zoomIn"
      @zoom:out="zoomOut"
    />
    <div
      class="__PDF_Reader_Inner_Wrapper"
      :style="{minHeight:minHeight+'px'}"
    >
      <PDFThumbs
        @ToPage="ToPage"
        :PDF="pdfDoc"
        :height="Height"
        :maxPage="MaxPage"
        :maxHeight="maxHeight"
        :minHeight="minHeight"
      />
      <div
        @mousedown="handleMouseDown"
        @mousemove="handleMouseMove"
        @mouseup="handleMouseUp"
        class="Canvas_Wrapper"
      >
        <canvas
          @wheel="handleWheel"
          ref="canvasDOM"
        ></canvas>
      </div>
    </div>
    <PDFToolBar
      position="bottom"
      @pre="prePage"
      @next="nextPage" 
      @zoom:in="zoomIn"
      @zoom:out="zoomOut"
    />
  </div>
</template>

<script>
import { ref } from '@vue/reactivity' 
import PDFToolBar from './components/toolbar'
import PDFThumbs from './components/thumbs.vue'
import { getCurrentInstance, nextTick, onMounted, provide, watch } from '@vue/runtime-core'
import pdfjsLib from 'pdfjs-dist'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry' 
pdfjsLib.GlobalWorkerOptions,pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker
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
    },
    maxHeight: {
      type: Number,
      default: () => 950
    },
    minHeight: {
      type: Number,
      default: () => 450
    }
  },
  components: {
    PDFToolBar,
    PDFThumbs
  }, 
  emits:['pageChanged'],
  setup (props,context) {
    const canvasDOM = ref(null)
    const ctx = ref(null)
    const pdfDoc = ref(null)
    let LoadingPDF = ref(false)
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
    let id = ref(randomString(6))
    let Scale = ref(1)
    let Width = ref(props.width)
    let Height = ref(props.height)
    provide('MaxPage', MaxPage)
    provide('CurrentPage', CurrentPage)
    watch(() => props.pdfurl, (url, oldURL) => {
      try{
        if (!!url && url !== oldURL) {
          LoadingPDF.value = true
          pdfjsLib.getDocument(url).promise.then((pdf) => {
            pdfDoc.value = pdf
            MaxPage.value = pdf.numPages
            CurrentPage.value = 1 
          }).catch(e=>{
            console.log(e)
          }).finally(() => {
            LoadingPDF.value = false
          })
        }
      }catch(e){
        console.log(e)
      }
    }, {
      immediate: true
    })
    const _this = getCurrentInstance()
    watch(() => CurrentPage.value, (val) => {
      var value = Number(String(val).replace(/[^\d]/g, ''))
      if (value > MaxPage.value) value = MaxPage.value
      if (value <= 0) value = 1
      CurrentPage.value = value 
      context.emit('pageChanged',CurrentPage.value,_this) 
      ToPage(CurrentPage.value)
    })
    function ToPage (num) {
      nextTick(() => {
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
    function nextPage () {
      if (CurrentPage.value + 1 <= MaxPage.value) {
        ++CurrentPage.value
      }
    }
    function prePage () {
      if (CurrentPage.value - 1 > 0) {
        --CurrentPage.value
      }
    }
    watch(() => Scale.value, () => {
      ToPage(CurrentPage.value)
    })
    function zoomIn () {
      // console.log('zoom in')
      Scale.value = Scale.value * 1.25
    }
    function zoomOut () {
      Scale.value = Scale.value / 1.25
    }
    function handleWheel (e) {
      e.stopPropagation()
      e.preventDefault()
      if (e.deltaY > 0) {
        nextPage()
      } else {
        prePage()
      }
    }
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
    var dragging = ref(false)
    var startX = ref(0)
    var offsetXOfLast = ref(0)
    var endX = ref(0)
    var startY = ref(0)
    var offsetYOfLast = ref(0)
    var endY = ref(0)
    function handleMouseDown (e) {
      dragging.value = true
      startX.value = e.screenX
      startY.value = e.screenY
      // console.log('handleMouseDown', e)
    }
    function handleMouseMove (e) {
      if (dragging.value) {
        endX.value = e.screenX
        e.target.parentNode.scrollLeft += -(endX.value - startX.value) - offsetXOfLast.value
        offsetXOfLast.value = -(endX.value - startX.value)
        endY.value = e.screenY
        e.target.parentNode.scrollTop += -(endY.value - startY.value) - offsetYOfLast.value
        offsetYOfLast.value = -(endY.value - startY.value)
      }
    }
    function handleMouseUp () {
      offsetXOfLast.value = 0
      offsetYOfLast.value = 0
      dragging.value = false
    }
    return {
      // PDFToolBar, 
      id,
      canvasDOM,
      pdfDoc,
      ToPage,
      Width,
      Height,
      MaxPage,
      nextPage,
      prePage,
      handleWheel,
      zoomIn,
      zoomOut,
      handleMouseDown,
      handleMouseMove,
      handleMouseUp,
      LoadingPDF
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
    z-index: 8;
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
    z-index: 9;
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