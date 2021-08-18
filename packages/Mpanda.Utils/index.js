/**
 * 判断el DOM是否在container DOM中显示
 * 若Container为空,则默认为Windows
 * 例: 目标DOM处于Container底部,向下滚动到DOM的top显示出现时,IsElementInViewport返回True
 * @export
 * @param {*} el 目标DOM
 * @param {*} container 容器DOM
 * @return {Boolean}
 */
export function isElementInViewport(el, container) {
  //获取元素是否在可视区域
  var rect = el.getBoundingClientRect()
  var Container_Y = 0
  var Container_X = 0
  var cont_rect = {}
  if (container) {
    cont_rect = container.getBoundingClientRect()
    Container_Y = cont_rect.top + container.offsetHeight
    Container_X = cont_rect.left + container.offsetWidth
  } else {
    cont_rect = {
      y: 0,
      x: 0,
    }
    Container_Y = window.innerHeight || document.documentElement.clientHeight
    Container_X = window.innerWidth || document.documentElement.clientWidth
  }
  return (
    rect.top <= Container_Y &&
    rect.top + rect.height >= cont_rect.y &&
    rect.left <= Container_X &&
    rect.left + rect.width >= cont_rect.x
  )
}
/**
 *
 * Position暂不支持Fixed,Static
 * @export
 * @param {*} ChildDom 子DOM
 * @param {*} ParentDom 父DOM
 * @return {*}
 */
export function getRelativePositionOfChildParentDOMs(ChildDom, ParentDom) {
  if (ChildDom.parentElement !== ParentDom) {
    throw new Error('子DOM并不在该DOM内!')
  }
  var offsetTop = ChildDom.offsetTop - ParentDom.offsetTop
  var offsetLeft = ChildDom.offsetLeft - ParentDom.offsetLeft

  if (ChildDom.style.position === 'absolute') {
    offsetTop = ChildDom.offsetTop
    offsetLeft = ChildDom.offsetLeft
  } else {
    offsetTop = ChildDom.offsetTop - ParentDom.offsetTop
    offsetLeft = ChildDom.offsetLeft - ParentDom.offsetLeft
  }

  return {
    offsetTop,
    offsetLeft,
  }
}
 
/**
 *
 * 通过属性名获取传入标签渲染后的样式
 * @param {*} element 第一个参数表示你想要获取其属性值的标签; 
 * @param {*} proName 第二个参数表示你想要获取其属性值的属性名
 * @return {*} 返回第一个参数标签里面的属性名为第二个参数的样式
 */
export function getRenderedStyle(element, proName) {
  // document.defaultView.getComputedStyle为标准浏览器方法，element.currentStyle兼容IE6~IE8
  return document.defaultView
    ? document.defaultView.getComputedStyle(element)[proName]
    : element.currentStyle[proName]
}
/**
 * 导入相当目录下所有文件
 * @export
 * @param {*} relativePath
 * @param {*} fileRegex
 * @return {*}
 */
export class loadAllFilesUnderRelativeFolder {
  load(relativePath, fileRegex) {
    let modulesFiles = require.context(relativePath, true, fileRegex)
    let modules = modulesFiles.keys().reduce((modules, modulePath) => {
      const moduleName = modulePath
        .replace(/(.*\/)*([^.]+).*/gi, '$2')
        .toLowerCase()
      const value = modulesFiles(modulePath)
      modules[moduleName] = value.default
      return modules
    }, {})
    return modules
  }
} 