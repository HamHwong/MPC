<template>
  <div
    :class="{
      'user-card-body': true,
      'left-avatar': avatarPosition === 'left',
      'right-avatar': avatarPosition === 'right',
    }"
  >
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
</template>

<script>
import { inject } from 'vue'
export default {
  setup() {
    const avatar = inject('avatar')
    const avatarPosition = inject('avatarPosition')
    return {
      avatar,
      avatarPosition,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@scss/variables.scss';
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
