<template>
  <teleport :to="appendTo">
    <div
      :class="{
      __Model_Shadow:true ,
      Hiding:status===STATUS.HIDING,
      Hide:status===STATUS.HIDE
    }"
      @mousemove="handleDragging($event);handleResizeMove($event)"
      @mouseup="endResize"
    >
      <div :class="{
          __Model_Wrapper:true
        }">
        <div
          :class="{
            __Model:true,
            __Modal_Draggable:draggable
          }"
          :style="{
              left:draggable?`${x-w/2<0?0:x-w/2}px`:null,
              top:draggable?`${y-headerHeight/2<0?0:y-headerHeight/2}px`:null,
              width:resizeable?`${w}px`:null,
              height:resizeable?`${h}px`:null
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
            x:{{x}}
            y:{{y}}
            h:{{h}}
            w:{{w}}
            headerHeight:{{headerHeight}}
            <slot name="default"></slot>
          </div>
          <div
            :class="{ 
            __Model_Resize:true, 
            Handler_Right:true, 
          }"
            @mousedown="handleResize($event,DIRECTION.X)"
          />
          <div
            :class="{ 
            __Model_Resize:true, 
            Handler_Bottom:true
          }"
            @mousedown="handleResize($event,DIRECTION.Y)"
          />
          <div
            :class="{
            __Model_Resize:true, 
            Handler_Cross:true
          }"
            @mousedown="handleResize($event,DIRECTION.CROSS)"
          />
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import { ref } from '@vue/reactivity'
import { DIRECTION, STATUS } from './enum'
import { watch } from '@vue/runtime-core'
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
    appendTo: {
      type: String,
      default: () => "body",
    },
    width: {
      type: Number,
      default: () => 200
    },
    height: {
      type: Number,
      default: () => 200
    },
    visible: {
      type: Boolean,
      default: () => false
    }
  },
  emits: ['close'],
  setup (props, context) {
    const status = ref(STATUS.HIDE)
    const display = ref(false)
    watch(() => display.value, (visible) => {
      if (!visible) {
        status.value = STATUS.HIDING
        setTimeout(() => {
          status.value = STATUS.HIDE
        }, 500);
      } else {
        status.value = STATUS.DISPLAY
        context.emit('display')
      }
    })
    watch(() => props.visible, (visible) => {
      display.value = visible
    }, { immediate: true })
    const isVisible = ref(false)
    const isGrabbing = ref(false)
    const isResizing = ref(false)
    let x = ref(0)
    let y = ref(0)
    let w = ref(props.width)
    let h = ref(props.height)
    let headerHeight = 22;
    if (props.draggable) {
      x.value = 0
      y.value = 0
    }
    if (props.resizeable) {
      w.value = 0
      h.value = 0
    }
    function handleDrag () {
      if (props.draggable && !isGrabbing.value) {
        isGrabbing.value = true
      }
    }
    function handleDragging (e) {
      if (isGrabbing.value) {
        x.value = e.pageX
        y.value = e.pageY
        // console.log(x.value,y.value)
      }
    }
    function handleDrop () {
      if (props.draggable && isGrabbing.value) {
        isGrabbing.value = false
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
      }
    }
    function endResize (e) {
      e.preventDefault()
      e.stopPropagation()
      if (props.resizeable && isResizing.value) {
        var newheight = 0
        var newWidth = 0
        switch (Direction.value) {
          case DIRECTION.X:
            newWidth = e.screenX - x.value
            w.value = newWidth
            break;
          case DIRECTION.Y:
            newheight = e.screenY - (y.value + startHeight.value)
            if (newheight + y.value > screen.height) {
              h.value = screen.height - y.value
            } else {
              h.value = newheight
            }
            break;
          case DIRECTION.CROSS:
            newWidth = e.screenX - x.value
            newheight = e.screenY - (y.value + startHeight.value)
            w.value = newWidth
            if (newheight + y.value > screen.height) {
              h.value = screen.height - y.value
            } else {
              h.value = newheight
            }
            break;
        }
        isResizing.value = false
      }
    }
    function handleResizeMove (e) {
      if (props.resizeable && isResizing.value) {
        switch (Direction.value) {
          case DIRECTION.X:
            w.value = e.screenX - x.value
            break;
          case DIRECTION.Y:
            h.value = e.screenY - (y.value + startHeight.value)
            break;
          case DIRECTION.CROSS:
            w.value = e.screenX - x.value
            h.value = e.screenY - (y.value + startHeight.value)
            break;
        }
      }
    }

    function handleClose () {
      display.value = false
      context.emit('close')
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
      handleClose
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
      .__Model_Resize {
        position: absolute;
        cursor: pointer;
        background: red;
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