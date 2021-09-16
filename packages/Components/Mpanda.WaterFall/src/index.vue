<script>
import { SizeNumberValidator } from '@validators'
import { h } from 'vue'
export default {
  name: 'MPWaterfall',
  props: {
    height: {
      type: String,
      default: '100%',
      validator: SizeNumberValidator,
    },
    column: {
      type: Number,
      default: 3,
    },
    type: {
      type: String,
      default: 'center',
      validator: (val) =>
        ['around', 'between', 'unset', 'center', 'evenly'].includes(val),
    },
  },
  render() {
    let slots = this.$slots.default()
    let columns = this.$props.column
    if (
      slots.length === 1 &&
      typeof slots[0].type === 'symbol' &&
      slots[0].children instanceof Array
    ) {
      slots = slots[0].children
    }
    let columnComponents = Array.from({ length: columns }).map(() =>
      h('div', { class: 'waterfall_column' }, [])
    )
    for (let i = 0; i < slots.length; i++) {
      let columnContainer = columnComponents[i % columns]
      if (columnContainer) {
        columnContainer.children.push(slots[i])
      }
    }
    return h(
      'div',
      {
        class: ['waterfall_scroll_container'],
        style: { height: this.$props.height },
      },
      [
        h(
          'div',
          { class: ['waterfall_container', this.$props.type].join(' ').trim() },
          [...columnComponents]
        ),
      ]
    )
  },
  setup() {},
}
</script>

<style lang="scss" scoped>
.waterfall_scroll_container {
  width: 100%;
  overflow-y: auto;
  .waterfall_container {
    display: flex;
    flex-direction: row;
    width: 100%;
    &.between {
      justify-content: space-between;
    }
    &.around {
      justify-content: space-around;
    }
    &.evenly {
      justify-content: space-evenly;
    }
    &.center {
      justify-content: center;
    }
    .waterfall_column {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
