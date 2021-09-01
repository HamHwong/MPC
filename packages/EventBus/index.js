/* eslint-disable */  
import md5 from 'md5'
import { getCurrentInstance } from 'vue' 
export const EventBusFactory = {
  Vue: null,
  init(Vue) {
    this.id = Math.random()
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
  getEventBus() {
    if (this.Vue.config.globalProperties.EnableEmitter) {
      return this.EventBus
    } else {
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
  emit($event, targetBridge, ...args) {
    var eventName = $event
    if (targetBridge) {
      eventName = `${targetBridge}:bridge:${$event}`
    } 
    if (!this.eventsList[eventName]) return null
    this.eventsList[eventName] = this.eventsList[eventName].map((param) => {
      const {Id, fn, fromPageId, isGlobal, isOnce = false, bridge } = param
      if (targetBridge && bridge === targetBridge) {
        fn(...args)
      } else if (
        (!targetBridge && isGlobal) ||
        this.getRoutePathMd5() === fromPageId
      ) {
        fn(...args)
        if (isOnce) {
          return null
        }
      }
      return param
    })
    // Clean Once Subscriber
    this.eventsList[$event] = this.eventsList[$event].filter((i) => i)
  }
  getBridge(ins) {
    let result = null
    let instance = ins||getCurrentInstance()
    let directives = instance.vnode||instance
    if (directives.dirs && directives.dirs.length > 0) {
      for (var i = 0; i < directives.dirs.length; i++) {
        if (directives.dirs[i].arg) {
          result = directives.dirs[i].arg
          break
        }
      }
    }
    return result
  }
  // 子组件定义事件
  on($event, fn, isGlobal = false) {
    var bridge = this.getBridge()
    var eventsName = bridge ? `${bridge}:bridge:${$event}` : $event
    if (!this.eventsList[eventsName]) {
      this.eventsList[eventsName] = []
    }
    this.eventsList[eventsName].push({
      Id:Math.random(),
      fromPageId: this.getRoutePathMd5(),
      fn,
      isGlobal,
      bridge: bridge,
    })
  }
  // 只执行一次
  once($event, fn, isGlobal = false) {
    // console.log('once', $event)
    if (!this.eventsList[$event]) {
      this.eventsList[$event] = []
    }
    this.eventsList[$event].push({
      fromPageId: this.getRoutePathMd5(),
      fn,
      isGlobal,
      isOnce: true,
    })
    // this.eventsList[$event]=this.eventsList[$event].map((param) => {
    //   if (param.isGlobal || this.getRoutePathMd5()=== param.fromPageId) {
    //     param.fn(...args)
    //     return null
    //   }
    //   return param
    // })
    // this.eventsList[$event]=this.eventsList[$event].filter(i=>i)
  }
  clean($event) {
    // console.log('clean', $event)
    if ($event) {
      this.eventsList[$event] = []
    } else {
      this.eventsList[$event] = {}
    }
  }
  getRoutePathMd5() {
    return md5(location.href.split('?')[0].toUpperCase())
  }
  //
  // boardcast($event,...args){
  //   console.log('boardcast',$event,...args)
  //   emit($event,...args)
  // }
}
export function emit($event, targetBridge = null, ...args) {
  console.log(arguments,arguments.callee,caller)
  return EventBusFactory.getInstance().emit($event, targetBridge, ...args)
}
export function on($event, ...args) {
  return EventBusFactory.getInstance().on($event, ...args)
}
export function once($event, ...args) {
  return EventBusFactory.getInstance().once($event, ...args)
} 
export function getBridge(target){
  return EventBusFactory.getInstance().getBridge(target)
}
// export function boardcast($event,...args){
//   EventBusFactory.getInstance().boardcast($event,...args)
// }
