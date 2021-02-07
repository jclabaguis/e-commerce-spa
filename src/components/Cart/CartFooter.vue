<template>
  <v-footer fixed padless>
    <v-card flat tile width="100%" class="primary text-right pr-15">
      <v-card-text class="headline">
        Total: <span class="display-1">₱ {{ getTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</span>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  data() {
    return {
      total: 0,
    }
  },
  computed: {
    ...mapState(['cart']),
    ...mapGetters(['getTotal']),
  },
  methods: {},
}
</script>

<style></style>
