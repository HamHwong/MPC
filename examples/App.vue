<template>
  <div>
    <div style="width:30%;margin:0 auto;background-color:#eee;">
      <MPCarousel
      v-suspend
        @click="handleClick"
        :value="data"
      />
    </div>

    <div
      id="modal_container"
      style="width:100px;height:100px;marign-left:20px;overflow:hidden;background-color:red"
      v-tooltips="'sssss'"
      v-suspend
    >
    </div>
    <div style="display:flex">
      <div v-for="i in 5" :key="i" style="width:100px;height:100px;box-shadow:0 0 20px #ccc;border-radius:10px;margin:10px" v-suspend></div>
    </div>
    <MPModal
      :visible="modalVisibility"
      @close="()=>modalVisibility=false"
      draggable
      resizeable
      tap-shadow-to-close
    >
      props:
      <p>
        Draggable
      </p>
      <p>
        Resizeable
      </p>
      <p>
        Center (will overwrite draggable and resizeable)
      </p>
      <div style="width:800px;height:600px"></div>
    </MPModal>
    <button @click="handleModalDisplay">click</button>
  </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'

export default {
  name: 'App',
  setup () {
    const modalVisibility = ref(false)
    const data = reactive([{
      order: 0,
      label: '1',
      pic: require('./assets/images/img.jpg'),
    }, {
      order: 1,
      label: '1',
      pic: require('./assets/images/img.jpg'),
    }])
    function handleClick (a, b, c) { console.log(a, b, c) }
    function handleModalDisplay () {
      modalVisibility.value = true
    }
    return {
      modalVisibility,
      handleClick,
      handleModalDisplay,
      data
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
