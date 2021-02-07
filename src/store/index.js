import Vue from 'vue'
import Vuex from 'vuex'
import items from '../../exam-data.json'
import vuetify from '../plugins/vuetify'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items_data: [],
    // sorted_data: [],
    selected_category: -1,
    cart: [
      {
        id: '',
        title: '',
        order: 1,
        price: 1,
        sale_price: 1,
        on_sale: false,
        parent_id: '',
        image: '',
        qty: 0,
      },
    ],
  },
  mutations: {
    updateItemData(state, value) {
      state.items_data = value
    },
    upSectedCategory(state, value) {
      state.selected_category = value
    },
    updateCart(state, value) {
      state.cart = value
    },
    insertCart(state, item) {
      const i = state.cart
        .map(el => {
          return el.id
        })
        .indexOf(item.id)
      if (i >= 0) {
        state.cart[i].qty += 1
      } else {
        item.qty = 1
        Vue.set(state.cart, state.cart.length, item)
        // state.cart.push(item)
      }
    },
    updateQtyCart(state, params) {
      // const i = state.cart.indexOf()
      const i = state.cart
        .map(el => {
          return el.id
        })
        .indexOf(params.id)
      if (state.cart[i].qty !== 1 || params.act === 'inc') {
        const qty = state.cart[i].qty + (params.act === 'inc' ? 1 : -1)
        Vue.set(state.cart[i], 'qty', qty)
        Vue.set(state.cart[0], 'qty', state.cart[0] + qty)
      }
      // console.log(params)
    },
    removeItemCart(state, id) {
      const index = state.cart
        .map(el => {
          return el.id
        })
        .indexOf(id)
      Vue.delete(state.cart, index)
      // state.cart.splice(index, 1)
    },
    insertNewItem(state, item) {
      var i = state.items_data.data
        .map(el => {
          return el.id
        })
        .indexOf(item.id)
      i = i >= 0 ? i : state.items_data.data.length
      console.log(i)
      Vue.set(state.items_data.data, i, item)
    },
    deleteItem(state, items) {
      console.log(items)
      items.forEach(el => {
        const i = state.items_data.data
          .map(el => {
            return el.id
          })
          .indexOf(el)
        Vue.delete(state.items_data.data, i)
      })
    },
  },
  actions: {
    getItemData({ commit }) {
      try {
        commit('updateItemData', items)
      } catch (error) {
        console.log(error)
      }
    },
    saveFile() {
      window.localStorage.setItem('arr', items)
      console.log(JSON.parse(window.localStorage.getItem('arr')))
    },
  },
  getters: {
    getTotal: state => {
      let tmp_sum = 0
      state.cart.forEach(el => {
        console.log(el.qty)
        if (!isNaN(el.qty)) {
          tmp_sum += (el.on_sale ? el.sale_price : el.price) * el.qty
        }
      })
      return tmp_sum
    },
    sorted_data: state => {
      var { data } = state.items_data
      let category = [],
        brands = [],
        products = []
      const arr_sort = arr => {
        return arr.sort((a, b) => {
          return a.order - b.order
        })
      }
      data.forEach(el => {
        if (el.parent_id === null) {
          el.brands = []
          category.push(el)
        } else if (el.parent_id !== null && el.price === undefined) {
          el.products = []
          brands.push(el)
        } else {
          el.image = `https://picsum.photos/600/300?random=${data.indexOf(el)}`
          products.push(el)
        }
      })
      arr_sort(category)
      arr_sort(brands)
      arr_sort(products)
      products.forEach(el => {
        if (el.parent_id) {
          const index = brands
            .map(cat => {
              return cat.id
            })
            .indexOf(el.parent_id)
          brands[index].products.push(el)
        }
      })
      brands.forEach(el => {
        if (el.parent_id) {
          const index = category
            .map(cat => {
              return cat.id
            })
            .indexOf(el.parent_id)
          category[index].brands.push(el)
        }
      })
      return category
    },
  },
})
