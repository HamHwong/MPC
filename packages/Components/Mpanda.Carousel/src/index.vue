<template>
  <div ref="container" :style="{ minWidth: `${containerMinWidth * 2}px` }">
    <div
      class="__Carousel"
      :style="{
        height: height || `300px`,
        minHeight: `${
          containerMinHeight && containerMinHeight > 300
            ? containerMinHeight
            : 300
        }px`,
      }"
    >
      <section
        v-for="(item, index) in data"
        :class="{
          slide: true,
          left: checkPosition(index, 'left'),
          active: checkPosition(index, 'active'),
          right: checkPosition(index, 'right'),
        }"
        :style="{
          zIndex: zIndex(index),
          marginRight: checkPosition(index, 'left') ? setMargin() : null,
          marginLeft: checkPosition(index, 'right') ? setMargin() : null,
        }"
        :key="index"
        @mouseover="doPause"
        @mouseout="doContinue"
        @mouseup="handleClick($event, value[index], index)"
        @click="focusOn(index)"
      >
        <figure>
          <img
            :src="item.pic"
            :style="{
              width:
                item.width && item.width !== 0 ? `${item.width}px` : '100%',
              height:
                item.height && item.height !== 0 ? `${item.height}px` : null,
            }"
            :ref="(el) => (imgDOMs[index] = el)"
          />
        </figure>
      </section>
      <div @click="toLeft" class="slide-arrow left"></div>
      <div @click="toRight" class="slide-arrow right"></div>
      <div v-if="indicators" class="slide-indicators">
        <i
          @click="focusOn(index)"
          v-for="(i, index) in value"
          :key="index"
          :class="{
            'slide-indicator': true,
            active: index === currentSectionPos,
          }"
          @mouseover="doPause"
          @mouseout="doContinue"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, onBeforeUnmount, ref, nextTick, reactive, watch } from 'vue'
import { SizeNumberValidator } from '@validators'
export default {
  name: 'MPCarousel',
  props: {
    value: {
      type: Array,
      default: () => [],
      required: true,
    },
    indicators: {
      type: Boolean,
      default: () => false,
    },
    height: {
      type: [String,null],
      default: () => null,
      validator: SizeNumberValidator,
    },
  },
  emits: ['click', 'pause', 'continue', 'next', 'previous'],
  setup(props, context) {
    const container = ref(null)
    var data = reactive([])
    var imgDOMs = ref([])
    watch(
      () => props.value,
      (val) => {
        var sortedArr = val.sort((pre, next) => pre.order - next.order)
        sortedArr.map((i) => data.push(i))
      },
      {
        immediate: true,
      }
    )
    watch(
      () => imgDOMs.value,
      (imgs) => {
        nextTick(() => {
          containerMinWidth.value = Math.max(...imgs.map((img) => img.width))
        }).then(() => {
          nextTick(() => {
            // imgs.map(img => console.log(img.height))
          })
        })
      },
      { immediate: true }
    )
    var currentSectionPos = ref(0)
    var pause = ref(false)
    var playTimer = ref(null)
    var intervalTime = ref(4000)
    var containerMinWidth = ref(0)
    var containerMinHeight = ref(0)
    var focusOn = (index) => {
      currentSectionPos.value = index
    }
    var convert = (number) => {
      if (typeof number === 'number') {
        return `${number}px`
      }
      if (typeof number === 'string') {
        if (number.indexOf('%') > 0) {
          return `${number.split('%')[0]}%`
        } else {
          return number
        }
      }
    }
    var doPause = () => {
      context.emit('pause', currentSectionPos.value)
      pause.value = true
    }
    var doContinue = () => {
      context.emit('continue', currentSectionPos.value)
      pause.value = false
    }
    var play = () => {
      clearTimeout(playTimer.value)
      playTimer.value = setTimeout(function() {
        if (!pause.value) {
          if (containerMinHeight.value === 0) {
            nextTick(() => {
              containerMinHeight.value = Math.max(
                ...imgDOMs.value.map((img) => {
                  if (img.height) {
                    return img.height
                  } else return 0
                })
              )
            })
          }
          var newPos = (currentSectionPos.value + 1) % data.length
          focusOn(newPos)
        }
        play()
      }, intervalTime.value)
    }
    var toRight = () => {
      var newPos = (currentSectionPos.value + 1) % data.length
      context.emit('next', newPos)
      focusOn(newPos)
      clearTimeout(playTimer.value)
      play()
    }
    var toLeft = () => {
      var newPos = (currentSectionPos.value + data.length - 1) % data.length
      context.emit('previous', newPos)
      focusOn(newPos)
      clearTimeout(playTimer.value)
      play()
    }
    var zIndex = (index) => {
      var result = 0
      if (currentSectionPos.value > index) {
        result = index
      } else if (currentSectionPos.value < index) {
        result = data.length - (index - currentSectionPos.value)
      } else {
        result = data.length
      }
      return result
    }
    var handleClick = ($event, item, index) => {
      context.emit('click', $event, item, index)
    }
    function checkPosition(index, pos) {
      pos = pos.toLowerCase()
      if (currentSectionPos.value > index) {
        return pos === 'left'
      } else if (currentSectionPos.value === index) {
        return pos === 'active'
      } else {
        return pos === 'right'
      }
    }
    function setMargin() {
      var result = -49
      return `${result}%`
    }
    onMounted(() => {
      nextTick(() => {
        play()
      })
    })
    onBeforeUnmount(() => { 
      clearTimeout(playTimer.value)
    })
    return {
      currentSectionPos,
      focusOn,
      toLeft,
      toRight,
      doPause,
      doContinue,
      zIndex,
      handleClick,
      convert,
      data,
      checkPosition,
      setMargin,
      container,
      containerMinWidth,
      containerMinHeight,
      imgDOMs,
    }
  },
}
</script>

