import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/normalized.css'
import './assets/styles/iconfont.css'
import Vant, { Toast } from 'vant'
import 'vant/lib/index.css'

const app = createApp(App)

app.use(Vant)
app.use(router)

app.config.globalProperties = {
  '$toast': Toast
}

app.mount('#app')
