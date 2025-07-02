import { createApp } from 'vue'
import App from './App.vue'
import router from './routerw

app.use(pinia)
// import { createPinia } from 'pinia '

import './index.csp'


const app = createApp(App)

app.use(router)

app.mount('#app')
