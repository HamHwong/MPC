function __Modal (obj) {
  obj = obj || {
    mode: 0,
    shadow: true,
    close_by_click_shadow: true,
    target_DOM: null,
    content_DOM: null,
    onShow: null,
    onClose: null
  }
  this.mode = obj.mode || 0
  this.shadow = obj.shadow || true
  this.hide_by_click_shadow = obj.close_by_click_shadow || true
  this.target_DOM = obj.target_DOM
  this.zIndex = 0
  this.DOM = null
  this.Shadow_DOM = null
  this.Content_Wrapper_DOM = null
  this.Content_DOM = null
  this.onShow = obj.onShow && typeof obj.onShow == 'function' ? obj.onShow.bind(this) : function () { }
  this.onClose = obj.onClose && typeof obj.onClose == 'function' ? obj.onClose.bind(this) : function () { }
  this.MODE = {
    INTO_BODY: 0,
    INTO_SPECIFIC_DOM: 1
  }
  this.init = function () {
    this.render()
    this.bindClick()
  }
  this.render = function () {
    var ShadowDOM = document.createElement('div')
    ShadowDOM.className = ['__Model_Shadow', 'Hide'].join(' ')
    this.Shadow_DOM = ShadowDOM
    if (this.hide_by_click_shadow) {
      var _this = this
      this.Shadow_DOM.addEventListener('click', function () {
        _this.hide()
      })
    }
    switch (this.mode) {
      case this.MODE.INTO_BODY:
        document.querySelector('body').append(this.Shadow_DOM)
        break;
      case this.MODE.INTO_SPECIFIC_DOM:
        if (this.target_DOM) this.mode = this.MODE.INTO_SPECIFIC_DOM
        this.target_DOM.append(this.Shadow_DOM)
        break;
    }
    this.Shadow_DOM = ShadowDOM
  }
  this.getTopZIndex = function () {
    var shadows = document.querySelectorAll('.__Model_Shadow')
    var zIndexArr = []
    shadows.forEach(function (shadowDOM) {
      zIndexArr.push(shadowDOM.style.zIndex)
    })
    return Math.max(...zIndexArr) + 2
  }
  this.load = function (content) {
    this.clear()
    if (typeof content === 'string') {
      var d = document.createElement('div')
      d.innerHTML = content
      content = d
    } 

    this.Content_DOM = content
    this.Content_Wrapper_DOM = document.createElement('div')
    // Adding Header
    var dialog_tooltips = document.createElement('div')
    dialog_tooltips.className = ['__Model_Header'].join(' ')
    this.Content_Wrapper_DOM.append(dialog_tooltips)
    // End Adding Header
    // Adding buttons
    var btn_close = document.createElement('div')
    btn_close.className = ['__Model_Close_Btn'].join(' ')
    var _this = this
    btn_close.addEventListener('click',function(){
      _this.hide()
    })
    dialog_tooltips.append(btn_close)
    // End Adding Buttons

    this.Content_Wrapper_DOM.className = ['__Model'].join(' ')
    this.Content_Wrapper_DOM.append(content)
    this.Shadow_DOM.append(this.Content_Wrapper_DOM)
    var arr = this.Shadow_DOM.className.split(' ').filter(className => !['Hiding', 'Hide'].includes(className))
    arr.push('Hide')
    this.Shadow_DOM.className = arr.join(' ')
  }
  this.bindClick = function () {
    var btns = document.querySelectorAll('[data-modal-btn]')
    var _this = this
    btns.forEach(function (dom) {
      dom.addEventListener('click', function (e) {
        var injectDOMs = document.querySelectorAll(`[data-modal=${dom.dataset.modalBtn}]`)
        if (injectDOMs.length > 1) {
          throw new Error(`有多个DOM名为${dom.dataset.modalBtn},注入DOM不明确`)
        } else if (injectDOMs.length === 1) {
          var injectDOM = injectDOMs[0]
          injectDOM.style.display = 'block'
          _this.load(injectDOM)
          _this.show()
        } else {
          throw new Error(`未找到DOM名为${dom.dataset.modalBtn}`)
        }
      })
    })
  }
  this.hide = function () {
    return new Promise((res, rej) => {
      var classNamesArr = this.Shadow_DOM.className.split(' ').filter(function (name) { return name !== 'Hiding' })
      classNamesArr.push('Hiding')
      this.Shadow_DOM.className = classNamesArr.join(' ')
      setTimeout(() => {
        var arr = classNamesArr.filter(function (name) { return name !== 'Hiding' })
        arr.push('Hide')
        this.Shadow_DOM.className = arr.join(' ')
        this.onClose(this)
        res()
      }, 500);
    })
  }
  this.show = function () {
    return new Promise((res, rej) => {
      var arr = this.Shadow_DOM.className.split(' ').filter(className => !['Hiding', 'Hide'].includes(className))
      this.Shadow_DOM.className = arr.join(' ')
      var offsetTop = 0
      if (this.Content_Wrapper_DOM.offsetTop > 0) {
        offsetTop = this.Content_Wrapper_DOM.offsetTop
      } else {
        offsetTop = 0 - this.Content_Wrapper_DOM.offsetTop
      }
      this.Content_Wrapper_DOM.style.top = offsetTop + 10 + 'px'
      console.log(this.Content_Wrapper_DOM.style.top)
      this.onShow(this)
      res()
    })
  }
  this.clear = function () {
    this.Shadow_DOM.innerHTML = ''
  }
  this.distory = function () {
    this.Shadow_DOM.remove()
  }
  this.init()
}