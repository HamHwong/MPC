<template>
  <div>
    <div style="width:400px;margin:0 auto;background-color:#eee;">
      <MPCarousel
        @click="handleClick"
        :value="data"
      />
    </div>
    <div>
      <div
        style="width:100px"
        v-tooltips
      >
        鼠标移上来
      </div>
    </div>
    <div style="display:flex">
      <div
        v-for="i in 5"
        :key="i"
        style="width:100px;height:100px;box-shadow:0 0 20px #ccc;border-radius:10px;margin:10px"
        v-suspend:debug
      ></div>
    </div>
    <MPModal
      :visible="modalVisibility"
      @close="()=>modalVisibility=false"
      draggable
      resizeable
      :position="{
        x:100,
        y:0
      }"
    >
      <MPPdfReader
        @pageChanged="handlePageChanged"
        pdfurl="/pdf.pdf"
      />
    </MPModal>
    <button @click="handleModalDisplay">click</button>
    <div style="width: 800px;box-shadow: 0 0 50px #333;margin:0 auto;margin-top: 20px;border-radius: 5px;overflow: hidden;">
      <MPPdfReader pdfurl="/pdf.pdf" />
    </div>
  </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import {emit} from '../packages/Mpanda.Utils'

export default {
  name: 'App',
  setup () {
    const modalVisibility = ref(false)
    const data = reactive([{
      order: 0,
      label: '1',
      pic: '/images/img.jpg',
      width: 400,
    }, {
      order: 0,
      label: '1',
      pic: '/images/img.jpg',
      width: 400,
    }, {
      order: 0,
      label: '1',
      pic: '/images/img.jpg',
      width: 400,
    }, {
      order: 0,
      label: '1',
      pic: '/images/img.jpg',
      width: 400,
    }, {
      order: 0,
      label: '1',
      pic: '/images/img.jpg',
      width: 400,
    }, {
      order: 0,
      label: '1',
      pic: '/images/img.jpg',
      width: 400,
    }, {
      order: 0,
      label: '1',
      pic: '/images/img.jpg',
      width: 400,
    }])
    function handleClick (a, b, c) { console.log(a, b, c) }
    function handleModalDisplay () {
      modalVisibility.value = true
    }
    function handlePageChanged (page, _this) {
      emit('modelResize',_this) 
      emit('modelFitToContent',_this)  
    }
    return {
      modalVisibility,
      handleClick,
      handleModalDisplay,
      handlePageChanged,
      data
    }
  }
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
