<template>
  <div>
    <Component1 v-bridge:a v-blur></Component1>
    <Component2 v-bridge:a></Component2>
    <div style="width:400px;background-color:#eee;">
      <MPCarousel @click="handleClick" :value="data" />
    </div>
    <div>
      <div style="width:100px" v-tooltips>
        鼠标移上来
      </div>
    </div>
    <MRow
      direction="row"
      justify="between"
      align="center"
      alignContent="between"
    >
      <MCol :span="4" :xs="24">
        <MPCard :avatar="avatar" type="userinfo">
          <template #title>title</template>
          <template #content>content</template>
          <template #others>others</template>
        </MPCard>
      </MCol>

      <MCol :span="{ xs: 12, FHD: 12 }" :xs="5" :offset="8">
        <MPCard
          :radius="`20px`"
          type="bankCard"
          style="width:350px;height:200px;color:#fff;"
          backgroundImage="/images/img3.jpg"
          :bgBlur="false"
          v-bridge:a
          v-copy:click="
            (a, window) => {
              window.console.log(this.directives, this.dir)
            }
          "
        >
          <template #header>
            <div
              style="display:flex;justify-content: space-between;flex:1; align-items: center;"
            >
              <span style="font-size:12px;">WORD ELITE</span>
              <span>
                <img src="./assets/images/mastercard/wave.png" :width="15" />
              </span>
            </div>
          </template>
          <template #avatar>
            <img
              src="./assets/images/mastercard/mastercard.png"
              :width="35"
              :height="35"
              style="margin:0px 5px 0px 0px;"
              alt=""
            />
          </template>
          <template #content>5412 7512 3412 3456</template>
          <template #date
            ><small style="font-size:0.5rem">VALID THAU</small> 12/23</template
          >
          <template #others
            ><small style="font-size:12px">LEE M. CARDHOLDER</small></template
          >
        </MPCard>
      </MCol>

      <MCol :span="10">
        <MPCard
          :radius="`20px`"
          type="bankCard"
          style="width:350px;height:200px;"
          :bgBlur="false"
        >
          <template #header>
            <div
              style="display:flex;justify-content: space-between;flex:1; align-items: center;"
            >
              <span style="font-size:12px;">WORD ELITE</span>
              <span>
                <img src="./assets/images/mastercard/wave.png" :width="15" />
              </span>
            </div>
          </template>
          <template #avatar>
            <img
              src="./assets/images/mastercard/mastercard.png"
              :width="35"
              :height="35"
              style="margin:0px 5px 0px 0px;"
              alt=""
            />
          </template>
          <template #content>5412 7512 3412 3456</template>
          <template #date
            ><small style="font-size:0.5rem">VALID THAU</small> 12/23</template
          >
          <template #others
            ><small style="font-size:12px">LEE M. CARDHOLDER</small></template
          >
        </MPCard>
      </MCol>

      <MCol>
        <MPCard
          :radius="`20px`"
          type="bankCard"
          style="width:350px;height:200px"
        >
          <template #header>
            <div
              style="display:flex;justify-content: space-between;flex:1; align-items: center;"
            >
              <span style="font-size:12px">WORD ELITE</span>
              <span>
                <img src="./assets/images/mastercard/wave.png" :width="15" />
              </span>
            </div>
          </template>
          <template #avatar>
            <img
              src="./assets/images/mastercard/mastercard.png"
              :width="35"
              :height="35"
              style="margin:0px 5px 0px 0px;"
              alt=""
            />
          </template>
          <template #content>5412 7512 3412 3456</template>
          <template #date
            ><small style="font-size:0.5rem">VALID THAU</small> 12/23</template
          >
          <template #others
            ><small style="font-size:12px">LEE M. CARDHOLDER</small></template
          >
        </MPCard>
      </MCol>
    </MRow>
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

    <div
      style="background:url(/images/img.jpg) no-repeat;
                width:400px;
                height:400px;
                padding:50px;
                background-size:cover;"
    >
      <div
        style=" 
        width:100px;
        height:100px; 
        box-shadow:0 0 20px #ccc;
        border-radius:10px;"
        v-blur
      >
        ssss
      </div>
    </div>
    <div
      style="
          background:url(/images/img.jpg) no-repeat;
          background-size:cover; 
          height:400px;
          width: 250px"
    >
      <div
        style="
          width:300px;
          height:300px; 
          box-shadow:0 0 20px #ccc;
          top:100px;
          left:100px;"
        v-blur
      >
        ssss
      </div>
    </div>

    <MPCard style="background-color:#fff;">
      <span>You can custom your own card.</span>
    </MPCard>

    <div style="width:700px;margin:20px">
      <MPWaterFall column="3" type="center" height="300px">
        <MPCard
          :radius="`10px`"
          type="gallery"
          style="margin:5px"
          v-for="i in 20"
          :key="i"
          :image="`/images/img${i % 4 == 0 || i % 4 == 1 ? '' : i % 4}.jpg`"
        >
          <div style="padding:10px;position:relative">
            <div>
              <i>
                <font-awesome-icon :icon="['far', 'heart']" />
              </i>
            </div>
            <div>
              Name
            </div>
          </div>
        </MPCard>
      </MPWaterFall>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { isElementInViewport } from '../packages/Utils'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import mpc from '../packages'
import { nextTick } from 'vue'
import Component1 from './components/component1.vue'
import Component2 from './components/component2.vue'

export default {
  name: 'App',
  components: {
    Component1,
    Component2,
    FontAwesomeIcon,
  },
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
      console.log(page, _this)
    }

    const isInViewPort = ref(false)
    const el = ref(null)
    function handleWheel(e) {
      nextTick(() => {
        isInViewPort.value = isElementInViewport(e.target, el.value)
      })
    }
    const avatar = ref(null)
    setTimeout(() => {
      avatar.value = 'https://mpanda.studio/assets/images/logo.png'
    }, 5000)
    mpc.on('$copy', (val) => {
      console.log('onthis:', val)
    })
    // console.log('on,emit',mpc.on,mpc.emit)

    return {
      modalVisibility,
      handleClick,
      handleModalDisplay,
      handlePageChanged,
      data,
      el,
      handleWheel,
      isInViewPort,
      avatar,
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
body {
  margin: 0;
  padding: 0;
  border: none;
}
</style>
