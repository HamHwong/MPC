<template>
  <div>
    <div style="width:400px;margin:0 auto;background-color:#eee;">
      <MPCarousel @click="handleClick" :value="data" />
    </div>
    <div>
      <div style="width:100px" v-tooltips>
        鼠标移上来
      </div>
    </div>
    <div style="display:flex">
      <MPCard
        type="userInfo"
        style="margin:10px"
        v-for="i in 5"
        :key="i"
        v-suspend:debug
      >
        {{ i }}
        <template #header>Heeader</template>
      </MPCard>
    </div>
    <MPModal
      :visible="modalVisibility"
      @close="() => (modalVisibility = false)"
      draggable
      resizeable
      :position="{
        x: 100,
        y: 0,
      }"
    >
      <MPPdfReader @pageChanged="handlePageChanged" pdfurl="/pdf.pdf" />
    </MPModal>
    <button @click="handleModalDisplay">click</button>
    <div
      style="width: 800px;box-shadow: 0 0 50px #333;margin:0 auto;margin-top: 20px;border-radius: 5px;overflow: hidden;"
    >
      <MPPdfReader pdfurl="/pdf.pdf" />
    </div>

    <div>
      <div>
        <span>{{ isInViewPort }}</span>
        <div
          @wheel="handleWheel"
          style="width:50%;
            height:300px;
            background-color:#333;
            overflow-y:auto;
            color:#fff;"
        >
          <div
            ref="el"
            style="width:50px;
            height:50px;
            background-color:#fff;
            margin-top:1000px;
            margin-bottom:1000px;
            margin-left:auto;
            margin-right:auto;
            font-size:8px;
            text-align:center;
            box-shadow:rgb(204 204 204) 0px 0px 20px;
            border-radius:10px"
          >
            到了
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import { emit } from '../packages/Mpanda.Utils'
import { isElementInViewport } from '../packages/Mpanda.Utils'
import { nextTick } from '@vue/runtime-core'

export default {
  name: 'App',
  setup() {
    const modalVisibility = ref(false)
    const data = reactive([
      {
        order: 0,
        label: '1',
        pic: '/images/img.jpg',
        width: 400,
      },
      {
        order: 0,
        label: '1',
        pic: '/images/img.jpg',
        width: 400,
      },
      {
        order: 0,
        label: '1',
        pic: '/images/img.jpg',
        width: 400,
      },
      {
        order: 0,
        label: '1',
        pic: '/images/img.jpg',
        width: 400,
      },
      {
        order: 0,
        label: '1',
        pic: '/images/img.jpg',
        width: 400,
      },
      {
        order: 0,
        label: '1',
        pic: '/images/img.jpg',
        width: 400,
      },
      {
        order: 0,
        label: '1',
        pic: '/images/img.jpg',
        width: 400,
      },
    ])
    function handleClick(a, b, c) {
      console.log(a, b, c)
    }
    function handleModalDisplay() {
      modalVisibility.value = true
    }
    function handlePageChanged(page, _this) {
      emit('modelResize', _this)
      emit('modelFitToContent', _this)
    }

    const isInViewPort = ref(false)
    const el = ref(null)
    function handleWheel(e) {
      nextTick(() => {
        isInViewPort.value = isElementInViewport(e.target, el.value)
      })
    }

    return {
      modalVisibility,
      handleClick,
      handleModalDisplay,
      handlePageChanged,
      data,
      el,
      handleWheel,
      isInViewPort,
    }
  },
}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
