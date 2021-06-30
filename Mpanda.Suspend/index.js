class Suspending{
  constructor(){
    this.mouseX = 0;
    this.mouseY = 0;
    this.doms = []
    
    var init=()=>{
      var _this = this
      document.addEventListener('mousemove',function(e){
        _this.mouseX = e.pageX
        _this.mouseY = e.pageY
        _this.doms.map(dom=>{
          checkCollide({x:_this.mouseX,y:_this.mouseY,w:0,h:0},dom,10)
        })
      })
      document.querySelectorAll('[Suspend]').forEach(dom=>{
        bind(dom)
        var domObj = {x:dom.offsetLeft,y:dom.offsetTop,w:dom.offsetWidth,h:dom.offsetHeight,dom}
        _this.doms.push(domObj)
      })
    }
    function bind(dom){

    }
    function checkCollide(origin ,target ,offset){
      var OriginCenterPoint = {X:origin.x+origin.w/2,Y:origin.y+origin.h/2}
      var TargetCenterPoint = {X:target.x+target.w/2,Y:target.y+target.h/2}
      // var OriginMatrix =[ 
      //   [OriginCenterPoint.X-origin.w/2,OriginCenterPoint.Y-origin.h/2],
      //   [OriginCenterPoint.X+origin.w/2,OriginCenterPoint.Y-origin.h/2],
      //   [OriginCenterPoint.X-origin.w/2,OriginCenterPoint.Y+origin.h/2],
      //   [OriginCenterPoint.X+origin.w/2,OriginCenterPoint.Y+origin.h/2]
      // ]
      // var TargetMatrix = [
      //   [TargetCenterPoint.X-target.w/2-offset,TargetCenterPoint.Y-target.h/2-offset],
      //   [TargetCenterPoint.X+target.w/2+offset,TargetCenterPoint.Y-origin.h/2-offset],
      //   [TargetCenterPoint.X-target.w/2-offset,TargetCenterPoint.Y+target.h/2+offset],
      //   [TargetCenterPoint.X+target.w/2+offset,TargetCenterPoint.Y+target.h/2+offset]
      // ]
      // var Matrix = [
      //   [0,0,0,0],
      //   [0,0,0,0],
      //   [0,0,0,0],
      //   [0,0,0,0]
      // ]
      // var Force = 1
      // 中心点到目标四点的距离,距离越短,影响越高
      // OriginCenterPoint
      var rotateX = 0;
      var rotateY = 0;
      var maxRotate = 10;
      var scale = 1

      var distance = Math.sqrt(Math.pow(TargetCenterPoint.X-OriginCenterPoint.X,2)+Math.pow(TargetCenterPoint.Y-OriginCenterPoint.Y,2))
      if(distance == 0)distance = Infinity
      scale = distance/target.w
      if(scale>=1){
        scale = 1
      } 
      if(TargetCenterPoint.X -  OriginCenterPoint.X>0){
        rotateY = -maxRotate*scale
      }else{
        rotateY = maxRotate*scale
      }

      if(TargetCenterPoint.Y - OriginCenterPoint.Y > 0 ){
        rotateX = maxRotate*scale
      }else{
        rotateX = -maxRotate*scale
      }
      // target.dom.innerText = ` 
      // target.width: ${target.w} px
      // distance: ${distance} px
      // rotateX(${Math.floor(rotateX)}deg) 
      // rotateY(${Math.floor(rotateY)}deg`
      target.dom.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    }
    init()
  }
  
}
new Suspending()