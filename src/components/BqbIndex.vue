<script>
import { ref } from 'vue'
import imageData from '../../public/data.json'
import { useRouter } from 'vue-router'
import { buildSorter } from '../utils/common'

export default {
  setup() {
    imageData.sort(buildSorter('total', 'DESC'))

    const ret = []

    imageData.forEach((item,index) => {
      const idx = Math.floor(index / 3)

      if (!ret[idx]){
        ret[idx] = []
      }

      ret[idx].push(item)
    })

    const categories = ref(ret)
    
    const router = useRouter()

    const handleClick = (index) => {
      router.push({ path: '/bqb-detail', query: { index, } })
    }

    return {
      categories,
      handleClick
    }
  },
}
</script>

<template>
  <div class="bqb-wrapper">
    <div
      class="bqb-row"
      v-for="(item, index) of categories"
      :key="index"
    >
      <div class="bqb-item" @click="handleClick(index*3 + childIndex)" v-for="(child,childIndex) of item" :key="childIndex">
        <img class="bqb-img" :src="child.children[0]" :alt="child.name" />
        <span class="bqb-category-name">{{ child.name }} ({{ child.total }})</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bqb-wrapper {
  display: flex;
  flex-wrap: wrap;
  padding: 0 5px;
}

.bqb-row {
  display: flex;
  width: 100%;
}

.bqb-row:last-child {
  margin-bottom: 55px;
}

.bqb-item {
  position: relative;
  width: 33%;
  padding-bottom: 33%;
}

.bqb-item + .bqb-item {
  margin-left: 5px;
}

.bqb-img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0; left: 0;
}

.bqb-category-name {
  display: block;
  text-align: center;
  font-size: 14px;
  padding: 10px 0;
}
</style>
