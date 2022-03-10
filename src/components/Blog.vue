<template>
  <div class="container">
    <!-- header -->
    <div class="header">
      <!-- post blog -->
      <div class="blog-post">
        <i 
          class="iconfont icon-fabu"
          @click="$router.push('/blog-edit')"
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
          @goBlogDetail="goBlogDetail"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from './Search.vue'
import BlogCard from './BlogCard.vue'
import blogAPI from '../api/blog'

export default {
  components: {
    BlogCard,
    SearchBar,
  },
  data(){
    return {
      blogList: [],
      count: 10,
    }
  },

  created(){
    this.getBlogs()
  },

  methods: {
    getBlogs(){
      const page = Math.ceil(this.blogList.length / this.count) + 1

      blogAPI.get({
        page,
        count: this.count,
      }).then(res => {
        console.log(res);
      })
      // const { data: res } = await this.$_axios.get(this.$_api.blog_list, {
      //   params: {
      //     page,
      //     count: this.count,
      //   }
      // })
      // if ( res.code === 10000 ){
      //   this.blogList = res.data
      // }else{
      //   Toast(res.msg)
      // }
    },

    async handleSearch(keyword){
      const {data: res} = await this.$_axios.get(this.$_api.search, { params: { keyword } })

      if ( res.code === 10000 ){
        this.blogList = res.data
      }else{
        this.$toast(res.msg)
      }
    },
    goBlogDetail(id){
      this.$router.push(`/blog-detail/${id}`)
    },
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
  margin-top: 60px
  .blog-item + .blog-item
    margin-top: 10px
</style>