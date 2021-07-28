<template>
  <div :class="{
    Thumbs_Wrapper:true,
    unfold:!isFold
  }">
    <div class="Thumbs_Inner_Wrapper" @mousewheel="handleRenderThumb">

    </div>
    <div @click="toggleThumbs" class="Thumbs_Handler">
      <font-awesome-icon :icon="isFold?'angle-right':'angle-left'" />
      导航栏
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import {isElementInViewport} from '@utils/index.js'
export default {
  name: 'PDFThumbs',
  props:{
    PDF:{
      type:Object,
      default:()=>{}
    }
  },
  setup () {
    const isFold = ref(true)
    function toggleThumbs(){
      isFold.value = !isFold.value
    }
    function handleRenderThumb(e){
      // isElementInViewport(e.target)
    }
    
    return {
      isFold,
      toggleThumbs,
      handleRenderThumb
    }
  }
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