<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import imageData from '../../public/data.json'

export default {
  setup() {
    const route = useRoute()
    const index = route.query.index

    const imaegs = ref(imageData[index].children)

    const saveImg = (Url) => {
      var blob=new Blob([''], {type:'application/octet-stream'});
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = Url;
      a.download = Url.replace(/(.*\/)*([^.]+.*)/ig,"$2").split("?")[0];
      var e = document.createEvent('MouseEvents');
      e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      a.dispatchEvent(e);
      URL.revokeObjectURL(url);
    }

    const download = (url) => {
      saveImg(url)
    }

    return {
      imaegs,
      download
    }
  },
}
</script>

<template>
  <ul class="container">
    <li class="img-item" v-for="(item,index) of imaegs" :key="index">
      <img @click="download(item)" class="img" :src="item" :alt="item">
    </li>
  </ul>
</template>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  padding: 0 10px;
}

.img-item {
  list-style-type: none;
  margin: 8px;
}

.img {
  width: 80px; 
  height: 60px;
}
</style>