import { provide, ref, watch } from 'vue'
/**
 * 将Props通过Provide传到子组件
 *
 * @export
 * @param {*} props
 * @param {*} propName
 * @param {*} defaultValue Prop默认值, 可不传
 */
export default function (props,propName,defaultValue){
  const propValue = ref(null)
  watch(
    () => props[propName],
    () => {
      if (!props[propName]) { 
        if(defaultValue){
          propValue.value = defaultValue
        }
      } else {
        propValue.value = props[propName]
      }
    },
    {
      immediate: true,
      deep:true
    }
  ) 
  console.log('propName',propName,'propsValue',propValue)
  provide(propName, propValue)
}