<template>
  <div :class="{
      Thumbs_Wrapper: true,
      unfold: !isFold,
    }">
    <div
      class="Thumbs_Inner_Wrapper"
      :style="{ height: `${height}px` }"
      @mousewheel="handleRenderThumb"
    > 
      <Thumb
        @click="handleToPage(i.Page)"
        v-for="(i,index) in ThumbsArr"
        :page="i.Page"
        :isSelected="i.Page === CurrentPage"
        :hasRendered="i.hasRendered"
        :key="i.Page" 
        :ref="(el) => {
          ThumbsArr[index].ref = el
        }"
        :PDF="PDFFile"
      />
    </div>
    <div
      @click="toggleThumbs"
      class="Thumbs_Handler"
    >
      <font-awesome-icon :icon="isFold ? 'angle-right' : 'angle-left'" />
      导航栏
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRef, toRefs } from '@vue/reactivity'
import { isElementInViewport } from '@utils/index.js'
import { inject,watch } from '@vue/runtime-core'
import Thumb from './thumb.vue'
export default {
  name: 'PDFThumbs',
  props: {
    PDF: {
      type: Object,
      default: () => null,
    },
    height: {
      type: Number,
      default: () => 0,
    },
    maxPage:{
      type:Number,
      default:()=>0
    }
  },
  components:{Thumb},
  emits: ['ToPage'],
  setup (props, ctx) {
    const isFold = ref(true)
    function toggleThumbs () {
      isFold.value = !isFold.value
    } 
    const CurrentPage = inject('CurrentPage')
    const ThumbsArr = ref([]) 
    watch(() => props.maxPage, (val) => { 
      for (var i = 0; i < val; i++) {
        ThumbsArr.value.push({
          Page: i + 1,
          hasRendered:false
        })
      }
      console.log(ThumbsArr.value)
    })
    function handleRenderThumb (e) {
      for (var i = 0; i < ThumbsArr.value.length; i++) { 
        if (isElementInViewport(ThumbsArr.value[i].ref.$el, e.target) && !ThumbsArr.value[i]['hasRendered']) {
          ThumbsArr.value[i]['hasRendered'] = true  
        }
      }
    }
    function handleToPage (page) {
      ctx.emit('ToPage', page)
      ThumbsArr.value[page-1].isSelected = true
    }
    let PDFFile = ref(null)
    watch(()=>props.PDF,(pdf)=>{
      if(pdf){ 
        console.log(pdf)
        PDFFile.value=pdf
      }
    })

    return {
      isFold,
      toggleThumbs,
      handleRenderThumb, 
      CurrentPage,
      handleToPage,
      ThumbsArr,
      PDFFile
    }
  },
}
</script>
<style lang="scss" scoped>
.Thumbs_Wrapper {
  width: 0px;
  margin-right: -200px;
  position: relative;
  background: rgb(145, 145, 145);
  /* overflow-y: auto;  */
  transition: width 0.5s ease-in-out;
  &.unfold {
    width: 200px;
  }
  .Thumbs_Handler {
    position: absolute;
    right: -25px;
    top: 0;
    letter-spacing: 4px;
    top: 50%;
    transform: translateY(-50%);
    padding: 10px 2.5px;
    writing-mode: vertical-rl;
    font-size: 8px;
    color: #fff;
    line-height: 20px;
    text-align: center;
    background-color: rgb(66, 66, 66);
    border-radius: 0 10px 10px 0px;
    cursor: pointer;
  }
  .Thumbs_Inner_Wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    .Thumb {
      background-color: #333333;
      margin: 20px;
      &.selected {
        border: 10px solid rgba(255, 255, 255, 0.582);
        margin: 10px;
      } 
    }
  }
}
</style>
