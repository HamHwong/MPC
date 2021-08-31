import md5 from 'md5' 
import { getCurrentInstance } from 'vue'
export const EventBusFactory = {
  Vue: null,
  init(Vue) {
    this.id=Math.random()
    this.Vue = Vue
    this.EventBus = null
  },
  getInstance() {  
    if (this.Vue.config.globalProperties.Emitter) {
      return this.EventBus || this.Vue.config.globalProperties.Emitter
    } else {
      if (this.Vue.config.globalProperties.EnableEmitter) {
        this.EventBus = new EventsBus()
        this.Vue.config.globalProperties.Emitter = this.EventBus
        return this.EventBus || this.Vue.config.globalProperties.Emitter
      }
      throw new Error(
        'EventsBus未开启！请在main.js中开启EventsBus，参考：mpc.enableEventsBus()'
      )
    }
  },
}
export class EventsBus {
  constructor() {
    this.eventsList = {}
  }
  // 子组件发送事件
  emit($event, ...args) {
    console.log('emit', $event, ...args) 
    this.eventsList[$event]=this.eventsList[$event].map((param) => {
      const { fn, uid, isGlobal, isOnce=false } = param
      if (isGlobal || this.getRoutePathMd5()=== uid) {
        fn(...args)
        if(isOnce){
          return null
        }
      }
      return param
    })
    this.eventsList[$event]=this.eventsList[$event].filter(i=>i)
  }
  // 子组件定义事件
  on($event, fn, isGlobal = false) {
    console.log('on', $event)
    console.log('getCurrentInstance()',getCurrentInstance().vnode.dirs)
    if (!this.eventsList[$event]) {
      this.eventsList[$event] = []
    } 
    this.eventsList[$event].push({
      uid: this.getRoutePathMd5(),
      fn,
      isGlobal,
    })
  }
  // 只执行一次
  once($event, fn, isGlobal = false) {
    console.log('once', $event)
    if (!this.eventsList[$event]) {
      this.eventsList[$event] = []
    } 
    this.eventsList[$event].push({
      uid: this.getRoutePathMd5(),
      fn,
      isGlobal,
      isOnce:true
    })
    // this.eventsList[$event]=this.eventsList[$event].map((param) => {
    //   if (param.isGlobal || this.getRoutePathMd5()=== param.uid) {
    //     param.fn(...args)
    //     return null
    //   }
    //   return param
    // })
    // this.eventsList[$event]=this.eventsList[$event].filter(i=>i)
  }
  clean($event) {
    console.log('clean', $event)
    if ($event) {
      this.eventsList[$event] = []
    } else {
      this.eventsList[$event] = {}
    }
  }
  getRoutePathMd5(){
    return md5(location.href.split('?')[0].toUpperCase())
  }
  //
  // boardcast($event,...args){
  //   console.log('boardcast',$event,...args)
  //   emit($event,...args)
  // }
}
export function emit($event, ...args) {
  EventBusFactory.getInstance().emit($event, ...args)
}
export function on($event, ...args) {
  EventBusFactory.getInstance().on($event, ...args)
}
export function once($event, ...args) {
  EventBusFactory.getInstance().once($event, ...args)
}
// export function boardcast($event,...args){
//   EventBusFactory.getInstance().boardcast($event,...args)
// }
