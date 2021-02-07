<template>
  <v-card class="mx-auto" max-width="300" outlined tile>
    <v-img height="250" :src="img"></v-img>
    <v-list-item-title class="headline my-2">
      {{ value.title }}
    </v-list-item-title>
    <!-- <v-card-text>
      <v-card-subtitle v-if="value.on_sale"> <span class="red--text">SALE!</span> ₱{{ value.price }} </v-card-subtitle>
      <v-card-title :class="c"
        >₱ {{ value.on_sale ? value.sale_price : value.price }}</v-card-title
      >
    </v-card-text> -->
    <v-list-item three-line>
      <v-list-item-content>
        <div v-if="value.on_sale" class="overline mb-4">
          <span class="red--text">SALE!</span> ₱{{ formatNum(value.price) }}
        </div>
        <v-list-item-title :class="'headline mb-1 ' + (value.on_sale ? 'red--text on_sale' : '')">
          ₱ {{ formatNum(value.on_sale ? value.sale_price : value.price) }}
        </v-list-item-title>
        <!-- <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle> -->
      </v-list-item-content>
    </v-list-item>

    <v-card-actions>
      <v-btn color="secondary" class="ma-2 white--text" :loading="btn_loading" @click="addToCart()">
        Add to Cart
        <v-icon right dark>
          mdi-cart-plus
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      btn_loading: false,
      val: {
        id: '292ca5c8-71b9-4f5e-aa83-ba801c3c3214',
        title: 'Samsung Galaxy J8',
        order: 4,
        price: 6831,
        sale_price: 5999,
        on_sale: true,
        parent_id: '570e892b-f796-4a3f-9fab-90c9cfe33c0e',
      },
    }
  },
  props: ['value', 'img'],
  methods: {
    ...mapMutations(['insertCart']),
    async addToCart() {
      this.btn_loading = true
      await this.insertCart(this.value)
      setTimeout(() => {
        this.btn_loading = false
      }, 500)
    },
    formatNum(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
  },
}
</script>

<style>
.on_sale {
  animation: blinker 1s linear infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}
</style>
