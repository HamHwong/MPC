<template>
  <div>
    This is Component1
  </div>
  <div class="container">
    <div class="dot" v-for="i in arr" :key="i"></div> 
  </div>
</template>

<script>
import { computed, reactive } from '@vue/runtime-core'
import { on } from '../../packages/EventBus'
export default {
  name: 'component1',
  setup() {
    on('$copy', function() {
      console.log('From Component1 with bridge')
    })
    let arr = reactive(Array.from({length:7}))
    return {
      arr,
      number: computed(()=>arr.length),
      num:7
    }
  },
}
</script>
<style lang="scss" scoped  >
.container {
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: contrast(30);
  .dot {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: #333;
    filter: blur(10px);
    @mixin a($max) {
      $middle: ceil($max/2);
      @for $i from 1 through $max {
        &:nth-child(#{$i}) {
          $diff: $i - $middle;
          $result: 0;
          @if ($diff>0) {
            $result: $max - $diff;
          } @else {
            $result: $max + $diff;
          }
          transform: scale(#{0.1 * $result});
        }
      }
    }
    @include a(7);
  }
}
</style>