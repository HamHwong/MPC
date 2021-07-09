<template>
  <teleport :to="appendTo">
    <div
      :class="{
      __Model_Shadow:true 
    }"
      @mousemove="handleDragging"
    >
      <div>
        <div
          :class="{
            __Model:true,
            __Modal_Draggable:draggable
          }"
          :style="{
              left:draggable?`${x}px`:null,
              top:draggable?`${y}px`:null
              }"
        >
          <div
            @mousedown="handleDrag"
            @mouseup="handleDrop"
            :class="{
            __Model_Header:true,
            Grabbing:isGrabbing
            }"
          >
            <div class="__Model_Close_Btn"></div>
          </div>
          <div class="__Model_Content">
            <slot name="default"></slot>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import { ref } from '@vue/reactivity'
// import { MODE } from './enum'
export default {
  name: 'MPModal',
  props: {
    draggable: {
      type: Boolean,
      default: () => false
    },
    appendTo:{
      type: String,
      default:()=>"body", 
    }
  },
  setup (props) {
    const isGrabbing = ref(false)
    let x = ref(null)
    let y = ref(null)
    if (props.draggable) {
      x.value = 0
      y.value = 0
    }
    function handleDrag () {
      if (props.draggable && !isGrabbing.value) {
        isGrabbing.value = true
      }
    }
    function handleDragging (e) {
      if (isGrabbing.value) {
        x.value = e.pageX - 100
        y.value = e.pageY - 11
        // console.log(x.value,y.value)
      }
    }
    function handleDrop () {
      if (props.draggable && isGrabbing.value) {
        isGrabbing.value = false
      }
    }
    return {
      isGrabbing,
      handleDrag,
      handleDragging,
      handleDrop,
      x,
      y
    }
  }
}
</script>

<style lang="scss" scoped>
[data-modal] {
  display: none;
}
.__Model_Shadow {
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100vw;
  min-height: 100vh;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  animation: __Model_Display 0.5s forwards;
  overflow: auto;
  z-index: 99999;
  &.Hiding {
    animation: __Model_Hide 0.5s forwards;
  }
  &.Hide {
    display: none;
  }
  @keyframes __Model_Display {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes __Model_Hide {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  .__Model {
    position: relative;
    background-color: #fff;
    min-width: 200px;
    min-height: 200px;
    padding: 0px 10px 10px 10px;
    border-radius: 5px;
    box-shadow: 0 0 20px #333;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    &::after {
      content: "";
      position: absolute;
      width: 10px;
      height: 10px;
      right: 0;
      bottom: 0;
      cursor: pointer;
    }
    &.__Modal_Draggable {
      .__Model_Header {
        cursor: grab !important;
        &.Grabbing {
          cursor: grabbing !important;
        }
      }
      position: absolute;
      left: 0;
      top: 0;
    }
    .__Model_Header {
      /* width: 100%; */
      height: 22px;
      margin: 0 -10px 10px -10px;
      background-color: #d42b1e;
      box-shadow: 0 0 15px rgb(155, 155, 155);
      display: flex;
      justify-content: flex-end;
      .__Model_Close_Btn {
        position: relative;
        width: 15px;
        height: 15px;
        border-radius: 15px;
        margin: 2.5px 10px;
        transition: background 0.5s;
        background: rgb(201, 2, 2);
        border: 1px solid rgb(184, 0, 0);
        /* box-shadow: 0 0 0 rgb(88, 5, 5) inset; */
        cursor: pointer;
        &::after {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          background-image: url("./Assets/image/close.svg");
          background-size: contain;
          background-repeat: no-repeat;
          width: 6px;
          height: 6px;
          margin: 4.5px;
          box-shadow: 0 0 0 rgb(88, 5, 5) inset;
        }
        &:hover {
          background: rgb(139, 4, 4);
          &::after {
            box-shadow: 0 0 1px rgb(26, 26, 26) inset;
          }
        }
      }
    }
    .__Model_Content {
      overflow: auto;
    }
  }
}
</style>