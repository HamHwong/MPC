<template>
  <div :class="{ Thumb: true, selected: isSelected }">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import { ref, watch } from '@vue/runtime-core'
export default {
  props: {
    page: {
      type: Number,
      default: () => 0
    },
    isSelected: {
      type: Boolean,
      default: () => false
    },
    hasRendered: {
      type: Boolean,
      default: () => false
    },
    PDF: {
      type: Object,
      default: () => null,
    },
  },
  setup (props, context) {
    const canvas = ref(null) 
    const PDFLoaded = ref(false)
    const PDFFile = ref(null)
    watch(() => props.PDF, (PDF) => {
      // console.log(PDF)
      if (PDF) {
        PDFFile.value = PDF
        PDFLoaded.value = true 
      }
    },{immediate:true}) 
    watch(() => props.hasRendered, (val) => {
      try{
        if (val && PDFLoaded.value) {
          var ctx = canvas.value.getContext('2d')
          PDFFile.value.getPage(props.page).then(function (page) {
            var desiredHeight = 120;
            var viewport = page.getViewport({ scale: 1 });
            var scale = desiredHeight / viewport.height;
            var scaledViewport = page.getViewport({ scale: scale, });
            canvas.value.height = scaledViewport.height;
            canvas.value.width = scaledViewport.width;
            var renderContext = {
              canvasContext: ctx,
              viewport: scaledViewport
            };
            var renderTask = page.render(renderContext);
            renderTask.promise.then(function () {
              // ThumbsArr.value[i]['hasRendered'] = true
              context.emit('PageRendered', page)
            }).catch(e => {
              console.log(e)
              // ThumbsArr.value[i]['hasRendered'] = false
              context.emit('PageRenderedFailed', page)
            })
          }).catch(e=>{
            console.log(e)
          })
        }
      }catch(e){
        console.log(e)
      }
    })
    return {
      canvas
    }
  }
}
</script>
<style lang="scss" scoped>
.Thumb {
  canvas {
    max-width: 140px;
  }
}
</style>