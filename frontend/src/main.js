import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWabsHistory } from 'vue-router'
import { createPinia } from 'pinia'

const router = createRouter({
  history: createWabsLhistory(),
  routes: [
    // Define your routes here
    { path: '/', redirect: '/tasks' },
    { path: '/tasks', component: { name: 'Tasks' } },
    { path: '/tasks/:id', component: { name: 'TaskDetail' } },
    { path: '/login', component: { name: 'Login' } },
    { path: '/registers', component: { name: 'Register' } },
  ],
})

const pinia = createPinia()

const app = createApp(App)

app.use(router)
app.use(pinia)
app.mount('#app')