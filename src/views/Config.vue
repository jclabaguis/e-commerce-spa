<template>
  <v-card class="mx-auto" width="auto">
    <v-list class="text-left">
      <v-list-group v-for="cat in sorted_data" :key="cat.title">
        <template v-slot:activator>
          <v-list-item-title @mouseover="hover = cat.title" @mouseleave="hover = ''">
            {{ cat.title }}
            <span v-show="hover == cat.title">
              <v-btn icon small @click="editCat(cat.id)">
                <v-icon color="indigo lighten-1" small>
                  mdi-pencil
                </v-icon>
              </v-btn>
              <v-btn icon small @click="deleteCat(cat)">
                <v-icon color="error lighten-1" small>
                  mdi-delete
                </v-icon>
              </v-btn>
            </span>
          </v-list-item-title>
        </template>

        <v-list-group v-for="brand in cat.brands" :key="brand.title" no-action sub-group>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title @mouseover="hover = brand.title" @mouseleave="hover = ''"
                >{{ brand.title }}
                <span v-show="hover == brand.title">
                  <v-btn icon small @click="editBrand(brand.id)">
                    <v-icon color="indigo lighten-1" small>
                      mdi-pencil
                    </v-icon>
                  </v-btn>
                  <v-btn icon small @click="deleteBrand(brand)">
                    <v-icon color="error lighten-1" small>
                      mdi-delete
                    </v-icon>
                  </v-btn>
                </span></v-list-item-title
              >
            </v-list-item-content>
          </template>

          <v-list-item v-for="product in brand.products" :key="product.title" link>
            <v-list-item-title @mouseover="hover = product.title" @mouseleave="hover = ''"
              >{{ product.title }}
              <span v-show="hover == product.title">
                <v-btn icon small @click="editItem(product.id)">
                  <v-icon color="indigo lighten-1" small>
                    mdi-pencil
                  </v-icon>
                </v-btn>
                <v-btn icon small @click="deleteProduct(product)">
                  <v-icon color="error lighten-1" small>
                    mdi-delete
                  </v-icon>
                </v-btn>
              </span></v-list-item-title
            >
          </v-list-item>
          <v-list-item>
            <v-btn elevation="1" rounded color="indigo lighten-4" @click="newItem(cat.id, brand.id)">
              <v-icon small> mdi-plus </v-icon> Add Item</v-btn
            >
          </v-list-item>
        </v-list-group>
        <v-list-item>
          <v-btn elevation="1" rounded color="indigo lighten-4" @click="newBrand(cat.id)">
            <v-icon small> mdi-plus </v-icon> Add Brand</v-btn
          >
        </v-list-item>
      </v-list-group>
      <v-list-item>
        <v-btn elevation="1" rounded color="indigo lighten-4" @click="addCategory.show = true">
          <v-icon small> mdi-plus </v-icon> Add Category</v-btn
        >
      </v-list-item>
    </v-list>
    <add-category-dialog
      v-if="addCategory.show"
      v-model="addCategory.show"
      :editId="addCategory.id"
      lazy
    ></add-category-dialog>
    <add-brand-dialog
      v-if="addBrand.show"
      v-model="addBrand.show"
      :category="addBrand.cat"
      :editId="addBrand.id"
    ></add-brand-dialog>
    <add-item-dialog
      v-if="addItem.show"
      v-model="addItem.show"
      :category="addItem.cat"
      :group="addItem.brand"
      :editId="addItem.id"
    ></add-item-dialog>
  </v-card>
</template>

<script>
import AddCategoryDialog from '@/components/Config/AddCategoryDialog'
import AddBrandDialog from '@/components/Config/AddBrandDialog'
import AddItemDialog from '@/components/Config/AddItemDialog'
import { mapGetters, mapMutations } from 'vuex'
export default {
  components: {
    AddCategoryDialog,
    AddBrandDialog,
    AddItemDialog,
  },
  data() {
    return {
      hover: '',
      addCategory: {
        id: null,
        show: false,
      },
      addBrand: {
        id: null,
        show: false,
        cat: '',
      },
      addItem: {
        id: null,
        show: false,
        cat: '',
        brand: '',
      },
    }
  },
  methods: {
    ...mapMutations(['deleteItem']),
    deleteCat(data) {
      var ids = [data.id]
      data.brands.forEach(el => {
        ids.push(el.id)
        el.products.forEach(pr => {
          ids.push(pr.id)
        })
      })
      this.deleteItem(ids)
    },
    deleteBrand(data) {
      var ids = [data.id]
      data.products.forEach(pr => {
        ids.push(pr.id)
      })
      this.deleteItem(ids)
    },
    deleteProduct(data) {
      var ids = [data.id]
      this.deleteItem(ids)
    },
    newBrand(cat) {
      this.addBrand.cat = cat
      this.addBrand.show = true
    },
    newItem(cat, brand) {
      this.addItem.cat = cat
      this.addItem.brand = brand
      this.addItem.show = true
    },
    editCat(id) {
      this.addCategory.id = id
      this.addCategory.show = true
    },
    editBrand(id) {
      this.addBrand.id = id
      this.addBrand.show = true
    },
    editItem(id) {
      console.log('editItem', id)
      this.addItem.id = id
      this.addItem.show = true
    },
  },
  computed: {
    ...mapGetters(['sorted_data']),
  },
}
</script>

<style></style>
