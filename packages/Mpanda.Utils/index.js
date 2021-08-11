/**
 * 判断el DOM是否在container DOM中显示
 * 若Container为空,则默认为Windows
 * 例: 目标DOM处于Container底部,向下滚动到DOM的top显示出现时,IsElementInViewport返回True
 * @export
 * @param {*} el 目标DOM
 * @param {*} container 容器DOM
 * @return {Boolean} 
 */
export function isElementInViewport (el, container) {
  //获取元素是否在可视区域
  var rect = el.getBoundingClientRect();
  var Container_Y = 0
  var Container_X = 0
  if (container) {
    var cont_rect = container.getBoundingClientRect()
    Container_Y = cont_rect.y + container.offsetHeight
    Container_X = cont_rect.x + container.offsetWidth
  } else {
    Container_Y = window.innerHeight || document.documentElement.clientHeight
    Container_X = window.innerWidth || document.documentElement.clientWidth
  } 
  return (
    rect.top <= Container_Y &&
    rect.top+rect.height >= cont_rect.y &&
    rect.left <= Container_X &&
    rect.left+rect.width >= cont_rect.x 
  );
}
export function emit ($event, _this) { 
  // _this.parent.emitsOptions[$event] = null
  // _this.parent.emit($event)
}