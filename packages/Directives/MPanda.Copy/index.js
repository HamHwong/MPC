import { getCurrentInstance } from 'vue'
import { emit, getBridge } from '../../EventBus'

export default {
  beforeMount(el, binding) {},
  // called when bound element's parent component is mounted
  mounted(el, binding, target) {
    var action = binding.arg || 'click'
    var clipboard = document.querySelector('_mp_clipboard')
    el.addEventListener(action, (ev) => {
      ev.preventDefault()
      ev.stopPropagation()
      if (!clipboard) {
        clipboard = document.createElement('textarea')
        clipboard.className = '_mp_clipboard'
        document.body.append(clipboard)
      }
      var value = ev.target.innerText
      clipboard.value = value
      clipboard.innerText = value
      clipboard.select()
      if (document.execCommand('Copy')) {
        clipboard.remove()
        if (typeof binding.value === 'function') {
          binding.value(value, window)
          emit('$copy', getBridge(target), value)
        }
      }
    })
  },
  // called before the containing component's VNode is updated
  beforeUpdate() {
    console.log('beforeUpdate getCurrentInstance()', getCurrentInstance())
  },
  // called after the containing component's VNode and the VNodes of its children // have updated
  updated() {
    console.log('updated getCurrentInstance()', getCurrentInstance())
  },
  // called before the bound element's parent component is unmounted
  beforeUnmount() {
    console.log('beforeUnmount getCurrentInstance()', getCurrentInstance())
  },
  // called when the bound element's parent component is unmounted
  unmounted() {
    console.log('unmounted getCurrentInstance()', getCurrentInstance())
  },
}
