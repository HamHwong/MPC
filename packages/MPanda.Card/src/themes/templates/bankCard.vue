<template>
  <div
    class="bankCardDOM"
    :style="{ backgroundImage: `url(${bgimg})` }"
    ref="bankCardDOM"
    v-blur
  > 
    <slot name="header" />
    <slot name="title" />
    <slot name="avatar" />
    <slot name="content" />
    <slot name="date" />
    <slot name="others" />
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
export default {
  setup() {
    const bgimg = inject('backgroundImage')
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
      var colors = ['#f19790', '#f9bd10', '#66c18c', '#57c3c2', '#d276a3']

      function getRandomBetween(num1, num2) {
        var max = Math.max(num1, num2)
        var min = max === num1 ? num2 : num1
        parseInt(Math.random() * (max - min + 1) + min, 10)
        return Math.floor(Math.random() * (max - min + 1) + min)
      }

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
      bankCardDOM,
    }
  },
}
</script>

<style lang="scss" scoped>
.bankCardDOM {
  width: 100%;
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: inherit;
  box-sizing: border-box;
  overflow: hidden;
  background-size: inherit;
  background-position: unset !important;
}
</style>
