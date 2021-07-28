export function isElementInViewport  (el, container) {
  //获取元素是否在可视区域
  var rect = el.getBoundingClientRect();

  var Container_Y = 0
  var Container_X = 0
  if (container) {
    Container_Y = container.getBoundingClientRect().y + container.offsetHeight
    Container_X = container.getBoundingClientRect().x + container.offsetWidth
  } else {
    Container_Y = window.innerHeight || document.documentElement.clientHeight
    Container_X = window.innerWidth || document.documentElement.clientWidth
  }
  return (
    rect.top <= Container_Y &&
    rect.bottom >= 0 &&
    rect.left <= Container_X &&
    rect.right >= 0
  );
}