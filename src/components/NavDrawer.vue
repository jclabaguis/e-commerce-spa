<template>
  <!-- <v-navigation-drawer :value="value" @input="emit($event)" fixed app> -->
  <v-navigation-drawer width="300" @input="emit($event)" clipped :value="value" fixed class="grey lighten-4" app>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          Product List
        </v-list-item-title>
        <v-list-item-subtitle>
          Select from the categories
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>
    <!-- <v-card class="mx-auto" max-width="300" tile> -->
    <v-list shaped>
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item v-for="(cat, key) in sorted_data" :key="key">
          <v-list-item-icon>
            <v-icon>mdi-label</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="cat.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <!-- </v-card> -->
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
  data() {
    return {
      // selectedItem: {},
    }
  },
  props: {
    value: Boolean,
  },
  methods: {
    ...mapMutations(['upSectedCategory']),
    emit(val) {
      this.$emit('input', val)
    },
  },
  computed: {
    ...mapGetters(['sorted_data']),
    ...mapState(['selected_categoryry']),
    selectedItem: {
      get() {
        return this.selected_categoryry
      },
      set(newval) {
        return this.upSectedCategory(newval)
      },
    },
  },
}
</script>

<style></style>
