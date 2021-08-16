export function SizeNumberValidator(val){
  var value = val.toLowerCase()
  if(value.indexOf('px')>0
  ||value.indexOf('em')>0
  ||value.indexOf('rem')>0
  ||value.indexOf('%')>0
  ||value.indexOf('vh')>0
  ||value.indexOf('vw')>0) {
    if(!isNaN(Number(value.split('px')[0]))
    ||!isNaN(Number(value.split('em')[0]))
    ||!isNaN(Number(value.split('rem')[0]))
    ||!isNaN(Number(value.split('%')[0]))
    ||!isNaN(Number(value.split('vh')[0]))
    ||!isNaN(Number(value.split('vw')[0]))){
      return true
    }else{
      return false
    }
  } else if(!isNaN(Number(value))||val.trim()==='null'){
    return true
  } else {
    return false
  }
}