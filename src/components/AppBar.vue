<template>
  <v-app-bar flat color="primary" dark app fixed clipped-left>
    <v-app-bar-nav-icon @click="emit()" v-if="showNavIcon"></v-app-bar-nav-icon>
    <v-app-bar-title style="cursor: pointer;">
      <!-- hidden-md-and-down -->
      <span @click="goHome()" class="title mr-5 "> My&nbsp;<span class="font-weight-light">Market</span> </span>
    </v-app-bar-title>

    <v-btn @click="$router.push('/cart')" class="white--text" icon depressed>
      <v-badge color="error" :content="cart.length - 1" :value="cart.length - 1 >= 1" overlap>
        <v-icon dark>
          mdi-cart
        </v-icon>
      </v-badge>
    </v-btn>
    <v-btn color="white" icon @click="$router.push('/config')">
      <v-icon dark>
        mdi-cog
      </v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      search: '',
      showNavIcon: true,
    }
  },
  computed: {
    ...mapState(['cart']),
  },
  methods: {
    goHome() {
      if (this.$router.currentRoute.path !== '/') this.$router.push('/')
    },
    emit() {
      this.$emit('drawer')
    },
    clearTxt() {
      this.search = ''
    },
  },
  watch: {
    $route(to) {
      this.showNavIcon = to.name === 'Home' ? true : false
    },
  },
}
</script>

<style></style>
