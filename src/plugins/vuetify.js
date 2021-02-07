import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
import 'roboto-fontface/css/roboto/roboto-fontface.css'

Vue.use(Vuetify)

export default new Vuetify({
  iconfont: ['mdi'],
  theme: {
    // dark: true ,
    themes: {
      light: {
        primary: '#388E3C',
        secondary: '#00897B',
        accent: '#3F51B5',
        error: '#f44336',
        warning: '#ffeb3b',
        info: '#2196f3',
        success: '#4caf50',
      },
    },
  },
})
