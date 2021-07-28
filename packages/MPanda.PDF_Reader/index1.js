
window._utils = {
  string: {
    randomString: function (len) {
      len = len || 32
      var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz'
      var maxPos = $chars.length
      var pwd = ''
      for (var i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
      }
      return pwd
    }
  },
  event: {
    debounce: function (func, wait) {
      let lastTime = null;
      let timeout;
      return function () {
        let context = this;
        let now = new Date();
        // 判定不是一次抖动
        if (now - lastTime - wait > 0) {
          setTimeout(() => {
            func.apply(context, arguments);
          }, wait);
        } else {
          if (timeout) {
            clearTimeout(timeout);
            timeout = null;
          }
          timeout = setTimeout(() => {
            func.apply(context, arguments);
          }, wait);
        }
        // 注意这里lastTime是上次的触发时间
        lastTime = now;
      }
    }
  }
}
function __PDF (containerDOM, pdfurl, workerurl, width = 0, height = 0) {
  this.width = width
  this._height = height
  Object.defineProperty(this, "height", {
    set (val) {
      this._height = val
      if (this.thumbsInnerWrapperDOM) {
        // debugger
        var height = 0
        if (val <= 450) {
          height = 450
        } else if (val >= 900) {
          height = 900
        } else {
          height = val
        }
        this.thumbsInnerWrapperDOM.style.height = height + 'px'
      }
    },
    get () {
      return this._height
    }
  })
  this.url = pdfurl
  this.Reader = null
  this.contentDOM = null
  this.canvasDOM = null
  this.canvasWrapper = null
  this.thumbs = []
  this.thumbsDOM = null
  this.thumbsInnerWrapperDOM = null
  this.ctx = null
  this.id = window._utils.string.randomString(6)
  this.dragging = false
  this.pdfDoc = null
  this.keyboardHasBound = false
  this._MaxPage = 0
  Object.defineProperty(this, "MaxPage", {
    set (val) {
      this.Reader.querySelectorAll('.__PDF_Max_Page').forEach(label => {
        label.innerText = `/ ${val}`
      })
      this._MaxPage = Number(val)
      this.generateThumbs()
    },
    get () {
      return this._MaxPage
    }
  })
  this._CurrentPage = 0
  Object.defineProperty(this, "CurrentPage", {
    set (val) {
      if (this._CurrentPage !== val) {
        var value = Number(String(val).replace(/[^\d]/g, ''))
        if (value > this.MaxPage) value = this.MaxPage
        if (value <= 0) value = 1
        this.Reader.querySelectorAll('input').forEach(input => {
          input.value = value
        })
        this._CurrentPage = value
        this.toPage(value)
      }
    },
    get () {
      return this._CurrentPage
    }
  })
  this._Scale = 1
  Object.defineProperty(this, "Scale", {
    set (val) {
      if (val > 0) {
        this._Scale = val
        this.toPage(this._CurrentPage)
      }
    },
    get () {
      return this._Scale
    }
  })
  this._LoadingPDF = false
  Object.defineProperty(this, "LoadingPDF", {
    set (val) {
      this._LoadingPDF = val
      var ReaderClassNames = this.Reader.className.split(' ')
      if (val) {
        ReaderClassNames.push('loading')
      } else {
        ReaderClassNames = ReaderClassNames.filter(i => i !== 'loading')
      }
      this.Reader.className = ReaderClassNames.join(' ')
    },
    get () {
      return this._LoadingPDF
    }
  })
  this.init = async function () {
    if (workerurl) {
      pdfjsLib.GlobalWorkerOptions.workerSrc = workerurl;
    }
    this.Reader = await this.generatePDFReader()
    window.addEventListener('mousewheel', (e) => {
      window._utils.event.debounce(() => {
        if (this.isElementInViewport(this.Reader)) {
          if (!this.keyboardHasBound) {
            this.bindKeyboard(this.Reader)
            this.keyboardHasBound = true
          }
        } else {
          this.unbindKeyboard(this.Reader)
          this.keyboardHasBound = false
        }
      }, 300)()
    }) 
    this.LoadingPDF = true;
    pdfjsLib.getDocument(this.url).promise.then((pdfDoc) => {
      this.pdfDoc = pdfDoc;
      this.MaxPage = pdfDoc.numPages;
      this.CurrentPage = 1;
      this.LoadingPDF = false;
      // _this.handlePage(_this.CurrentPage)
    })
  }
  this.isElementInViewport = function (el, container) {
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
  this.generatePDFReader = async function () {
    var reader = document.createElement('div')
    reader.setAttribute("id", 'pdf_reader_' + this.id)
    reader.className = ['__PDF_Reader'].join(' ')
    // reader.style.maxHeight = `${this.height}px`
    // reader.style.maxWidth = `${this.width}px`
    reader.append(await this.generateTools())
    this.contentDOM = await this.generateCanvas()
    reader.append(this.contentDOM)
    reader.append(await this.generateTools('bottom'))

    containerDOM.append(reader)

    return reader
  }
  this.checkAndMarkIfCanvasWrapperIsOverflow = function () {
    var classNames = this.canvasWrapper.className.split(' ')
    if(this.canvasWrapper.offsetWidth < this.canvasWrapper.scrollWidth || this.canvasWrapper.offsetHeight < this.canvasWrapper.scrollHeight){ 
      if(!classNames.includes('zoom')){
        classNames.push('zoom')
      }
    }else{ 
      classNames = classNames.filter(i=>i!=='zoom') 
    }
    this.canvasWrapper.className = classNames.join(' ')
  }
  this.generateTools = async function (direction='top') {
    var tools = document.createElement('div')
    tools.className = ['__PDF_Tools','hidden',direction].join(' ')
    var toolsArr = []
    // 缩小
    var shrinkBtn = this.generateButton(['__PDF_Btn'], '<p class="icon-zoom-out"></p>', 'click', function (e) {
      e.stopPropagation()
      e.preventDefault()
      this.checkAndMarkIfCanvasWrapperIsOverflow()
      this.Scale = this.Scale / 1.25
    })
    toolsArr.push(shrinkBtn)
    // 上一页
    var prePageBtn = this.generateButton(['__PDF_Btn', '__BTN_Pre'], '<p>上一页</p>', 'click', function (e) {
      e.stopPropagation()
      e.preventDefault()
      this.prePage()
    })
    toolsArr.push(prePageBtn)
    // 输入框
    var input = this.generateInput()
    toolsArr.push(input)
    // 最大页
    var maxPageLabel = document.createElement('label')
    maxPageLabel.className = ['__PDF_Max_Page'].join(' ')
    maxPageLabel.style.marginRight = "15px"
    maxPageLabel.style.color = "#fff"
    maxPageLabel.innerHTML = `/ ${this.MaxPage}`
    toolsArr.push(maxPageLabel)
    // 下一页
    var nextPageBtn = this.generateButton(['__PDF_Btn', '__BTN_Next'], '<p>下一页</p>', 'click', function (e) {
      e.stopPropagation()
      e.preventDefault()
      this.nextPage()
    })
    toolsArr.push(nextPageBtn)
    // 放大
    var enlargeBtn = this.generateButton(['__PDF_Btn'], '<p  class="icon-zoom-in"></p>', 'click', function (e) {
      e.stopPropagation()
      e.preventDefault()
      this.checkAndMarkIfCanvasWrapperIsOverflow()
      this.Scale = this.Scale * 1.25
    })
    toolsArr.push(enlargeBtn)

    var menuBtn = document.createElement('div')
    menuBtn.className = ['__PDF_Menu_Btn','icon-sort'].join(' ')
    menuBtn.addEventListener('click',(e)=>{
      // console.log(e)
      var classNames = tools.className.split(' ')
      var menuBtnClassNames =   menuBtn.className.split(' ')
      if(classNames.includes('hidden')){
        classNames = classNames.filter(i=>i!=='hidden')
        menuBtnClassNames = menuBtnClassNames.filter(i=>i!=='icon-sort')
        menuBtnClassNames.push('icon-minus')
      }else{
        classNames.push('hidden')
        menuBtnClassNames = menuBtnClassNames.filter(i=>i!=='icon-minus')
        menuBtnClassNames.push('icon-sort')
      }
      tools.className = classNames.join(' ')
      menuBtn.className = menuBtnClassNames.join(' ')
    })
    toolsArr.push(menuBtn)
    toolsArr.map(btn => {
      tools.append(btn)
    })
    return tools
  }
  this.generateThumbsWrapper = function () {
    var thumbsWrapper = document.createElement('div')
    thumbsWrapper.className = ['Thumbs_Wrapper'].join(' ')
    // init
    var thumbsInnerWrapper = document.createElement('div')
    thumbsInnerWrapper.className = ['Thumbs_Inner_Wrapper'].join(' ')
    thumbsInnerWrapper.style.height = '1000px'
    this.thumbsInnerWrapperDOM = thumbsInnerWrapper
    thumbsWrapper.append(thumbsInnerWrapper)
    var thumbsHandler = document.createElement('div')
    thumbsHandler.innerText = '导航栏'
    thumbsHandler.className = ['Thumbs_Handler','icon-angle-right'].join(' ')
    thumbsHandler.addEventListener('click', () => {
      var classNames = thumbsWrapper.className.split(' ')
      var handlerClassName = thumbsHandler.className.split(' ')
      if (classNames.includes('unfold')) {
        thumbsWrapper.className = classNames.filter(i => i !== 'unfold').join(' ')
        // Icon Change 
        handlerClassName = handlerClassName.filter(i=>i!=='icon-angle-left')
        handlerClassName.push('icon-angle-right')
        thumbsHandler.className = handlerClassName.join(' ')
      } else {
        classNames.push('unfold')
        thumbsWrapper.className = classNames.join(' ')
        // Icon Change 
        handlerClassName = handlerClassName.filter(i=>i!=='icon-angle-right')
        handlerClassName.push('icon-angle-left')
        thumbsHandler.className = handlerClassName.join(' ')
      }
    })
    thumbsWrapper.append(thumbsHandler)
    //Thumbs_Handler
    return thumbsWrapper
  }
  this.generateThumbs = function () {
    var _this = this
    function bindThumbsEvent (thumb) {
      // Click Event 
      thumb.addEventListener('click', function () {
        _this.toPage(thumb.dataset.page)
      })
    }
    function renderThumb (thumb) {
      if (null === thumb.getAttribute('rendered')) {
        thumb.setAttribute('rendered', '')
        var canvas = document.createElement('canvas')
        var ctx = canvas.getContext('2d')
        var pageNumber = Number(thumb.dataset.page)
        if (!isNaN(pageNumber)) {
          this.pdfDoc.getPage(pageNumber).then(function (page) {
            var desiredHeight = 120;
            var viewport = page.getViewport({ scale: 1 });
            var scale = desiredHeight / viewport.height;
            var scaledViewport = page.getViewport({ scale: scale, });
            canvas.height = scaledViewport.height;
            canvas.width = scaledViewport.width;
            var renderContext = {
              canvasContext: ctx,
              viewport: scaledViewport
            };
            var renderTask = page.render(renderContext);
            renderTask.promise.then(function () {
              thumb.append(canvas)
              thumb.setAttribute('rendered', '')
            }).catch(e => {
              console.log(e)
              thumb.removeAttribute('rendered')
            })
          })
        }
      }
    }
    var fragment = document.createDocumentFragment()
    for (var i = 0; i < this.MaxPage; i++) {
      var thumb = document.createElement('div')
      thumb.dataset.page = i + 1
      thumb.className = ['Thumb'].join(' ')
      this.thumbs.push(thumb)
      fragment.append(thumb)
    }

    for (var j = 0; j < this.thumbs.length; j++) {
      bindThumbsEvent(this.thumbs[j])
    }

    this.thumbsInnerWrapperDOM.addEventListener('mousewheel', (e) => {
      renderThumbs()
    })
    function renderThumbs () {
      for (var j = 0; j < _this.thumbs.length; j++) {
        var thumb = _this.thumbs[j]
        if (_this.isElementInViewport(thumb, _this.thumbsInnerWrapperDOM)) {
          renderThumb.call(_this, thumb)
        }
      }
    }
    this.thumbsInnerWrapperDOM.append(fragment)
    //Init Thumbs
    renderThumbs()
  }
  this.keyupEvent = function (e) {
    if (e.code === 'ArrowLeft') {
      e.stopPropagation()
      e.preventDefault()
      this.prePage()
    } else if (e.code === 'ArrowRight') {
      e.stopPropagation()
      e.preventDefault()
      this.nextPage()
    }
  }.bind(this)
  this.bindKeyboard = function () {
    window.addEventListener('keyup', this.keyupEvent)
  }
  this.unbindKeyboard = function () {
    window.removeEventListener('keyup', this.keyupEvent)
  }
  this.generateButton = function (className, innerHTML, event, callback) {
    var button = document.createElement('div')
    button.innerHTML = innerHTML
    button.className = className.join(' ')
    button.addEventListener(event, callback.bind(this))
    return button
  }
  this.generateInput = function () {
    var input = document.createElement('input')
    input.style.width = "25px"
    input.addEventListener('keydown', e => {
      console.log(e)
    })
    input.addEventListener('keyup', (e) => {
      input.value = input.value.replace(/[^\d]/g, '')
      if (!this.LoadingPDF) {
        this.LoadingPDF = true
        window._utils.event.debounce(() => {
          this.CurrentPage = Number(input.value.replace(/[^\d]/g, ''))
          this.LoadingPDF = false
        }, 300)()
      }
    })
    return input
  }
  this.nextPage = function () {
    if (this.CurrentPage + 1 <= this.MaxPage) {
      ++this.CurrentPage
    }
  }
  this.prePage = function () {
    if (this.CurrentPage - 1 > 0) {
      --this.CurrentPage
    }
  }
  this.generateCanvas = async function () {
    // containerDOM 
    this.canvasDOM = document.createElement('canvas')
    this.ctx = this.canvasDOM.getContext('2d')
    if (this.height && this.height > 0)
      this.canvasDOM.height = this.height
    if (this.width && this.width > 0)
      this.canvasDOM.width = this.width
    this.canvasDOM.setAttribute('id', 'pdf_' + this.id)
 
    var readerWrapper = document.createElement('div')
    readerWrapper.className = ['__PDF_Reader_Inner_Wrapper'].join(' ')
    // readerWrapper.style.maxHeight = `${this.height}px`
    // readerWrapper.style.maxWidth = `${this.width}px`
    // readerWrapper.addEventListener('scroll',e=>console.log(e)) 

    // Canvas Wrapper
    var canvasWrapper = document.createElement('div')
    canvasWrapper.className = ['Canvas_Wrapper'].join(' ')
    canvasWrapper.append(this.canvasDOM)
    this.canvasWrapper = canvasWrapper

    var _this = this
    var startX = 0
    var offsetXOfLast = 0
    var endX = 0
    var startY = 0
    var offsetYOfLast = 0
    var endY = 0
    canvasWrapper.addEventListener('mousedown', function (e) {
      _this.dragging = true
      startX = e.screenX
      startY = e.screenY
    })
    canvasWrapper.addEventListener('mousemove', function (e) {
      if (_this.dragging) {
        endX = e.screenX
        this.scrollLeft += -(endX - startX) - offsetXOfLast
        offsetXOfLast = -(endX - startX)

        endY = e.screenY
        this.scrollTop += -(endY - startY) - offsetYOfLast
        offsetYOfLast = -(endY - startY)
      }
    })
    canvasWrapper.addEventListener('mouseup', function () {
      offsetXOfLast = 0
      offsetYOfLast = 0
      _this.dragging = false
    })
    canvasWrapper.addEventListener('mousewheel', function (e) {
      e.stopPropagation()
      e.preventDefault()
      if (e.deltaY > 0) {
        _this.nextPage()
      } else {
        _this.prePage()
      }
    })
    // readerWrapper.addEventListener('mouseout',function(){
    //   offsetXOfLast = 0
    //   _this.dragging = false
    // })
    this.thumbsDOM = this.generateThumbsWrapper()
    readerWrapper.append(this.thumbsDOM)
    readerWrapper.append(canvasWrapper)
    return readerWrapper
  }
  this.toPage = function (num) {
    num = Number(num) || 1
    // this.LoadingPDF = true;
    var canvas = this.canvasDOM || document.getElementById(this.id);
    var ctx = this.ctx || canvas.getContext('2d');
    var _this = this;
    this.pdfDoc.getPage(num).then(function (page) {
      var viewport = page.getViewport({ scale: _this.Scale });
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      _this.width = viewport.width;
      _this.height = viewport.height; 
      var renderContext = {
        canvasContext: ctx,
        viewport: viewport
      };
      var renderTask = page.render(renderContext);

      renderTask.promise.then(function () {
        _this.CurrentPage = num
        if (_this.CurrentPage + 1 <= _this.MaxPage) {
          //Enabled Next
          _this.Reader.querySelectorAll('.__BTN_Next').forEach(function (btn) {
            var names = btn.className.split(' ')
            names = names.filter(name => name !== 'disabled')
            btn.className = names.join(' ')
          })
        } else if (_this.CurrentPage + 1 > _this.MaxPage) {
          //Disabled Next
          _this.Reader.querySelectorAll('.__BTN_Next').forEach(function (btn) {
            var names = btn.className.split(' ')
            names.push('disabled')
            btn.className = names.join(' ')
          })
        }
        if (_this.CurrentPage - 1 > 0) {
          //Enabled Pre
          _this.Reader.querySelectorAll('.__BTN_Pre').forEach(function (btn) {
            var names = btn.className.split(' ')
            names = names.filter(name => name !== 'disabled')
            btn.className = names.join(' ')
          })
        } else if (_this.CurrentPage - 1 <= 0) {
          //Disabled pre
          _this.Reader.querySelectorAll('.__BTN_Pre').forEach(function (btn) {
            var names = btn.className.split(' ')
            names.push('disabled')
            btn.className = names.join(' ')
          })
        }

        // Thumb Selected
        _this.thumbsInnerWrapperDOM.querySelectorAll('.Thumb').forEach(thumb => {
          var classNames = thumb.className.split(' ').filter(i => i !== 'selected')
          thumb.className = classNames.join(' ')
        })
        var thumb = _this.thumbsInnerWrapperDOM.querySelector(`.Thumb[data-page='${num}']`)
        if (thumb) {
          var className = thumb.className.split(' ')
          className.push('selected')
          thumb.className = className.join(' ')
        }
      }).finally(function () {
        _this.LoadingPDF = false;
      });
    });
  }
  this.destroy = function () {

  }
  this.init()
}
