<template>
  <!-- <teleport :to="appendTo"> -->
  <div
    :class="{
      __Model_Shadow:true ,
      Hiding:status===STATUS.HIDING,
      Hide:status===STATUS.HIDE
    }"
    @mousemove="handleDragging($event);handleResizeMove($event)"
    @mouseup="endResize"
    @click.stop="(e)=>{tapShadowToClose&&!isResizing&&handleClose(e)}"
  >
    <div
      :class="{
          __Model_Wrapper:true
        }"
      @click.stop=""
    >
      <div
        :class="{
            __Model:true,
            __Modal_Draggable:draggable&&!center ,
            __Auto_Resizing:isAutoResizing
          }"
        :style="{
              left:draggable&&!center?`${x}px`:null,
              top:draggable&&!center?`${y}px`:null,
              width:resizeable&&!center?(w!=='unset'?`${w}px`:w):null,
              height:resizeable&&!center?`${h}px`:null,
              maxHeight:MaxHeight,
              maxWidth:maxWidth?`${maxWidth}px`:null
              }"
      >
        <div
          @mousedown="handleDrag"
          @mouseup="handleDrop"
          :class="{
            __Model_Header:true,
            Grabbing:isGrabbing
            }"
          :style="{
              height:`${headerHeight}px`
            }"
        >
          <div
            @click="handleClose"
            class="__Model_Close_Btn"
          ></div>
        </div>
        <div class="__Model_Content">
          <div ref="contentContainer">
            <slot name="default"></slot>
          </div>
        </div>
        <div
          :class="{ 
            __Model_Resize:true, 
            Handler_Right:true, 
          }"
          v-if="resizeable"
          @mousedown="handleResize($event,DIRECTION.X)"
        />
        <div
          :class="{ 
            __Model_Resize:true, 
            Handler_Bottom:true
          }"
          v-if="resizeable"
          @mousedown="handleResize($event,DIRECTION.Y)"
        />
        <div
          :class="{
            __Model_Resize:true, 
            Handler_Cross:true
          }"
          v-if="resizeable"
          @mousedown="handleResize($event,DIRECTION.CROSS)"
          @dblclick="handleFullContentSize"
        />
      </div>
    </div>
  </div>
  <!-- </teleport> -->
</template>

