function __tooltips (rootDOM) {
  this.rootDOM = rootDOM || document.querySelector('body')
  this.DOM = null
  this.contentDOM = null
  this.className = '__tooltips __tooltips_hidden';
  this.x = 0;
  this.y = 0;
  this.MODE = {
    FOLLOW_MOUSE: 0,
    FOLLOW_TARGET: 1
  }
  this.mode = this.MODE.FOLLOW_TARGET;
  this.content = null;
  this.init = function () {
    var _this = this
    this.generateTooltipsDOMTo(this.rootDOM)
    this.rootDOM.querySelectorAll('[tooltips]').forEach(function (dom, index) {
      _this.attachEventTriggerToDOM(dom)
    })
  }
  this.generateTooltipsDOMTo = function (parentDOM) {
    if (this.DOM === null || !this.tooltipsExisted()) {
      this.DOM = document.createElement('div')
      this.contentDOM = document.createElement('div')
      this.contentDOM.className = '__tooltips_content'
      this.DOM.appendChild(this.contentDOM)
      this.DOM.className = this.className
      parentDOM.appendChild(this.DOM)
    } else {
      this.DOM = this.rootDOM.querySelector(this.className)
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
    var _this = this
    DOM.addEventListener('mousemove', function (e) {
      if (!_this.isShow()) {
        e.stopPropagation()
        e.preventDefault()
        _this.update(e.target.dataset.title)
        // Mouse Or Target Position
        var x = 0, y = 0
        // debugger
        if (_this.mode === _this.MODE.FOLLOW_TARGET) {
          x = e.x
          y = e.y
        } else {
          x = e.target.offsetLeft
          y = e.target.offsetTop + e.target.offsetHeight / 2
        }

        var direction = _this.getDirection(x, y)

        // Margin Offset
        var wrapper_offset_x = 0
        var wrapper_offset_y = 0

        //Anchor Offset
        _this.setDirection(direction)
        // var anchor_offset = _this.getAnchorOffset(direction)
        // var anchor_offset_x = anchor_offset.x
        // var anchor_offset_y = anchor_offset.y

        //Position Offset 
        var position_offset = _this.getPositionOffset(direction)
        var offset_y = position_offset.y
        var offset_x = position_offset.x

        _this.DOM.style.top = y + wrapper_offset_y + offset_y + 'px'
        _this.DOM.style.left = x + wrapper_offset_x + offset_x + 'px'

        _this.show()
      }
    })
    DOM.addEventListener('mouseleave', function (e) {
      if (_this.isShow()) {
        e.stopPropagation()
        e.preventDefault()
        _this.hide()
      }
    })
  }
  this.show = function () {
    var arr = this.DOM.className.split(' ')
    arr = arr.filter(function (className) { return className !== '__tooltips_hidden' })
    this.DOM.className = arr.join(' ')
  }
  this.hide = function () {
    //console.log('hide')
    var arr = this.DOM.className.split(' ')
    arr.push('__tooltips_hidden')
    this.DOM.className = arr.join(' ')
  }
  this.isShow = function () {
    // console.log(this.DOM.className.split(' '))
    return !!!this.DOM.className.split(' ').find(function (className) { return className === '__tooltips_hidden' })
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
  this.getDirection = function (x,y) {
    console.log(this.DOM.offsetWidth,this.DOM.offsetHeight)
    console.log(x,y)
    return this.Direction.BOTTOM_RIGHT
  }
  // this.getAnchorOffset = function (direction) {
  //   var result = { x: 0, y: 0 }
  //   switch (direction) {
  //     case this.Direction.LEFT:
  //       result.x = 10
  //       result.y = -6
  //       break;
  //     case this.Direction.RIGHT:
  //       result.x
  //       result.y = -6
  //       break;
  //     case this.Direction.TOP:
  //       result.x
  //       result.y = 6
  //       break;
  //     case this.Direction.BOTTOM:
  //       result.x
  //       result.y
  //       break;
  //   }
  //   return result
  // }
  this.getPositionOffset = function (direction) {
    var { width, height } = this.getDOMSize()
    var anchorSize = 5;
    var anchorDistanceToAngle = 2.5;
    var result = {
      x: 0,
      y: 0
    }
    switch (direction) {
      case this.Direction.TOP:
        result.x = -(width - anchorSize) / 2
        result.y = 0
        break;
      case this.Direction.TOP_LEFT:
        result.x = -(anchorSize / 2 + anchorDistanceToAngle)
        result.y = 0
        break;
      case this.Direction.TOP_RIGHT:
        result.x = -width + anchorSize / 2
        result.y = 0
        break;
      case this.Direction.LEFT:
        result.x = anchorSize
        result.y = -(height / 2)
        break;
      case this.Direction.LEFT_TOP:
        result.x = anchorSize
        result.y = - (anchorSize + anchorDistanceToAngle)
        break;
      case this.Direction.LEFT_BOTTOM:
        result.x = anchorSize
        result.y = -(height - anchorSize)
        break;
      case this.Direction.RIGHT:
        result.x = -(width + anchorSize)
        result.y = -(height / 2)
        break;
      case this.Direction.RIGHT_TOP:
        result.x = -(width + anchorSize)
        result.y = - (anchorSize + anchorDistanceToAngle)
        break;
      case this.Direction.RIGHT_BOTTOM:
        result.x = -(width + anchorSize)
        result.y = -(height - anchorSize)
        break;
      case this.Direction.BOTTOM:
        result.x = -(width / 2)
        result.y = -height
        break;
      case this.Direction.BOTTOM_LEFT:
        result.x = -(anchorSize + anchorDistanceToAngle)
        result.y = -height
        break;
      case this.Direction.BOTTOM_RIGHT:
        result.x = -(width - anchorSize - anchorDistanceToAngle)
        result.y = -height
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

