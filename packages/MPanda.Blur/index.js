export default {
  beforeMount() {},
  // called when bound element's parent component is mounted
  mounted(el, binding) {
    var blurClassName = '_blur_bg'
    var classNames = el.className.split(' ')
    if (!classNames.includes(blurClassName)) {
      classNames.push(blurClassName)
      el.className = classNames.join(' ') 
      // el.style.backgroundPosition=`${el.offsetLeft}px ${el.offsetTop}px`
    }
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
