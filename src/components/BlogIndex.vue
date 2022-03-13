<template>
  <div class="container">
    <!-- header -->
    <div class="header">
      <!-- post blog -->
      <div class="blog-post">
        <i 
          class="iconfont icon-fabu"
          @click="navToEdit"
        >
        </i>
      </div>
      <!-- search -->
      <div class="blog-search">
        <search-bar @search="handleSearch" />
      </div>
    </div>
    <!-- blog list -->
    <div class="blog-list">
      <div 
        class="blog-item"
        v-for="item of blogList"
        :key="item.id"
      >
        <blog-card
          :blog="item"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SearchBar from './Search.vue'
import BlogCard from './BlogCard.vue'
import blogAPI from '../api/blog'

export default {
  components: {
    BlogCard,
    SearchBar,
  },
  
  setup(){
    const count = ref(10)
    const blogList = ref([])
    const router = useRouter()

    const navToEdit = () => {
      router.push('/blog-edit')
    }

    const getBlogs = () => {
      const page = Math.ceil(blogList.value.length / count.value) + 1

      blogAPI.get({
        page,
        count: count.value,
      }).then(res => {
        blogList.value = res.data
      })
    }

    const handleSearch = keyword => {
      blogAPI.search({
        keyword,
      }).then(res => {
        blogList.value = res.data
      })
    }

    return {
      count,
      blogList,
      navToEdit,
      handleSearch,
      getBlogs,
    }
  },

  created(){
    this.getBlogs()
  },
}  
</script>

<style lang="stylus" scoped>
.container
  overflow-y: auto
  background: #f5f5f5
.header
  position: fixed
  top: 0
  width: 100%
  height: 50px
  display: flex
  align-items: center
  box-sizing: border-box
  padding: 0 8px
  background: #fff
  z-index: 10
  .blog-post
    width: 35px
    text-align: center
    .icon-fabu
      font-size: 21px
  .blog-search
    flex: 1  
.blog-list
  margin: 60px 0 55px
  .blog-item + .blog-item
    margin-top: 10px
</style>