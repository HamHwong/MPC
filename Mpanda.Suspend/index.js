class Suspending {
  constructor() {
    this.mouseX = 0;
    this.mouseY = 0;
    this.doms = []
    var init = () => {
      var _this = this
      document.addEventListener('mousemove', function (e) {
        _this.mouseX = e.pageX
        _this.mouseY = e.pageY
        _this.doms.map(dom => {
          doSuspending({ x: _this.mouseX, y: _this.mouseY, w: 0, h: 0 }, dom)
        })
      })
      document.querySelectorAll('[Suspend]').forEach(dom => {
        var domObj = { x: dom.offsetLeft, y: dom.offsetTop, w: dom.offsetWidth, h: dom.offsetHeight, dom }
        _this.doms.push(domObj)
      })
    }
    function doSuspending (origin, target, radius) {
      var OriginCenterPoint = { X: origin.x + origin.w / 2, Y: origin.y + origin.h / 2 }
      var TargetCenterPoint = { X: target.x + target.w / 2, Y: target.y + target.h / 2, W: target.w, H: target.h }
      var rotateX = 0;
      var rotateY = 0;
      var maxRotate = 15;
      var scaleX = 1
      var scaleY = 1

      if (!radius || radius <= 0) {
        radius = 0
      }

      if (
        OriginCenterPoint.Y >= TargetCenterPoint.Y - TargetCenterPoint.H / 2
        && OriginCenterPoint.Y <= TargetCenterPoint.Y + TargetCenterPoint.H / 2
      ) {
        scaleX = 0
      }
      if (OriginCenterPoint.X >= TargetCenterPoint.X - TargetCenterPoint.W / 2
        && OriginCenterPoint.X <= TargetCenterPoint.X + TargetCenterPoint.W / 2
      ) {
        scaleY = 0
      }
      if (scaleX >= 1) {
        scaleX = 1
      }
      if (scaleY >= 1) {
        scaleY = 1
      }

      if (radius === 0 || Math.abs(TargetCenterPoint.X - OriginCenterPoint.X) <= radius) {
        if (TargetCenterPoint.X - OriginCenterPoint.X > 0) {
          rotateY = -maxRotate * scaleY
        } else {
          rotateY = maxRotate * scaleY
        }
      }

      if (radius === 0 || Math.abs(TargetCenterPoint.Y - OriginCenterPoint.Y) <= radius) {

        if (TargetCenterPoint.Y - OriginCenterPoint.Y > 0) {
          rotateX = maxRotate * scaleX
        } else {
          rotateX = -maxRotate * scaleX
        }
      }

      target.dom.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      target.dom.style.fontSize = '8px'
      target.dom.innerText = `
      OriginCenterPoint.X:${OriginCenterPoint.X} 
      TargetCenterPoint:{
          X:${TargetCenterPoint.X},
          Y:${TargetCenterPoint.Y},
          W:${TargetCenterPoint.W},
          H:${TargetCenterPoint.H}
      }
      scaleX:${scaleX}
      scaleY:${scaleY}
      radius:${radius}
      `
    }
    init()
  }

}
new Suspending()