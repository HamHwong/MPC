const doms = []
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
  // target.dom.style.fontSize = '8px'
  // target.dom.innerText = `
  // OriginCenterPoint.X:${OriginCenterPoint.X} 
  // TargetCenterPoint:{
  //     X:${TargetCenterPoint.X},
  //     Y:${TargetCenterPoint.Y},
  //     W:${TargetCenterPoint.W},
  //     H:${TargetCenterPoint.H}
  // }
  // scaleX:${scaleX}
  // scaleY:${scaleY}
  // radius:${radius}
  // `
}

function foreachSuspend (e) {
  console.log(e.pageX,e.pageY)
  doms.map(dom => {
    doSuspending({ x: e.pageX, y: e.pageY, w: 0, h: 0 }, dom)
  })
}

export default {
  mounted (el) {
    document.removeEventListener('mousemove', foreachSuspend)
    el.style.transitionProperty = 'transform';
    el.style.transitionDuration = '0.5s';
    doms.push({ x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight, dom: el })
    document.addEventListener('mousemove', foreachSuspend)
  }
}