<template>
  <div :class="`${layoutClassName}`">
    <slot name="default" />
  </div>
</template>

<script>
import { computed, toRefs } from 'vue'
function checkMaxNumber(val) { 
  return val === null || (Number(val) <= 24 && Number(val) > 0)
}
function spanAdditionalValidator(obj) {
  var arr = []
  for (var key in obj) {
    arr.push(key)
  } 
  return checkMaxNumber(obj)||arr.some((key) =>
    ['xs', 'sm', 'md', 'lg', 'FHD', '2k', '4k', '8k']
      .map((i) => i.toLowerCase())
      .includes(key.toLowerCase())
  )
}
export default {
  props: {
    span: {
      type: [Number,Object,null],
      default: null,
      validator:  spanAdditionalValidator,
    },
    xs: {
      type: [Number, null],
      default: null,
      validator: checkMaxNumber,
    },
    sm: {
      type: [Number, null],
      default: null,
      validator: checkMaxNumber,
    },
    md: {
      type: [Number, null],
      default: null,
      validator: checkMaxNumber,
    },
    lg: {
      type: [Number, null],
      default: null,
      validator: checkMaxNumber,
    },
    FHD: {
      type: [Number, null],
      default: null,
      validator: checkMaxNumber,
    },
    '2k': {
      type: [Number, null],
      default: null,
      validator: checkMaxNumber,
    },
    '4k': {
      type: [Number, null],
      default: null,
      validator: checkMaxNumber,
    },
    '8k': {
      type: [Number, null],
      default: null,
      validator: checkMaxNumber,
    },
    offset: {
      type: [Number, null],
      default: null,
      validator: checkMaxNumber,
    },
  },
  name: 'MCol',
  setup(props, ctx) {
    // const type = inject('type')

    const _layoutClassName = toRefs(props)
    const layoutClassName = computed({
      get() {
        var arr = [`MCol`]
        for (var sizeKey in _layoutClassName) {
          if (_layoutClassName[sizeKey].value) {
            if (
              sizeKey.toLowerCase() === 'span' &&
              typeof _layoutClassName[sizeKey].value === 'object'
            ) {
              for (var key in _layoutClassName[sizeKey].value) {
                arr.push(`${key}-${_layoutClassName[sizeKey].value[key]}`)
              } 
            }
            if(typeof _layoutClassName[sizeKey].value === 'number'){
              arr.push(`${sizeKey}-${_layoutClassName[sizeKey].value}`)
            }
          }
        }
        // 去重
        arr = arr.filter((className,index)=>arr.indexOf(className)===index)
        // 重复定义报错
        var checkArr = arr.map(i=>i.split('-')[0])
        checkArr.map(i=>{
          if(checkArr.indexOf(i)!==checkArr.lastIndexOf(i)){
            console.warn(`[媒体查询]参数重复定义:${arr[checkArr.indexOf(i)]}与${arr[checkArr.lastIndexOf(i)]}重复!`)
          }
        })
        return arr.join(' ')
      },
    })
    return {
      checkMaxNumber,
      layoutClassName,
    }
  },
}
</script>

<style lang="scss" scoped>
@import './scss/index.scss';
</style>
