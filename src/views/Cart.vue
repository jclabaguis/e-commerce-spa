<template>
  <v-card flat outlined>
    <v-card-text class="display-2 my-2 black--text">Cart</v-card-text>
    <v-divider></v-divider>
    <v-card-text v-if="cart.length === 0" class="display-1 ma-auto black--text">
      Your Cart is Empty
    </v-card-text>
    <v-card-text>
      <template v-for="(item, i) in cart_data">
        <v-container v-show="item.id" :key="i" class="grey lighten-5 mb-6">
          <v-card class="pa-2" outlined tile>
            <v-row class="mx-5" align="center" justify="start" no-gutters style="height: 250px;">
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
    </v-card-text>
    <!-- dialog -->
    <remove-item-dialog
      @destroyed="item_to_remove_id = ''"
      v-model="show_remove"
      @Agree="removeItemCart(item_to_remove_id)"
    ></remove-item-dialog>
    <cart-footer></cart-footer>
  </v-card>
</template>

<script>
import RemoveItemDialog from '@/components/Cart/RemoveItemDialog'
import CartFooter from '@/components/Cart/CartFooter'
import { mapMutations, mapState } from 'vuex'

export default {
  data() {
    return {
      item_to_remove_id: '',
      show_remove: false,
    }
  },
  components: {
    RemoveItemDialog,
    CartFooter,
  },
  methods: {
    ...mapMutations(['updateQtyCart', 'removeItemCart', 'updateCart']),
    formatNum(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    upQty(id, act, qty) {
      if (act === 'dec' && qty === 1) {
        this.item_to_remove_id = id
        this.show_remove = true
        return false
      }
      // console.log(
      //   this.cart[
      //     this.cart
      //       .map(el => {
      //         return el.id
      //       })
      //       .indexOf(id)
      //   ]
      // )
      this.updateQtyCart({ id, act })
    },
  },
  computed: {
    ...mapState(['cart', 'item_data']),
    cart_data: {
      get() {
        return this.cart
      },
      set(value) {
        return this.updateCart(value)
      },
    },
  },
}
</script>

<style>
.v-text-field__slot input {
  text-align: center;
}
.col .v-image {
  margin: auto;
}
</style>
