<template>
  <div>
    This is Component1
  </div>
</template>

<script>
import {  on } from '../../packages/EventBus'
export default {
  name:'component1',
  setup(){
    on('$copy',function(){  
      console.log('From Component1 with bridge')
    }) 
  }
}
</script>

<style>

</style>