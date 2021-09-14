<template>
  <div
    :class="{
      'gallery-item-container': true,
    }"
  >
    <div class="gallery-pic">
      <slot name="img"> 
        <!-- <div class="gallery-pic-img" :style="{backgroundImage:`url(${image})`}"></div> -->
        <img :src="image" style="width:100%" alt="">
      </slot>
    </div>
    <div class="gallery-body">
      <slot name="default"> 
      </slot> 
    </div>
  </div>
</template>

<script>
import { inject } from 'vue'
export default {
  setup() {
    const image = inject('image')
    return {
      image,
    }
  },
}
</script>

<style lang="scss" scoped>
.gallery-pic{
  .gallery-pic-img{
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: contain;
  }
}
</style>
