<template>
  <div
    class="bankCardDOM"
    :style="{ backgroundImage: `url(${bgimg})` }"
    ref="bankCardDOM"
    v-blur:white="bgBlur?10:`unset`"
  > 
  bgBlur:{{bgBlur}}
    <div class="header">
      <slot name="header" />
    </div>
    <div class="chip">
      <slot name="title" />
    </div>
    <div class="logo">
      <slot name="avatar" />
    </div>
    <div class="number">
      <slot name="content" />
    </div>
    <div class="expiredDate">
      <slot name="date" />
    </div>
    <div class="others">
      <slot name="others" />
    </div>
  </div>
</template>

<script>
import {
  inject,
  nextTick,
  onMounted,
  ref,
  toRef,
  watch,
} from '@vue/runtime-core'
import {getRandomBetween} from '@utils'
export default {
  setup() {
    const bgimg = inject('backgroundImage')
    const bgBlur = inject('bgBlur')
    const bankCardDOM = ref(null)
    onMounted(() => {
      nextTick(() => {
        var height = bankCardDOM.value.offsetHeight
        var width = bankCardDOM.value.offsetWidth
        bgimg.value = bgimg.value || generateBackgroundImg(width, height)
      })
    })

    function generateBackgroundImg(w, h) {
      var canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h
      var ctx = canvas.getContext('2d')
      var bgColor = '#fff'
      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, w, h)
      var colors = ['#f19790', '#f9bd10', '#66c18c', '#57c3c2' ]

      colors.map((color) => {
        var size = getRandomBetween(w, h) / getRandomBetween(2, 4)
        var x = getRandomBetween(0, w),
          y = getRandomBetween(0, h)
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2, true)
        ctx.closePath()
        ctx.fillStyle = color
        ctx.fill()
      })
      return canvas.toDataURL('base64')
    }

    return {
      bgimg,
      bgBlur,
      bankCardDOM,
    }
  },
}
</script>

<style lang="scss" scoped>
.bankCardDOM {
  position:relative;
  width: 100%;
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: inherit;
  box-sizing: border-box;
  overflow: hidden;
  background-size: inherit;
  background-position: unset !important; 
  .number{
    position: absolute;
    bottom:2em;
    font-size: 1.3em; 
    letter-spacing: .25em;
    color: #fff;
    left:50%;
    width:100%;
    transform: translateX(-50%);
    text-align: center;
  }
  .expiredDate{
    position: absolute;
    right:10px;
    bottom:10px;
  }
  .chip{
    position: absolute;
    top:50%;
    left: 10px;
  }
}
</style>