<script> 
import { DIRECTION, STATUS } from './enum'
import { nextTick, watch, ref } from 'vue'
export default {
  name: 'MPModal',
  props: {
    draggable: {
      type: Boolean,
      default: () => false
    },
    resizeable: {
      type: Boolean,
      default: () => false
    },
    // appendTo: {
    //   type: String,
    //   default: () => "body",
    // },
    width: {
      type: Number,
      default: () => 0
    },
    height: {
      type: Number,
      default: () => 0
    },
    maxHeight: {
      type: Number,
      default: () => null
    },
    maxWidth: {
      type: Number,
      default: () => null
    },
    position: {
      type: Object,
      default: () => {
        return {
          x: 0,
          y: 0
        }
      }
    },
    visible: {
      type: Boolean,
      default: () => false,
      required: true
    },
    center: {
      type: Boolean,
      default: () => false
    },
    tapShadowToClose: {
      type: Boolean,
      default: () => false
    }
  },
  emits: ['close', 'display'],
  setup (props, context) {
    const status = ref(STATUS.HIDE)
    const display = ref(false) 
    watch(() => props.visible, (isVisible) => {
      display.value = isVisible
      if(isVisible){
        handleShow()
      }else{
        handleClose()
      }
    })
    const MaxHeight = ref(0)
    watch(() => status.value, (val) => {
      if (val === STATUS.DISPLAY) {
        nextTick(() => {
          checkAndLimitContentMaxHeight()
        })
      }
    })
    function handleShow(){
        status.value = STATUS.DISPLAY
        context.emit('display') 
        if (!props.height) {
          setTimeout(() => {
            handleToMaxHeight()
          }, 100)
        }
        if(!props.width){
          setTimeout(() => {
            w.value='unset'
          }, 100)
        }
    } 
    const contentContainer = ref(null)
    const isVisible = ref(false)
    const isGrabbing = ref(false)
    const isResizing = ref(false)
    let x = ref(props.position.x)
    let y = ref(props.position.y)
    let w = ref(props.width)
    let h = ref(props.height)
    let headerHeight = 22;
    var Mouse_OffsetX = ref(0)
    var Mouse_StartY = ref(0)
    function checkAndLimitContentMaxHeight () {
      var result = null 
      if (props.maxHeight && props.maxHeight > 0) {
        result = `${props.maxHeight}px`
      } else if(props.height){
        result = 'unset'
      }else if (contentContainer.value) {
        result = 'unset'
        nextTick(() => {
          MaxHeight.value = `${contentContainer.value.offsetHeight + headerHeight - 10}px`
        })
      }
      MaxHeight.value = result
    }
    function handleDrag (e) {
      if (props.draggable && !isGrabbing.value) {
        isGrabbing.value = true
        Mouse_OffsetX.value = x.value - e.pageX
        Mouse_StartY.value = y.value - e.pageY
      }
    }
    function handleDragging (e) {
      if (isGrabbing.value) {
        x.value = e.pageX + Mouse_OffsetX.value
        y.value = e.pageY + Mouse_StartY.value
        if (x.value < 0) x.value = 0
        if (y.value < 0) y.value = 0
        if (e.button === 0 && e.buttons === 0) {
          isGrabbing.value = false
        }
      }
    }
    function handleDrop () {
      if (props.draggable && isGrabbing.value) {
        isGrabbing.value = false
        Mouse_OffsetX.value = 0
        Mouse_StartY.value = 0
      }
    }
    const Direction = ref(null)
    const startHeight = ref(0)
    function handleResize (e, direction) {
      e.preventDefault()
      e.stopPropagation()
      if (props.resizeable && !isResizing.value) {
        isResizing.value = true
        Direction.value = direction
        startHeight.value = h.value
        // Mouse_OffsetX.value = x.value - e.pageX
        Mouse_StartY.value = e.clientY
      }
    }
    function endResize (e) {
      e.preventDefault()
      e.stopPropagation()
      if (props.resizeable && isResizing.value) {
        setTimeout(() => {
          isResizing.value = false
        }, 100);
      }
    }
    function handleResizeMove (e) {
      if (props.resizeable && isResizing.value) {
        checkAndLimitContentMaxHeight()
        switch (Direction.value) {
          case DIRECTION.X:
            w.value = e.clientX - x.value
            break;
          case DIRECTION.Y:
            h.value = e.clientY - Mouse_StartY.value + Number(startHeight.value )
            break;
          case DIRECTION.CROSS:
            w.value = e.clientX - x.value
            h.value = e.clientY - Mouse_StartY.value +Number( startHeight.value)
            break;
        }
      }
    }
    function handleClose (e) {
      if(e){
        e.stopPropagation()
        e.preventDefault()
      }
      status.value = STATUS.HIDING
      setTimeout(() => { 
        status.value = STATUS.HIDE  
        display.value = false
        context.emit('close') 
      }, 500);
    }
    const isAutoResizing = ref(false)
    function handleToMaxHeight () { 
      isAutoResizing.value = true
      nextTick(() => {
        h.value = Number(MaxHeight.value.toString().split('px')[0])
        setTimeout(() => {
          isAutoResizing.value = false
        }, 500);
      })
    }
    function handleFullContentSize () {
      isAutoResizing.value = true
      nextTick(() => {
        x.value = 0
        y.value = 0
        w.value = props.maxWidth ? props.maxWidth : document.documentElement.clientWidth - 20
        h.value = Number(MaxHeight.value.toString().split('px')[0])
        setTimeout(() => {
          isAutoResizing.value = false
        }, 500);
      })
    }
    return {
      isGrabbing,
      handleDrag,
      handleDragging,
      handleDrop,
      x,
      y,
      w,
      h,
      handleResize,
      endResize,
      DIRECTION,
      handleResizeMove,
      headerHeight,
      isVisible,
      status,
      STATUS,
      handleClose,
      isResizing,
      MaxHeight,
      contentContainer,
      handleFullContentSize,
      isAutoResizing,
      handleToMaxHeight
    }
  }
}
</script>

<style lang="scss" scoped>
[data-modal] {
  display: none;
}
.__Model_Shadow {
  position: fixed;
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
  .__Model_Wrapper {
    // position:relative;
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
      &.__Auto_Resizing {
        transition: height 0.5s ease, width 0.5s ease;
      }
      &.__Modal_Draggable {
        .__Model_Header {
          cursor: grab !important;
          &.Grabbing {
            cursor: grabbing !important;
          }
        }
        position: absolute;
      }
      &.__Modal_Resizeable {
      }
      .__Model_Header {
        /* width: 100%; */
        height: 22px;
        margin: 0 -10px 0px -10px;
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
            background-image: url("./Assets/close.svg");
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
        margin: 0 -10px -10px -10px;
      }
      .__Model_Resize {
        position: absolute;
        cursor: pointer;
        // background: red;
        &.Handler_Right {
          width: 5px;
          height: 100%;
          right: 0;
          top: 0;
          cursor: e-resize;
        }
        &.Handler_Bottom {
          width: 100%;
          height: 5px;
          right: 0;
          bottom: 0;
          cursor: s-resize;
        }
        &.Handler_Cross {
          width: 10px;
          height: 10px;
          right: 0;
          bottom: 0;
          cursor: se-resize;
        }
      }
    }
  }
}
</style>