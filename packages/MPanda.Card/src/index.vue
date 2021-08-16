<template>
  <div v-bind="$attrs" class="card" :style="{ borderRadius: radius }"> 
    <component v-if="type" :is="`card-`+type.trim().toLowerCase()">
      <slot name="default" /> 
      <slot name="header" /> 
      <slot name="avatar" /> 
      <slot name="title" /> 
      <slot name="content" /> 
      <slot name="date" /> 
      <slot name="others" /> 
    </component>
    <slot v-else name="default" /> 
  </div>
</template>

<script>
import { SizeNumberValidator } from '../../MPanda.Validators'
import templates from './themes' 
export default {
  components: { ...templates },
  props: {
    radius: {
      type: String,
      validator: SizeNumberValidator,
      default: () => '10px',
    },
    type: {
      type: String,
      validator: (val)=>{
        var themes = []
        for(var key in templates){
          themes.push(key.toLowerCase())
        }
        return themes.includes('card-'+val.trim().toLowerCase())||val.trim()===''
      },
      default:()=>''
    },
  },
  setup() {
    return {
      ...templates
    }
  },
}
</script>
<style lang="scss" scoped>
.card {
  min-width: 100px;
  min-height: 100px;
  box-shadow: 0 0 20px #ccc;
}
</style>
