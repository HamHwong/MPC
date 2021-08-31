<template>
  <div>
    This is Component1
  </div>
</template>

<script>
import { emit, on } from '../../packages/EventBus'
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