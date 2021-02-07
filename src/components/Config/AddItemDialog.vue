<template>
  <v-dialog v-model="value" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Adding Item</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field label="Item Name*" required v-model="form.title"></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="Item Order" required v-model="curOrder" readonly></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="Price" required v-model="form.price"></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-checkbox v-model="form.on_sale" label="On Sale"></v-checkbox>
            </v-col>
            <v-col cols="6">
              <v-text-field label="Sale Price" required v-model="form.sale_price"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="emit(false)">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click="save()">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
export default {
  props: ['value', 'category', 'group', 'editId'],
  data() {
    return {
      form: {
        id: '',
        title: '',
        order: 0,
        price: 0,
        sale_price: 0,
        on_sale: false,
        parent_id: '',
      },
    }
  },
  methods: {
    ...mapMutations(['insertNewItem']),
    save() {
      this.form.id = Date.now()
      this.form.parent_id = this.group
      this.form.order = this.curOrder
      console.log(this.form)
      this.insertNewItem(this.form)
      this.emit(false)
    },
    emit(val) {
      this.$emit('input', val)
    },
  },
  watch: {
    value(val) {
      if (!val) {
        this.form = {
          id: '',
          title: '',
          order: 0,
          price: 0,
          sale_price: 0,
          on_sale: false,
          parent_id: '',
        }
      }
    },
  },
  mounted() {
    console.log(this.editId)
    this.$nextTick(() => {
      if (this.editId) {
        const i = this.items_data.data
          .map(el => {
            return el.id
          })
          .indexOf(this.editId)
        console.log(this.items_data.data[i])
        this.form = this.items_data.data[i]
      }
    })
  },
  computed: {
    ...mapState(['items_data']),
    ...mapGetters(['sorted_data']),
    curOrder() {
      const i = this.sorted_data
        .map(el => {
          return el.id
        })
        .indexOf(this.category)
      if (this.sorted_data[i] && this.sorted_data[i].brands) {
        const n = this.sorted_data[i].brands
          .map(el => {
            return el.id
          })
          .indexOf(this.group)
        if (this.sorted_data[i].brands[n] && this.sorted_data[i].brands[n].products) {
          // return this.sorted_data[i].brands[n].title
          return this.sorted_data[i].brands[n].products.length + 1
        } else {
          return null
        }
      } else {
        return null
      }
    },
  },
}
</script>

<style></style>
