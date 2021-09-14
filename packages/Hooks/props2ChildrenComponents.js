import { provide, ref, watch } from 'vue'
/**
 * 将Props通过Provide传到子组件
 *
 * @export
 * @param {*} props
 * @param {*} propName
 * @param {*} defaultValue Prop默认值, 可不传
 */
export default function(props, propName, defaultValue) {
  const propValue = ref(null)
  watch(
    () => props[propName],
    () => {
      if (null == props[propName]) {
        if (null !== defaultValue) {
          propValue.value = defaultValue
        }
      } else {
        propValue.value = props[propName]
      }
    },
    {
      immediate: true,
      deep: true,
    }
  )
  provide(propName, propValue)
}
