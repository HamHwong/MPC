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
      // console.log(dom.dataset.title)
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
    DOM.addEventListener('mouseenter', function (e) {
      if (!_this.isShow()) {
        e.stopPropagation()
        e.preventDefault()
        _this.update(e.target.dataset.title)

        var direction = _this.getDirection()

        // Margin Offset
        var wrapper_offset_x = 10
        var wrapper_offset_y = 10

        //Anchor Offset
        _this.setDirection(direction)
        var anchor_offset = _this.getAnchorOffset(direction)
        var anchor_offset_x = anchor_offset.x
        var anchor_offset_y = anchor_offset.y

        //Position Offset 
        var position_offset = _this.getPositionOffset(direction)
        var offset_y = position_offset.y
        var offset_x = position_offset.x

        var x = 0, y = 0
        if (_this.mode === _this.MODE.FOLLOW_TARGET) {
          x = e.target.offsetLeft
          y = e.target.offsetTop + e.target.offsetHeight
          console.log(e)
        } else {
          x = e.x
          y = e.y
        }

        _this.DOM.style.top = y - wrapper_offset_y + anchor_offset_y + offset_y + 'px'
        _this.DOM.style.left = x - wrapper_offset_x + anchor_offset_x + offset_x + 'px'
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
    //console.log('show')
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
  this.setDirection = function (direction) {
    var classNames = this.DOM.className.split(' ')
    var directionClassNames = []
    for (var key in this.Direction) {
      directionClassNames.push(this.Direction[key])
    }
    classNames = classNames.filter(function (directionName) { return !directionClassNames.includes(directionName) })
    switch (direction) {
      case this.Direction.LEFT:
        classNames.push('__left')
        break;
      case this.Direction.RIGHT:
        classNames.push('__right')
        break;
      case this.Direction.TOP:
        classNames.push('__top')
        break;
      case this.Direction.BOTTOM:
        classNames.push('__bottom')
        break;
    }
    this.DOM.className = classNames.join(' ')
  }
  this.getDirection = function (e) {
    //TODO
    return this.Direction.TOP
  }
  this.getAnchorOffset = function (direction) {
    var result = { x: 0, y: 0 }
    switch (direction) {
      case this.Direction.LEFT:
        result.x = 10
        result.y = -6
        break;
      case this.Direction.RIGHT:
        result.x
        result.y = -6
        break;
      case this.Direction.TOP:
        result.x
        result.y = 6
        break;
      case this.Direction.BOTTOM:
        result.x
        result.y
        break;
    }
    return result
  }
  this.getPositionOffset = function (direction) {
    var result = {
      x: 0,
      y: 0
    }
    switch (direction) {
      case this.Direction.LEFT:
        result.x = 0
        result.y = 0
        break;
      case this.Direction.RIGHT:
        result.x = -250
        result.y = 0
        break;
      case this.Direction.TOP:
        result.x
        result.y = -this.DOM.offsetHeight
        break;
      case this.Direction.BOTTOM:
        result.x
        result.y
        break;
    }
    return result
  }
  this.Direction = {
    LEFT: '__left',
    RIGHT: '__right',
    TOP: '__top',
    BOTTOM: '__bottom'
  }
  this.init()
}

