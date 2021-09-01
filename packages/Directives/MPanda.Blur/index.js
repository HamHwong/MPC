import { getRelativePositionOfChildParentDOMs } from "@utils"
import { SizeNumberValidator } from '@validators'
export default {
  beforeMount() {},
  // called when bound element's parent component is mounted
  mounted(el, binding) {
    var blurClassName = '_blur_bg' 
    var classNames = el.className.split(' ')
    if(binding.value==='unset')return
    if (!classNames.includes(blurClassName)) {
      classNames.push(blurClassName)
      if(SizeNumberValidator(binding.value&&binding.value.toString())){ 
        classNames.push('__blur_'+binding.value) 
      } 
      if(binding.arg){
        classNames.push('__blur_hasCover')
        classNames.push('__blur_over_'+binding.arg)
      }
      el.className = classNames.join(' ')
      var {offsetLeft,offsetTop} = getRelativePositionOfChildParentDOMs(el,el.parentElement)
      // console.log('offsetLeft:'+offsetLeft,'offsetTop:'+offsetTop)
      el.style.backgroundPosition = `${-offsetLeft}px ${-offsetTop}px`
      // console.log('el.style.backgroundPosition',el.style.backgroundPosition)
      var parentNode = el.parentElement
      var parentBGSize = parentNode.style.backgroundSize
      var { width, height } = parentNode.getBoundingClientRect()
      var preventMarginOverflowBlock = document.createElement('i')
      preventMarginOverflowBlock.style.display='block'
      preventMarginOverflowBlock.style.width='0px'
      preventMarginOverflowBlock.style.height='0px'
      preventMarginOverflowBlock.style.overflow='hidden'
      preventMarginOverflowBlock.style.visibility='hidden'
      preventMarginOverflowBlock.innerText='----Clear----'
      parentNode.appendChild(preventMarginOverflowBlock)

      if (parentBGSize.trim() === 'cover') {
        //设置为Cover
        el.style.backgroundSize = `auto ${height}px`
      } else if (parentBGSize.trim() === 'contain') {
        //设置为Contain
        el.style.backgroundSize = `${width}px auto`
      } else if (parentBGSize.trim() !== '') {
        //设置了长宽
        var sizeArr = parentBGSize.split(' ')
        if (sizeArr > 1) {
          //设置两个值
          var _height = sizeArr[0].trim()
          var _width = sizeArr[1].trim() 
          var result_h = height
          var result_w = width
          if(_height.indexOf('%')>0){
            result_h = Number(_height.split('%')[0])/100*height + 'px'
          }
          if(_width.indexOf('%')>0){
            result_w = Number(_height.split('%')[0])/100*height + 'px'
          } 

          if(_height.toLowerCase().indexOf('px')>0
          ||_height.toLowerCase().indexOf('em')>0
          ||_height.toLowerCase().indexOf('rem')>0
          ||_height.toLowerCase().indexOf('vh')>0
          ||_height.toLowerCase().indexOf('vw')>0){
            result_h =_height
          } 
          if(_width.toLowerCase().indexOf('px')>0
          ||_width.toLowerCase().indexOf('em')>0
          ||_width.toLowerCase().indexOf('rem')>0
          ||_width.toLowerCase().indexOf('vh')>0
          ||_width.toLowerCase().indexOf('vw')>0){
            result_w = _width
          } 

          if(_height === 'auto') {
            result_h = 'auto'
          }
          if(_width === 'auto') {
            result_w = 'auto'
          }
          el.style.backgroundSize = [result_h,result_w].join(' ')
        } else {
          //设置了一个值
          var __height = sizeArr[0]
          var _result_h = __height
          if(__height.indexOf('%')>0){
            _result_h = Number(__height.split('%')[0])/100*height + 'px'
          }else{
            _result_h =__height 
          }
          el.style.backgroundSize = _result_h
        }
        // el.style.backgroundSize=`${height}px auto`
      } else {
        //未设置
        el.style.backgroundSize=``
      }
    }
  },
  // called before the containing component's VNode is updated
  beforeUpdate() {
    // console.log('beforeUpdate:el.offsetTop',el.offsetTop)
  },
  // called after the containing component's VNode and the VNodes of its children // have updated
  updated() {},
  // called before the bound element's parent component is unmounted
  beforeUnmount() {},
  // called when the bound element's parent component is unmounted
  unmounted() {},
}
