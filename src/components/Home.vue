<script>
import { ref } from 'vue'
import imageData from '../../public/data.json'
import { useRouter } from 'vue-router'

export default {
  setup() { 
    const categories = ref(imageData)
    const router = useRouter()

    const handleClick = (index) => {
      router.push({ path: '/detail', query: { index, } })
    }

    return {
      categories,
      download,
      handleClick
    }
  },

  methods: {
    // getCategories(){
    //   const ms = import.meta.glob('../../public/image/**')

    //   const set = new Set()

    //   Object.keys(ms).forEach(key => {
    //     const ret = key.match(/\/image\/(.+)?\//)

    //     if ( ret && ret[1] ){
    //       set.add(ret[1])
    //     }
    //   })

    //   console.log([...set])
    // },
  },
}
</script>

<template>
  <ul class="category-wrapper">
    <li
      class="category-item"
      v-for="(item, index) of categories"
      @click="handleClick(index)"
      :key="index"
    >
      <span class="category">{{ item.name }} ({{ item.total }})</span>
    </li>
  </ul>
</template>

<style scoped>
.category-wrapper {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
}

.category-item {
  list-style-type: none;
  margin: 8px;
}

.category {
  cursor: pointer;
}
</style>
