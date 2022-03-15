<template>
  <div class="box">
    <div class="header">
      <h1 class="form-title">Login</h1>
    </div>
    <div class="form">
      <div class="form-item">
        <input v-model.trim="username" class="input" placeholder="please enter your username" />
      </div>
      <div class="form-item">
        <input type="password" class="input" v-model.trim="password" placeholder="please enter your password" />
      </div>
      <div class="form-item button-box">
        <div class="button" @click="handleSubmit">Submit</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import userAPI from '../api/user'
import { Toast } from 'vant'
import { setToken, setUserInfo } from '../utils/auth'

export default {
  data(){
    return {
      username: '',
      password: '',
    }
  },

  setup(){
    const router = useRouter()
    const username = ref('')
    const password = ref('')

    const handleSubmit = () => {
      if ( !username.value ){
        return Toast({
          message: 'please enter your username',
          position: 'middle',
        })
      }

      if ( !password.value ){
        return Toast({
          message: 'please enter your pasword',
          position: 'middle',
        })
      }

      Toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true,
      })

      userAPI.login({
        username: username.value,
        password: password.value,
      }).then(res => {
        Toast.clear()
        
        res = res.data

        setToken(res.token)
        setUserInfo(res.userInfo)

        router.push('/')
      })
    }

    return {
      username,
      password,
      handleSubmit,
    }
  },
}
</script>
<style lang="stylus" scoped>
@import '../assets/styles/variables.styl'

.fade-enter-active, .fade-leave-active
  transition: opacity .3s
.fade-enter, .fade-leave-to
  opacity: 0
.box
  position: absolute
  top: 45%
  left: 50%
  transform: translate(-50%, -50%)
  width: 80% 
  height: 340px
  text-align: center
  box-shadow: 4px 4px 10px 4px rgba(0,0,0,.1)
  background: #fefefe
  .header
    padding: 20px 0
  .form-title
    margin: 10px 0
  .form 
    margin-top: 40px
  .form-item + .form-item 
    margin-top: 10px
  .input, .button
    font-size: 14px
    width: 80%
    padding: 10px
    border: 1px solid #cfcfcf
  .form-item.button-box
    margin-top: 20px  
  .button
    margin: 0 auto
    background: $activeBlue
    color: #fff
</style>	