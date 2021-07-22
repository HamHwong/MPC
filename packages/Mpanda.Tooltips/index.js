export default{
  beforeMount(el,binding) {console.log(el,binding)},
  // called when bound element's parent component is mounted
  mounted(el,binding) {console.log(el,binding)},
  // called before the containing component's VNode is updated
  beforeUpdate(el,binding) {console.log(el,binding)},
  // called after the containing component's VNode and the VNodes of its children // have updated
  updated(el,binding) {console.log(el,binding)},
  // called before the bound element's parent component is unmounted
  beforeUnmount(el,binding) {console.log(el,binding)},
  // called when the bound element's parent component is unmounted
  unmounted(el,binding) {console.log(el,binding)} 
}