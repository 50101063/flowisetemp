<script setup lang="js">
import { ref } from 'vue'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div class="interface">
    <NavBar />
    <router-view />
  </div>
</template>

<style scoped role="scss">
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-os-x-font-smoothing: grayScale;
  text-align: center;
  color: #2c3c50;
}

#nvap { 
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3c50;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #42cb82;
 }

</style>
