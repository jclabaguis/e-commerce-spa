<template>
  <v-app id="app">
    <nav-drawer v-model="drawer"></nav-drawer>
    <app-bar @drawer="drawer = !drawer"></app-bar>
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import { mapActions } from 'vuex'
import AppBar from '@/components/AppBar'
import NavDrawer from '@/components/NavDrawer'
export default {
  data() {
    return {
      drawer: false,
    }
  },
  components: {
    AppBar,
    NavDrawer,
  },
  methods: {
    ...mapActions(['getItemData']),
  },
  created() {
    this.drawer = this.$router.currentRoute.name === 'Home' ? true : false
    this.getItemData()
  },
  watch: {
    $route(to) {
      this.drawer = to.name === 'Home' ? true : false
    },
  },
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
