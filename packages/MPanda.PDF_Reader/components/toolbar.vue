<template>
    <div :class="{
      __PDF_Tools:true,
      hidden:!visible,
      top:position ==='top',
      bottom:position==='bottom'
    }">
      <div class="__PDF_Btn">
        <font-awesome-icon :icon="['fas', 'search-minus']" />
      </div>
      <div class="__PDF_Btn __BTN_Pre">
        <p>上一页</p>
      </div>
      <input
        type="text"
        style="width:25px"
      >
      <div class="__PDF_Btn __BTN_Next">
        <p>下一页</p>
      </div>
      <div class="__PDF_Btn">
        <font-awesome-icon :icon="['fas', 'search-plus']" />
      </div>
    </div>
</template>

<script>
export default {
  name:"PDFToolBar",
  props: {
    visible: {
      type: Boolean,
      default: () => false
    },
    position:{
      type:String,
      default:()=>"top",
      validator:(val)=>['top','bottom'].includes(val)
    }
  },
  setup () {
    // function debounce (func, wait) {
    //   let lastTime = null;
    //   let timeout;
    //   return function () {
    //     let context = this;
    //     let now = new Date();
    //     // 判定不是一次抖动
    //     if (now - lastTime - wait > 0) {
    //       setTimeout(() => {
    //         func.apply(context, arguments);
    //       }, wait);
    //     } else {
    //       if (timeout) {
    //         clearTimeout(timeout);
    //         timeout = null;
    //       }
    //       timeout = setTimeout(() => {
    //         func.apply(context, arguments);
    //       }, wait);
    //     }
    //     // 注意这里lastTime是上次的触发时间
    //     lastTime = now;
    //   }
    // }
    // function handlePageInput(){

    // }
    return {}
  }
}
</script>

<style lang="scss" scoped>
.__PDF_Tools {
  position:absolute;
  display: flex;
  width: 100%;
  background: #333333;
  box-shadow: 0 0 40px #4b4b4b;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 2;
  max-height: 200px;
  transition: max-height 0.2s ease-in-out;
  &.hidden {
    max-height: 0;
  }
  &.top { 
    top:0;
    &.hidden {
      .__PDF_Menu_Btn {
        top: 10px;
      }
    }
    .__PDF_Menu_Btn {
      top: 40px;
    }
  }
  &.bottom {
    bottom:0;
    .__PDF_Menu_Btn {
      bottom: 40px;
    }
    &.hidden {
      .__PDF_Menu_Btn {
        bottom: 10px;
      }
    }
  }
  .__PDF_Btn {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px 0;
    color: #fff;
    font-size: 12px;
    max-width: 200px;
    height: 25px;
    border-radius: 5px;
    background: rgb(50, 130, 221);
    cursor: pointer;
    & > * {
      margin: 0;
      padding: 5px 8px;
      text-align: center;
      vertical-align: middle;
    }
  }
  .__PDF_Menu_Btn {
    right: 10px;
    color: rgb(151, 151, 151);
    position: absolute;
    cursor: pointer;
    &:hover {
      color: rgb(199, 199, 199);
    }
  }

  .__PDF_Btn {
    &.disabled {
      background: rgb(99, 119, 143);
      cursor: not-allowed;
    }
    &:not(:last-child) {
      margin-right: 15px;
    }
  }
}
</style>