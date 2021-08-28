import md5 from 'md5' 
export const EventBusFactory = {
  Vue: null,
  init(Vue) {
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
    this.eventsList[$event].map(({ fn, uid, isGlobal }) => {
      if (isGlobal || this.getRoutePathMd5()=== uid) {
        fn(...args)
      }
    })
  }
  // 子组件定义事件
  on($event, fn, isGlobal = false) {
    if (!this.eventsList[$event]) {
      this.eventsList[$event] = []
    }
    console.log(this.getRoutePathMd5())
    this.eventsList[$event].push({
      uid: this.getRoutePathMd5(),
      fn,
      isGlobal,
    })
  }
  // 只执行一次
  once($event, ...args) {
    console.log('once', $event, ...args)
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