<style lang="scss" scoped>
.__Carousel {
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: row;
  cursor: pointer;
  overflow: hidden;
  .slide {
    flex: 1;
    border-radius: 5px;
    transition: all 0.5s;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    filter: blur(2px);
    /* 强制开启gpu加速 */
    will-change: transform;
    transform: translateZ(0);
    user-select: none;
    &.active {
      pointer-events: none;
      filter: none;
      @media (max-width: 700px) {
        flex: 5;
      }

      @media (min-width: 700px) and (max-width: 1080px) {
        flex: 4;
      }

      @media (min-width: 1080px) {
        flex: 2;
      }
    }
    &.left {
      transform: rotate3d(3, 10, 1, 45deg);
      // margin-right: -18%;
    }
    &.right {
      transform: rotate3d(3, -10, -1, 45deg);
      // margin-left: -18%;
    }

    & > figure {
      margin: 0;
      padding: 0;
      border: none;
      display: flex;
      justify-content: center;
      & > * {
        background-color: #fff;
        box-shadow: 0px 0px 20px #363636;
        pointer-events: all;
      }
    }
  }
  .slide-arrow {
    position: absolute;
    z-index: 9;
    background-color: rgba(0, 0, 0, 0.2);
    color: #fff;
    line-height: 45px;
    font-size: 50px;
    height: 50px;
    width: 50px;
    border-radius: 25px;
    box-sizing: content-box !important;
    &:hover {
      background-color: rgba(0, 0, 0, 0.5);
    }
    &.left {
      display: flex;
      align-items: baseline;
      justify-content: flex-end;
      padding-right: 10px;
      left: -30px;
      &::before {
        content: '‹';
        align-items: center;
        box-sizing: content-box;
      }
    }
    &.right {
      display: flex;
      align-items: baseline;
      justify-content: flex-start;
      padding-left: 10px;
      right: -30px;
      &::before {
        content: '›';
        align-items: center;
        box-sizing: content-box;
      }
    }
  }
  .slide-indicators {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 10px;
    width: 100%;
    .slide-indicator {
      width: 5px;
      height: 5px;
      overflow: hidden;
      background: #fff;
      box-shadow: 0 0 10px #333;
      margin: 5px;
      z-index: 9;
      border-radius: 50%;
      &.active {
        width: 8px;
        height: 8px;
      }
    }
  }
}
</style>
