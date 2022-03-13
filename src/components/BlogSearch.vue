<template>
  <div class="search-container">
    <div class="input-container">
      <i class="iconfont icon-sousuo icon-search"></i>
      <input 
        class="input" 
        v-model="content" 
        placeholder="请随便搜点什么" 
        clearable
      />
      <i v-show="showClearIcon" class="iconfont icon-clear" @click="clearInput"></i>
    </div>
    <button class="search-btn" @click="search">搜索</button>
  </div>
</template>

<script>
import { ref, computed } from 'vue' 

export default {
  setup(props, context){
    const content = ref('')

    const search = () => {
      context.emit('search', content.value)
    }

    const clearInput = () => {
      content.value = ''
      search()
    }

    const showClearIcon = computed(() => content.value.length)

    return {
      content,
      clearInput,
      search,
      showClearIcon
    }
  },
}
</script>

<style lang="stylus" scoped>
@import '../assets/styles/variables.styl'

.search-container 
  display: flex
  align-items: center
  font-size: 13px
  .input-container 
    flex: 1
    position: relative
    padding-left: 28px
    background: $backgroundGrey
    border-radius: 30px
  .input
    width: 100%
    height: 30px 
    border-radius: 30px
    border: none
    background: $backgroundGrey
  .icon-search
    position: absolute
    z-index: 1
    top: 50%
    left: 0
    transform: translate(50%, -50%)
  .icon-clear
    position: absolute
    top: 50%
    right: 3px
    transform: translateY(-50%)
    padding-right: 3px
    color: #ccc
.search-btn
  height: 25px
  width: 60px
  line-height: 25px
  margin-left: 5px
  border: none
  border-radius: 25px
  background: $activeGreen
  color: #fff
    
</style>