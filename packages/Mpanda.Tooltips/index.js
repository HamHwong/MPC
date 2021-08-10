
function __tooltips (rootDOM, el, binding) {
  this.rootDOM = rootDOM || document.querySelector('#app')|| document.querySelector('body')
  this.DOM = null
  this.contentDOM = null
  this.className = '__tooltips';
  this.x = 0;
  this.y = 0;
  this.MODE = {
    FOLLOW_MOUSE: 0,
    FOLLOW_TARGET: 1
  }
  this.debounceTimer = 0
  this.timerDuration = 100
  this.mouseOverTooltips = false
  this.mode = this.MODE.FOLLOW_TARGET;
  this.content = null;
  this.init = function () {
    this.generateTooltipsDOMTo(this.rootDOM)
    this.attachEventTriggerToDOM(el)
  }
  this.generateTooltipsDOMTo = function (parentDOM) {
    if (this.DOM === null && !this.tooltipsExisted()) {
      this.DOM = document.createElement('div')
      this.contentDOM = document.createElement('div')
      this.contentDOM.className = '__tooltips_content'
      var radiusWrapper = document.createElement('div')
      radiusWrapper.className = '__tooltips_radius_wrapper'
      radiusWrapper.appendChild(this.contentDOM)
      this.DOM.appendChild(radiusWrapper)
      this.DOM.className = [this.className, '__tooltips_hidden'].join(' ')
      parentDOM.appendChild(this.DOM)
    } else {
      this.DOM = this.rootDOM.querySelector('.' + this.className)
      this.contentDOM = this.DOM.querySelector('div')
    }
  }
  this.tooltipsExisted = function () {
    return document.querySelectorAll(this.className).length > 0
  }
  this.update = function (text) {
    this.content = text
    this.contentDOM.innerText = text
  }
  this.attachEventTriggerToDOM = function (DOM) {
    if(DOM.scrollWidth<DOM.offsetWidth) return
    //获取元素的纵坐标
    function getTop (e) {
      var offset = e.offsetTop;
      if (e.offsetParent != null) offset += getTop(e.offsetParent);
      return offset;
    }
    //获取元素的横坐标
    function getLeft (e) {
      var offset = e.offsetLeft;
      if (e.offsetParent != null) offset += getLeft(e.offsetParent);
      return offset;
    }

    var _this = this
    DOM.addEventListener('mouseover', function (e) {
      clearTimeout(_this.debounceTimer)
      _this.debounceTimer = setTimeout(() => {
        // if (!_this.isShow()) {
          e.stopPropagation()
          e.preventDefault()
          _this.update(binding.value || e.target.innerText)
          console.log(binding,binding.value)
          // Mouse Or Target Position
          var x = 0, y = 0, w = 0, h = 0
          if (_this.mode === _this.MODE.FOLLOW_TARGET) {
            x = getLeft(e.target) - scrollX
            y = getTop(e.target) - scrollY + e.target.offsetHeight / 2
          } else {
            x = e.x
            y = e.y
          }

          w = e.target.offsetWidth
          h = e.target.offsetHeight
          // console.log(w, h)

          var direction = _this.getDirection(x, y)
          _this.setDirection(direction)

          // Margin Offset
          var wrapper_offset_x = 0
          var wrapper_offset_y = 0

          //Position Offset 
          var position_offset = _this.getPositionOffset(direction, w, h)
          // console.log(position_offset)
          var offset_y = position_offset.y
          var offset_x = position_offset.x
          _this.DOM.style.top = y + wrapper_offset_y + offset_y + 'px'
          _this.DOM.style.left = x + wrapper_offset_x + offset_x + 'px'
          _this.show()
        // }
      }, _this.timerDuration);
    })
    DOM.addEventListener('mouseleave', function (e) {
      _this.debounceTimer = setTimeout(() => {
        if (_this.isShow() && !_this.mouseOverTooltips) {
          e.stopPropagation()
          e.preventDefault()
          clearTimeout(_this.debounceTimer)
          _this.hide()
        }
      }, _this.timerDuration);
    })

    _this.DOM.addEventListener('mouseover', function () {
      _this.mouseOverTooltips = true
    })
    _this.DOM.addEventListener('mouseleave', function () {
      _this.mouseOverTooltips = false
      _this.hide()
    })
  }
  this.show = function () {
    var arr = this.DOM.className.split(' ')
    arr = arr.filter(function (className) { return className !== '__tooltips_hidden' })
    this.DOM.className = arr.join(' ')
  }
  this.hide = function () {
    var arr = this.DOM.className.split(' ')
    arr.push('__tooltips_hidden')
    arr = arr.filter((name, i) => arr.indexOf(name) === i)
    this.DOM.className = arr.join(' ')
  }
  this.isShow = function () {
    return !this.DOM.className.split(' ').find(function (className) { return className === '__tooltips_hidden' })
  }
  this.getDOMSize = function () {
    return {
      width: this.DOM.offsetWidth,
      height: this.DOM.offsetHeight
    }
  }
  this.setDirection = function (direction) {
    var classNames = this.DOM.className.split(' ')
    var directionClassNames = []
    for (var key in this.Direction) {
      directionClassNames.push(this.Direction[key])
    }
    classNames = classNames.filter(function (directionName) { return !directionClassNames.includes(directionName) })
    classNames.push(direction)
    this.DOM.className = classNames.join(' ')
  }
  this.getDirection = function (x, y) {
    var DirectionCollection = []
    for (var posKey in this.Direction) {
      DirectionCollection.push(this.Direction[posKey])
    }

    if (this.DOM.offsetWidth > x) {
      DirectionCollection = DirectionCollection.filter(i => ![
        this.Direction.RIGHT_TOP,
        this.Direction.RIGHT_BOTTOM,
        this.Direction.RIGHT,
        this.Direction.TOP_RIGHT,
        this.Direction.BOTTOM_RIGHT
      ].includes(i))
    }

    if (this.DOM.offsetWidth + x > document.body.offsetWidth - scrollX) {
      DirectionCollection = DirectionCollection.filter(i => ![
        this.Direction.TOP_LEFT,
        this.Direction.BOTTOM_LEFT,
        this.Direction.LEFT,
        this.Direction.LEFT_TOP,
        this.Direction.LEFT_BOTTOM,
      ].includes(i))
    }
    if (this.DOM.offsetWidth / 2 + x > document.body.offsetWidth - scrollX) {
      DirectionCollection = DirectionCollection.filter(i => ![
        this.Direction.TOP,
        this.Direction.BOTTOM
      ].includes(i))
    }

    if (this.DOM.offsetWidth / 2 > x) {
      DirectionCollection = DirectionCollection.filter(i => ![
        this.Direction.BOTTOM,
        this.Direction.TOP
      ].includes(i))
    }

    if (this.DOM.offsetHeight > y) {
      DirectionCollection = DirectionCollection.filter(i => ![
        this.Direction.BOTTOM,
        this.Direction.BOTTOM_LEFT,
        this.Direction.BOTTOM_RIGHT,
        this.Direction.LEFT_BOTTOM,
        this.Direction.RIGHT_BOTTOM
      ].includes(i))
    }
    // console.log(this.DOM.offsetHeight ,y ,document.body.offsetHeight)
    if (this.DOM.offsetHeight + y > document.body.offsetHeight - scrollY) {
      DirectionCollection = DirectionCollection.filter(i => ![
        this.Direction.TOP,
        this.Direction.TOP_LEFT,
        this.Direction.TOP_RIGHT,
        this.Direction.RIGHT_TOP,
        this.Direction.LEFT_TOP,
      ].includes(i))
    }


    if (this.DOM.offsetHeight / 2 + y > document.body.offsetHeight - scrollY) {
      DirectionCollection = DirectionCollection.filter(i => ![
        this.Direction.LEFT,
        this.Direction.RIGHT,
      ].includes(i))
    }

    var restOfDirections = DirectionCollection
    var ordersPrefer = ['__bottom', '__left', '__right', '__top']
    //Sort
    restOfDirections = restOfDirections.map(i => {
      for (var j = 0; j < ordersPrefer.length; j++) {
        if (compare(i, ordersPrefer[j])) {
          return { item: i, index: ordersPrefer.indexOf(ordersPrefer[j]) }
        }
      }
    })
    function compare (raw, target) {
      return raw.indexOf(target) >= 0
    }
    restOfDirections.sort((pre, next) => pre.index - next.index)
    var radomIndex = Math.floor(Math.random() * (restOfDirections.length - 1))
    var result = restOfDirections[radomIndex] ? restOfDirections[radomIndex].item : this.Direction.BOTTOM
    return result
  }
  this.getPositionOffset = function (direction, w, h) {
    var { width, height } = this.getDOMSize()
    var objectOffsetX = 0
    var objectOffsetY = 0
    // if (this.mode === this.MODE.FOLLOW_TARGET) {
    objectOffsetX = w
    objectOffsetY = h
    // }
    // var marginOffsetX = 10
    // var marginOffsetY = 10
    // var anchorSize = 5;
    var borderTriangleWidth = 5;
    var borderTriangleHeight = 6;
    var borderTriangleDistance = 6;
    var result = {
      x: 0,
      y: 0
    }
    switch (direction) {
      case this.Direction.TOP:
        if (this.mode === this.MODE.FOLLOW_TARGET) {
          result.x = -(width / 2)
          result.y = 0
        } else {
          result.x = -(width / 2)
          result.y = objectOffsetY
        }
        break;
      case this.Direction.TOP_LEFT:
        if (this.mode === this.MODE.FOLLOW_TARGET) {
          result.x = 0
        } else {
          result.x = -(borderTriangleWidth + borderTriangleDistance)
        }
        result.y = objectOffsetY
        break;
      case this.Direction.TOP_RIGHT:
        if (this.mode === this.MODE.FOLLOW_TARGET) {
          result.x = -width + w / 2
        } else {
          result.x = -width + (borderTriangleWidth + borderTriangleDistance)
        }
        result.y = objectOffsetY
        break;
      case this.Direction.LEFT:
        if (this.mode === this.MODE.FOLLOW_TARGET) {
          result.x = objectOffsetX
        } else {
          result.x = borderTriangleWidth
        }
        result.y = -(height / 2)
        break;
      case this.Direction.LEFT_TOP:
        if (this.mode === this.MODE.FOLLOW_TARGET) {
          result.x = objectOffsetX
        } else {
          result.x = 0 + borderTriangleWidth
        }
        result.y = - (0 + borderTriangleWidth + borderTriangleDistance / 2)
        break;
      case this.Direction.LEFT_BOTTOM:
        if (this.mode === this.MODE.FOLLOW_TARGET) {
          result.x = objectOffsetX
        } else {
          result.x = 0 + borderTriangleWidth
        }
        result.y = -(height) + borderTriangleWidth + borderTriangleDistance
        break;
      case this.Direction.RIGHT:
        result.x = -(width)
        result.y = -(height / 2)
        break;
      case this.Direction.RIGHT_TOP:
        result.x = -(width)
        result.y = -(0 + objectOffsetY / 2) + borderTriangleWidth / 2
        break;
      case this.Direction.RIGHT_BOTTOM:
        result.x = -(width)
        result.y = -(height) + borderTriangleWidth + borderTriangleDistance
        break;
      case this.Direction.BOTTOM:
        if (this.mode === this.MODE.FOLLOW_TARGET) {
          result.x = -(width / 2) + objectOffsetX / 2
        } else {
          result.x = -(width / 2)
        }
        result.y = -(height + borderTriangleHeight)
        break;
      case this.Direction.BOTTOM_LEFT:
        if (this.mode === this.MODE.FOLLOW_TARGET) {
          result.x = -(borderTriangleWidth / 2 + borderTriangleDistance) + objectOffsetX / 2
        } else {
          result.x = -(borderTriangleWidth / 2 + borderTriangleDistance)
        }
        result.y = -(height + borderTriangleHeight)
        break;
      case this.Direction.BOTTOM_RIGHT:
        result.x = -(width) + borderTriangleWidth / 2 + borderTriangleDistance
        result.y = -(height + borderTriangleHeight)
        break;
    }
    return result
  }
  this.Direction = {
    TOP: '__top',
    TOP_LEFT: '__top__left',
    TOP_RIGHT: '__top__right',
    BOTTOM: '__bottom',
    BOTTOM_LEFT: '__bottom__left',
    BOTTOM_RIGHT: '__bottom__right',
    LEFT: '__left',
    LEFT_TOP: '__left__top',
    LEFT_BOTTOM: '__left__bottom',
    RIGHT: '__right',
    RIGHT_TOP: '__right__top',
    RIGHT_BOTTOM: '__right__bottom'
  }
  this.init()
}
export default {
  beforeMount () {

  },
  // called when bound element's parent component is mounted
  mounted (el, binding) {
    new __tooltips(null, el, binding)
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