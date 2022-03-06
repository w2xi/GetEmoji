<script>
import { ref } from '@vue/reactivity'
export default {
  setup() { 
    const modules = import.meta.glob('../../public/image/安排/**/')

    console.log(modules);

    const images = ref(modules)

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
      // const url = window.URL.createObjectURL(new Blob([''], {type: 'application/octet-stream'}))
      // const link = document.createElement('a')
      // link.style.display = 'none'
      // link.href = Url
      // link.setAttribute('download', +new Date + '.jpg')
      // document.body.appendChild(link)
      // link.click()
      // document.body.removeChild(link)
    }

    const download = (url) => {
      saveImg(url)
    }

    return {
      images,
      download
    }
  },
}
</script>

<template>
  <ul class="img-wrapper">
    <li
      class="img-item"
      @click="download(key)"
      v-for="(item, key) of images"
      :key="key"
    >
      <img class="img" :src="key" :alt="key" />
    </li>
  </ul>
</template>

<style scoped>
.img-wrapper {
  display: flex;
  flex-wrap: wrap;
  padding: 0;
}

.img-item {
  width: 80px;
  height: 70px;
  list-style-type: none;
  margin: 10px;
}

.img {
  width: 100%;
  height: 100%;
  cursor: pointer;
}
</style>
