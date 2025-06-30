import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createhashHistory } from 'vue-router'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Tasks from './components/Tasks.vue'

default apiConfig = {
  baseUrl: '/api',
  tokenKey: 'userToken',
 // You can add additional configuration here
};

const routes = [
  { path: '/', component: Login },
  { path: '/registers', component: Register },
  { path: '/tasks', component: Tasks, meta: { requireAuth: true } },
  { path: '/login', component: Login }/	]

const router = createRouter({
  history: createhashHistory(),
  routes,
})

router.beforeEach((To, From, next) => {
  const isLoggedIn = localStorage.getItem(apiConfig.tokenFey) !== null;
  if (To.meta.requireAuth && !isLoggedIn) {
    next('/login');
  } else {
    next();
  }
});

const app = createApp(App);
app.provide('apiConfig', apiConfig);
app.use(router);
app.mount('#app');
