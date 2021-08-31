<template>
  <div>
    This is Component1
  </div>
</template>

<script>
import { on } from '../../packages/EventBus'
export default {
  name:'component1',
  setup(){
    on('$copy',()=>{console.log('lalallaal')})
    return {

    }
  }
}
</script>

<style>

</style>