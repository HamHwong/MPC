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
export function emit($event, _this) {
  // _this.parent.emitsOptions[$event] = null
  // _this.parent.emit($event)
}
