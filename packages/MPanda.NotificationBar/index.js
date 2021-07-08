function __notification (dom) {
  this.data = []
  this.DOM = dom
  this.init = function () {
    this.renderContent()
    this.bindEvent()
    this.render()
  }
  this.index = 0;
  this.renderContent = function () {
    var dataListDOM = this.DOM.querySelector('.__notification_container_inner_wrapper')
    dataListDOM.innerHTML = ''
    dataListDOM.style.top = 0
    var spanDOMs = this.data.map(function (item) {
      var divDOM = document.createElement('div')
      var spanDOM = document.createElement('span')
      spanDOM.innerText = item.content
      divDOM.className = 'content_wrapper'
      divDOM.append(spanDOM)
      return divDOM
    })
    if (spanDOMs.length > 1) {
      spanDOMs.push(spanDOMs[0].cloneNode(true))
    }
    spanDOMs.map(function (item, index) {
      dataListDOM.append(item)
    })
  }
  this.bindEvent = function () {
    var _this = this
    this.DOM.addEventListener('mouseenter', function (e) {
      _this.status = _this.STATUS.PAUSE
      var spanDOMs = e.target.querySelectorAll(`span`)
      var spanContainers = e.target.querySelector('.__notification_container_inner_wrapper')
      if (spanDOMs[_this.index].offsetWidth > spanContainers.offsetWidth) {
        spanDOMs[_this.index].parentElement.className = 'content_wrapper marquee'
        spanDOMs[_this.index].parentElement.style.transition = `margin-left 20s linear`
        spanDOMs[_this.index].parentElement.style.marginLeft = 0 - spanDOMs[_this.index].offsetWidth + 'px'
      }
    })
    this.DOM.addEventListener('mouseleave', function (e) {
      _this.status = _this.STATUS.PROGRESSING

      var spanDOMs = e.target.querySelectorAll(`span`)
      spanDOMs.forEach(function (item) {
        // item.className = 'content_wrapper'
        item.parentElement.className = 'content_wrapper'
        item.parentElement.style.marginLeft = 0 + 'px'
        // item.marginLeft = 0+'px'
      })
    })
    this.DOM.querySelector('.__notification_close').addEventListener('click', function () {
      _this.destory()
    })
  }
  this.loadData = function (data) {
    this.data = data
    this.renderContent()
  }
  this.timer = null
  this.STATUS = {
    PROGRESSING: 'PROGRESSING',
    PAUSE: 'PAUSE',
  }
  this.status = this.STATUS.PROGRESSING
  this.render = function () {
    this.timer = setTimeout(() => {
      window.requestAnimationFrame(this.render.bind(this))
      if (this.status === this.STATUS.PROGRESSING) {
        var dom = this.DOM.querySelector('.__notification_container_inner_wrapper')
        this.index += 1
        this.index = this.index % (this.data.length + 1)
        dom.style.top = this.index * (-28) + 'px'
      }
    }, 5000);
  }
  this.destory = function () {
    this.status = this.STATUS.PAUSE
    clearTimeout(this.timer)
    this.DOM.remove()
  }
  this.init()
}
