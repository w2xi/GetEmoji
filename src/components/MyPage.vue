<script>
import { ref } from 'vue'
import { getUserInfo } from '../utils/auth'
import defaultAvatarUrl from '../assets/images/default-avatar.jpg'

export default {
  setup() {
    const userInfo = getUserInfo()
    const { username, avatar } = userInfo

    const nickname = ref(username)
    const avatarUrl = ref(avatar || defaultAvatarUrl)

    return {
      nickname,
      avatarUrl,
    }
  },
}
</script>

<template>
  <div class="container">
    <div class="user-info">
      <img class="user-avatar" :src="avatarUrl" alt="default" />
      <div class="user-nickname">{{ nickname }}</div>
      <div class="user-bio">偷得浮生半日闲,人间至味是清欢</div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.container
  height: 100vh

.user-info
  height: 250px
  text-align: center
  .user-avatar
    height: 80px
    width: 80px
    border-radius: 50%
    margin-top: 50px
  .user-nickname
    font-size: 16px
    color: #444
    margin-top: 5px
  .user-bio
    font-size: 14px
    color: #888
    margin-top: 20px
</style>