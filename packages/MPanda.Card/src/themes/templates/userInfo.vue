<template>
  <div>
    <div class="user-card-body right-avatar">
      <div class="user-card-avatar">
        <slot name="avatar">
          <img :src="avatar" alt="" />
        </slot>
      </div>
      <div>
        <div class="user-card-name">
          <slot name="title">#title</slot>
        </div>
        <div class="user-card-info">
          <span> <slot name="content">#content</slot></span>
          <p>
            <slot name="others">
              #others
            </slot>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script> 
import { inject } from '@vue/runtime-core'
export default {
  setup() {
    const avatar = inject('avatar')
    return {
      avatar,
    }
  },
}
</script>

<style lang="scss" scoped>
$screen-xs-max: 768px;
$screen-sm-min: 768px;
$screen-sm-max: 992px;
$screen-md-min: 992px;
$screen-md-max: 1200px;
$screen-lg-min: 1200px;
$screen-lg-max: 1366px;
$screen-xlg-min: 1366px;
$screen-xlg-max: 1920px;
$screen-1080-min: 1920px;
$screen-1080-max: 2560px;
$screen-2k-min: 2560px;
$screen-2k-max: 4096px;
$screen-4k-min: 4096px;
$avatar_size: 64px;

.user-card-body {
  position: relative;
  padding: 0.5rem 1rem;
  color: #333;
  .user-card-avatar {
    width: $avatar_size;
    height: $avatar_size;
    position: absolute;
    border-radius: $avatar_size;
    overflow: hidden;
    box-shadow: rgba(17, 17, 26, 0.2) 0px 8px 10px;
    z-index: 1;
    background: #fff;
    img {
      width: $avatar_size;
      height: $avatar_size;
    }
  }
  .user-card-name {
    font-weight: bold;
    font-size: 1.5rem;
  }
  .user-card-info {
    p {
      padding: 0;
      margin: 0;
    }
  }
  &.left-avatar {
    text-align: right;
    &::before {
      content: '';
      width: 64px;
      height: 64px;
      display: block;
      float: left;
    }
    .user-card-avatar {
      left: 0;
      top: 0;
      transform: translateX(30%) translateY(-30%);
    }
  }
  &.right-avatar {
    text-align: left;
    &::before {
      content: '';
      width: 64px;
      height: 64px;
      display: block;
      float: right;
    }
    .user-card-avatar {
      right: 0;
      top: 0;
      transform: translateX(-30%) translateY(-30%);
    }
  }
}
</style>
