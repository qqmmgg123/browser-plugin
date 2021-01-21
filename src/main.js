import Vue from 'vue'
import App from './App.vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'lang',
  messages: {
    'lang': templateData
  }
})

new Vue({
  i18n,
  render: h => h(App),
}).$mount('#app')
