<template>
  <div
    :class="
      `${[row_layout_className, flex_options_class, grid_options_class]
        .filter((i) => i && i.trim())
        .join(' ')}`
    "
  >
    <slot name="default" />
  </div>
</template>

<script>
import { computed, provide, ref } from 'vue'
export default {
  name: 'MRow',
  props: {
    type: [String, null],
    default: () => null,
    validator: (val) => {
      return val === null || ['flex', 'grid'].includes(val.toLowerCase())
    },
    direction: {
      type: [String],
      default: () => 'row',
    },
    wrap: {
      type: [String, null],
      default: () => null,
      validator(val) {
        return (
          val === null ||
          ['nowrap', 'wrap', 'wrap-reverse'].includes(val.toLowerCase())
        )
      },
    },
    justify: {
      type: [String, null],
      default: () => null,
      validator(val) {
        return (
          val === null ||
          ['start', 'end', 'center', 'between', 'around'].includes(
            val.toLowerCase()
          )
        )
      },
    },
    align: {
      type: [String, null],
      default: () => null,
      validator(val) {
        return (
          val === null ||
          ['start', 'end', 'center', 'baseline', 'stretch'].includes(
            val.toLowerCase()
          )
        )
      },
    },
    alignContent: {
      type: [String, null],
      default: () => null,
      validator(val) {
        return (
          val === null ||
          ['start','end','center','between','around'].includes(
            val.toLowerCase()
          )
        )
      },
    },
  },
  setup(props) {
    provide('type', props.type)
    const _row_layout_className = ref([`MRow`])
    // 基础栅格系统
    const row_layout_className = computed({
      get() {
        var arr = []
        arr = [..._row_layout_className.value]
        if (props.type) {
          arr.push(`MRow-${props.type}`)
        }
        return arr.join(' ')
      },
    })
    // 如果是Flex,调整
    const flex_options_class = computed({
      get() {
        var result = ''
        if (isFlex()) {
          var styles = [
            {
              direction: props.direction && props.direction.toLowerCase(),
            },
            {
              wrap: props.wrap && props.wrap.toLowerCase(),
            },
            {
              justify: props.justify && props.justify.toLowerCase(),
            },
            {
              align: props.align && props.align.toLowerCase(),
            },
            {
              alignContent: props.alignContent && props.alignContent.toLowerCase(),
            },
          ]
          result = handleStylesToClassName(styles, 'fx')
        }
        return result
      },
    })
    // 如果是Grid结构,调整
    const grid_options_class = computed({
      get() {
        var result = ''
        if (isGrid()) {
          result = ''
        }
        return result
      },
    })
    function isFlex() {
      return props.type.toLowerCase() === 'flex'
    }
    function isGrid() {
      return props.type.toLowerCase() === 'grid'
    }
    function handleStylesToClassName(StylesArray, prefix) {
      var result = StylesArray.map((item) => {
        for (var styleName in item) {
          if (item[styleName] === null) continue
          return `${prefix ? prefix + '-' : ''}${styleName}-${item[styleName]}`
        }
      })
      return result.filter((i) => i && i.trim()).join(' ')
    }
    return {
      row_layout_className,
      flex_options_class,
      grid_options_class,
      isFlex,
      isGrid,
    }
  },
}
</script>

<style lang="scss" scoped>
@import './scss/index.scss';
</style>
