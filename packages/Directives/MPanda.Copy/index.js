import { emit } from "../../EventBus";

export default {
  beforeMount () {

  },
  // called when bound element's parent component is mounted
  mounted (el, binding) {
    var action = binding.arg||'click'  
    var clipboard = document.querySelector('_mp_clipboard') 
    el.addEventListener(action,(ev)=>{
      ev.preventDefault();
      ev.stopPropagation()
      if(!clipboard){
        clipboard=document.createElement('textarea')
        clipboard.className ='_mp_clipboard' 
        document.body.append(clipboard)
      } 
      var value = ev.target.innerText
      clipboard.value = value
      clipboard.innerText = value
      clipboard.select();
      if(document.execCommand('Copy')){ 
        clipboard.remove()
        if(typeof binding.value === 'function'){ 
          binding.value(value,window)
          //TODO Emit event to hub 
          emit('$copy',value) 
        }
      }
    })
  },
  // called before the containing component's VNode is updated
  beforeUpdate () {

  },
  // called after the containing component's VNode and the VNodes of its children // have updated
  updated () {

  },
  // called before the bound element's parent component is unmounted
  beforeUnmount () {

  },
  // called when the bound element's parent component is unmounted
  unmounted () {

  }
}