<template>
  <div v-bind="$attrs" class="card" :style="{ borderRadius: radius }">
    <component v-if="type" :is="`card-` + type.trim().toLowerCase()">
      <template #default>
        <slot name="default" />
      </template>
      <template #header>
        <slot name="header" />
      </template>
      <template #title>
        <slot name="title" />
      </template>
      <template #avatar>
        <slot name="avatar" />
      </template>
      <template #content>
        <slot name="content" />
      </template>
      <template #date>
        <slot name="date" />
      </template>
      <template #others>
        <slot name="others" />
      </template>
    </component>
    <slot v-else name="default" />
  </div>
</template>

<script>
import { provide, ref, watch } from '@vue/runtime-core'
import { SizeNumberValidator } from '../../MPanda.Validators'
import templates from './themes'
import useProps2ChildrenComponents from '@hooks/props2ChildrenComponents'
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
      validator: (val) => {
        var themes = []
        for (var key in templates) {
          themes.push(key.toLowerCase())
        }
        return (
          themes.includes('card-' + val.trim().toLowerCase()) ||
          val.trim() === ''
        )
      },
      default: () => '',
    },
    avatar: {
      type: [String, null],
      default: () => null
    },
    backgroundImage:{
      type:[String,null],
      default: ()=>null
    },
    avatarPosition: {
      type: String,
      default: () => 'left'
    },
  },
  setup(props, ctx) {
    if(['userinfo'].includes(props.type.toLowerCase())){
      useProps2ChildrenComponents(props,'avatar',require('@/assets/images/default-avatar.png'))
      useProps2ChildrenComponents(props,'avatarPosition','left')
    }
    if(['bankcard'].includes(props.type.toLowerCase())){ 
      useProps2ChildrenComponents(props,'backgroundImage')
    } 
    
    return {
      ...templates,
    }
  },
}
</script>
<style lang="scss" scoped>
.card {
  width: 100%;
  min-height: 100px;
  box-shadow: 0 0 20px #ccc;
  position: relative;
} 
</style>
<style lang="scss">

.card:not(:first-child){
  margin-left: 10px;
}
</style>
