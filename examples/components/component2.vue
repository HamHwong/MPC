<template>
  <div>
    This is Component2
  </div>
</template>

<script>
import {   on } from '../../packages/EventBus'
export default {
  name:'component1',
  setup(){
    on('$copy',function(){  
      console.log('From Component2')
    }) 
  }
}
</script>

<style>

</style>