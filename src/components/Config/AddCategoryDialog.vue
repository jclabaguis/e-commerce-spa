<template>
  <v-dialog v-model="value" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Adding Category</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field label="Category Name*" required v-model="form.title"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Category Order" readonly required v-model="curOrder"></v-text-field>
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
  props: ['value', 'editId'],
  data() {
    return {
      form: {
        id: '',
        title: '',
        order: this.curOrder,
        parent_id: null,
      },
    }
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
  methods: {
    ...mapMutations(['insertNewItem']),
    save() {
      this.form.id = Date.now()
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
          order: null,
          parent_id: null,
        }
      }
    },
  },
  computed: {
    ...mapGetters(['sorted_data']),
    ...mapState(['items_data']),
    curOrder() {
      return this.sorted_data.length + 1
    },
  },
}
</script>

<style></style>
