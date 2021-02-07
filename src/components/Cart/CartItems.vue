<template v-for="(item, i) in value">
  <v-container :key="i" class="grey lighten-5 mb-6">
    <v-card class="pa-2" outlined tile>
      <v-row class="mx-5" align="center" justify="start" no-gutters style="height: 250px;">
        <!-- <v-col v-for="n in 3" :key="n">
              <v-card class="pa-2" outlined tile>
                One of three columns
              </v-card>
            </v-col> -->
        <v-col>
          <span class="headline">{{ item.title }}</span>
          <v-img max-height="219" max-width="250" :src="item.image" class="my-1"></v-img>
          <div v-if="item.on_sale" class="overline">
            <span class="red--text">SALE!</span> ₱{{ formatNum(item.price) }}
          </div>
          <span :class="'headline ' + (item.on_sale ? 'red--text on_sale' : '')">
            ₱ {{ formatNum(item.on_sale ? item.sale_price : item.price) }}
          </span>
        </v-col>
        <v-col>
          <!-- <v-card class="pa-2" outlined tile> -->
          <v-text-field
            append-icon="mdi-plus"
            @click:append="upQty(item.id, 'inc', item.qty)"
            prepend-inner-icon="mdi-minus"
            @click:prepend-inner="upQty(item.id, 'dec', item.qty)"
            placeholder="QTY"
            outlined
            readonly
            class="text-xs-center"
            v-model="item.qty"
            hide-details
          ></v-text-field>
          <!-- </v-card> -->
        </v-col>
        <v-col>
          <span class="headline">
            ₱
            {{ formatNum(item.qty * (item.on_sale ? item.sale_price : item.price)) }}
          </span>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  props: ['value'],
  data() {
    return {}
  },
  methods: {
    ...mapMutations(['updateQtyCart']),
    formatNum(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    upQty(id, act, qty) {
      if (act === 'dec' && qty === 1) {
        this.$emit('removeitem')
        return false
      }
      this.updateQtyCart({ id, act })
      this.$emit('input', this.value)
      console.log(
        this.cart[
          this.cart
            .map(el => {
              return el.id
            })
            .indexOf(id)
        ]
      )
    },
  },
  computed: {
    ...mapState(['cart']),
  },
}
</script>

<style></style>
