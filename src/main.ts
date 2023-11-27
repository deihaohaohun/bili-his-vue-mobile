import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { pinia } from './stores'
import 'vant/lib/index.css'
import { Uploader } from 'vant'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(Uploader)

app.mount('#app')
