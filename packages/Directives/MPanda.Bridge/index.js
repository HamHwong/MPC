// import { EventBusFactory } from '../../EventBus' 

export default {
  beforeMount() {},
  // called when bound element's parent component is mounted
  mounted(el, binding) {
    binding.bridge = binding.arg 
  },
  // called before the containing component's VNode is updated
  beforeUpdate() {},
  // called after the containing component's VNode and the VNodes of its children // have updated
  updated() {},
  // called before the bound element's parent component is unmounted
  beforeUnmount() {},
  // called when the bound element's parent component is unmounted
  unmounted() {},
}
