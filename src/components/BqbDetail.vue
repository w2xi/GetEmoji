<script>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import imageData from '../../public/data.json'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const index = route.query.index
    const children = imageData[index].children
    const cateTitle = imageData[index].name
    const title = ref(cateTitle)
    const showCheckbox = ref(false)
    const checkedNums = ref(0)

    const ret = []

    children.forEach((item,index) => {
      const idx = Math.floor(index / 3)

      if (!ret[idx]){
        ret[idx] = []
      }

      ret[idx].push(item)
    })

    const imaegs = ref(ret)

    const saveImg = (Url) => {
      var blob = new Blob([''], {type:'application/octet-stream'});
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = Url;
      a.download = Url.replace(/(.*\/)*([^.]+.*)/ig,"$2").split("?")[0];
      var e = document.createEvent('MouseEvents');
      e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      a.dispatchEvent(e);
      URL.revokeObjectURL(url);
    }

    let touchstartTime, touchendTime
    let checkedObjs = {}

    const handleTouchstart = () => {
      touchstartTime = +new Date
    }

    const handleTouchend = (ev, url) => {
      touchendTime = +new Date

      const diff = touchendTime - touchstartTime

      if ( diff < 300 ){
        console.log('click', url);
      }else {
        console.log('long click');
        showCheckbox.value = true
      }
    }

    const handleClickCheckbox = (ev, url) => {
      const isChecked = ev.srcElement.checked

      if ( isChecked ){
        checkedObjs[url] = ev.srcElement  
      }else {
        delete checkedObjs[url]
      }

      const nums = Object.keys(checkedObjs).length

      checkedNums.value = nums
    }

    const download = () => {
      const urls = Object.keys(checkedObjs)

      urls.forEach(url => {
        saveImg(url)
      })
    }

    const cancel = () => {
      checkedNums.value = 0
      showCheckbox.value = false
      // reset checkbox
      Object.values(checkedObjs).forEach(elem => elem.checked = false)
      checkedObjs = {}
    }

    return {
      imaegs,
      title,
      checkedNums,
      router,
      handleClickCheckbox,
      handleTouchstart,
      handleTouchend,
      download,
      cancel,
      showCheckbox
    }
  },
}
</script>

<template>
  <header class="header">
    <div class="go-back col-5" @click="router.go(-1)">{{ title }}</div>
    <div class="extra-info col-5">
      <template v-if="checkedNums > 0">
        已选中 {{ checkedNums }} 项
        <span class="action-download" @click="download">下载</span>
      </template>
      <span v-show="showCheckbox" class="action-cancel" @click="cancel">取消</span>
    </div>
  </header>
  <div class="bqb-wrapper">
    <div class="bqb-row" v-for="(item,index) of imaegs" :key="index">
      <div
        class="bqb-box"
        v-for="(img,idx) of item"
        :key="idx"
      >
        <img
          class="bqb-img" 
          @touchstart="handleTouchstart(img)"
          @touchend="handleTouchend($event, img)"
          :src="img" 
          :alt="img"
        />
        <input v-show="showCheckbox" @click="handleClickCheckbox($event, img)" class="checkbox" type="checkbox" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
  height: 45px;
  background: #a7f0ef;
  z-index: 1;
}

.go-back:before {
  content: "";
  display: inline-block;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  height: .5rem;
  width: .5rem;
  border-width: 0 0 2px 2px;
  border-color: #333;
  border-style: solid;
  margin: 0 5px 0 15px;
  font-weight: normal;
}

.header .extra-info {
  font-size: 14px;
  text-align: right;
  margin-right: 15px;
}

.extra-info .action-download {
  display: inline-block;
  font-weight: 600;
  margin: 0 7px;
}

.exta-info .action-cancel {
  color: #666;
}

.bqb-wrapper {
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  margin-top: 55px;
}

.bqb-row {
  display: flex;
  width: 100%;
}

.bqb-row:last-child {
  margin-bottom: 15px;
}

.bqb-box {
  position: relative;
  width: 33%;
  padding-bottom: 33%;
}

.bqb-box + .bqb-box {
  margin-left: 5px;
}

.bqb-img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0; left: 0;
}

.checkbox {
  position: absolute;
  bottom: 8px;
  right: 3px;
}

.col-1 {
  width: calc(100% / 10)
}

.col-2 {
  width: calc(100% / 10 * 2)
}

.col-3 {
  width: calc(100% / 10 * 3)
}

.col-4 {
  width: calc(100% / 10 * 4)
}

.col-5 {
  width: calc(100% / 10 * 5)
}

.col-6 {
  width: calc(100% / 10 * 6)
}

.col-7 {
  width: calc(100% / 10 * 7)
}

.col-8 {
  width: calc(100% / 10 * 8)
}

.col-9 {
  width: calc(100% / 10 * 9)
}
</style>