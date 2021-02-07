<template>
  <v-card color="basil" v-if="selected_category !== -1">
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold display-3 basil--text">
        {{ category.title }}
      </h1>
    </v-card-title>

    <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
      <v-tab v-for="(item, key) in category.brands" :key="key">
        {{ item.title }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="(brand, bkey) in category.brands" :key="bkey">
        <v-card color="basil" flat>
          <v-container fluid class="justify-left">
            <v-row class="ma-1" align="start" justify="start">
              <v-col v-for="(item, key) in brand.products" :key="key">
                <item-card :value="item" :img="item.image"></item-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import ItemCard from './ItemCard'
import { mapState, mapGetters } from 'vuex'
export default {
  components: {
    ItemCard,
  },
  computed: {
    ...mapGetters(['sorted_data']),
    ...mapState(['selected_category']),
    category() {
      return this.sorted_data[this.selected_category]
    },
  },
  data() {
    return {
      tab: null,
      items: ['Appetizers', 'Entrees', 'Deserts', 'Cocktails'],
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }
  },
}
</script>

<style>
/* Helper classes */
.basil {
  background-color: #fffbe6 !important;
}
.basil--text {
  color: #356859 !important;
}
</style>
