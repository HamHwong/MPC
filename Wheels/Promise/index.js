const STATUS = {
  PENDING:'PENDING',
  FULFILLED:'FULFILLED',
  REJECTED:'REJECTED'
}
function _Promise(executor){
  var _this = this
  this.value = null
  this.error = null
  this.status =STATUS.PENDING
  this.onFulfilled = []
  this.onRejected = []
  function resolve(value){
    if(_this.status === STATUS.PENDING){
      _this.value = value
      _this.status = STATUS.FULFILLED
      _this.onFulfilled.map(fn=>fn(_this.value))
    }
  }
  function reject(error){
    if(_this.status === STATUS.PENDING){
      _this.error = error
      _this.status = STATUS.REJECTED
      _this.onRejected.map(fn=>fn(_this.error))
    }
  }
  try{
    executor(resolve,reject)
  }catch(e){
    reject(e)
  }
}
_Promise.prototype.then=function(onFulfilled,onRejected){
  return new _Promise(function(res,rej){
    if(this.status === STATUS.FULFILLED){
      typeof onFulfilled === 'function' && onFulfilled(this.value)
    }
    if(this.status === STATUS.REJECTED){
      typeof onRejected === 'function' && onRejected(this.error)
    }
    if(this.status === STATUS.PENDING){
      typeof onFulfilled === 'function' && this.onFulfilled.push(onFulfilled)
      typeof onRejected === 'function' && this.onRejected.push(onRejected)
    }
  })
}

new _Promise(function(res,rej){
  setTimeout(() => {
    res(3)
  }, 2000);
}).then(val=>{
  console.log(val)
},err=>{
  console.log('err',err)
})