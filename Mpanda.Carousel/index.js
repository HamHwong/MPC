function MPandaCarousel() {
  this.slides = null;
  // this.currentSection = null;
  this.currentSectionPos = 2;
  this.pause = false;
  this.pauseTimer = null;
  this.playTimer = null;
  this.intervalTime = 4000;
  this.indicatorsWrapper = null
  this.init = () => {
    this.slides = document.querySelectorAll(".__Carousel .slide");
    this.leftArrow = document.querySelector(".slide-arrow.left")
    this.rightArrow = document.querySelector(".slide-arrow.right")

    this.indicatorsWrapper = document.querySelector('.slide-indicators')
    var carouselController = this

    for (var i = 0; i < this.slides.length; i++) {
      var slide = this.slides[i];
      slide.onmouseup = ((i)=>function () {
        carouselController.focusOn(this,i+1)
      })(i)
      slide.onmouseover = function () {
        carouselController.pause = true;
      }
      slide.onmouseout = function () {
        carouselController.pause = false;
      }
    }

    this.indicatorsWrapper.onmouseover = function () {
      carouselController.pause = true;
    }
    this.indicatorsWrapper.onmouseout = function () {
      carouselController.pause = false;
    }

    this.leftArrow.onmouseup = function () {
      carouselController.pause = true
      clearInterval(carouselController.pauseTimer)
      carouselController.pauseTimer = setInterval(function () {
        carouselController.pause = false
      }, 3000)
      carouselController.toLeft()
    }
    this.rightArrow.onmouseup = function () {
      carouselController.pause = true
      clearInterval(carouselController.pauseTimer)
      carouselController.pauseTimer = setInterval(function () {
        carouselController.pause = false
      }, 3000)
      carouselController.toRight()
    }
    this.loadImg();
    this.generateIndicators();
    this.play();
  };
  this.loadImg = () => {
    for (var i = 0; i < this.slides.length; i++) {
      var slide = this.slides[i];
      var figure = slide.querySelector("figure")
      var imgUrl = figure.dataset.img;
      slide.style.backgroundImage = "url('" + imgUrl + "')"; 
      slide.style.height = (Math.random*4000)+'px'
      console.log(slide,  slide.style.height)
    }
  }
  this.focusOn = (section,index) => {
    section.className = ["slide","active"].join(' ') 
    this.indicatorsWrapper.querySelectorAll('.slide-indicator').forEach(function(dom){
      var classNameArr = dom.className.split(' ')
      dom.className = classNameArr.filter(classname=>classname !== 'active').join('')
    })
    var activeDOM = this.indicatorsWrapper.querySelector('.slide-indicator:nth-child('+(index)+')')
    activeDOM.className = activeDOM.className + " "+ 'active' 
    
    var isLeft = true
    for (var k = 0; k < this.slides.length; k++) {
      var j = this.slides[k]
      j.style.zIndex = isLeft ? this.slides.length : this.slides.length - k;
      if (j == section) {
        this.currentSectionPos = k;
        isLeft = !isLeft;
        continue;
      }
      var sideClassName = isLeft ? "left" : "right";
      j.className = ["slide",sideClassName].join(' '); 
    }
  };
  this.play = () => {
    var carouselController = this
    clearInterval(this.playTimer)
    this.playTimer = setInterval(function () {
      if (!carouselController.pause) {
        var newPos = (carouselController.currentSectionPos + 1) % carouselController.slides.length
        carouselController.focusOn(carouselController.slides[newPos],newPos+1)
      }
    }, carouselController.intervalTime)
  }

  this.sort = (middleSection) => {
    var section = middleSection?middleSection:document.querySelector(".slide.active")
    var isLeft = true
    for (var k = 0; k < this.slides.length; k++) {
      var j = this.slides[k]
      j.style.zIndex = isLeft ? this.slides.length : this.slides.length - k;
      if (j == section) {
        isLeft = !isLeft;
        continue;
      }
    }
    console.log("log done")
  }
  this.generateIndicators=()=>{
    for(var i = 0 ; i <this.slides.length;i++){
      var iDOM = document.createElement('i')
      iDOM.className = ['slide-indicator'].join(' ')
      if(i === this.currentSectionPos){
        iDOM.className = ['slide-indicator','active'].join(' ')
      }
      iDOM.addEventListener('click',((i)=>()=>{ 
        this.focusOn(this.slides[i],i+1)
      })(i))
      this.indicatorsWrapper.append(iDOM)
    } 
  }
  this.toRight = () => {
    var newPos = (this.currentSectionPos + 1) % this.slides.length
    this.focusOn(this.slides[newPos],newPos+1)
  }
  this.toLeft = () => {
    var newPos = (this.currentSectionPos + this.slides.length - 1) % this.slides.length
    this.focusOn(this.slides[newPos],newPos+1)
  }

  this.init();
  this.sort();
}