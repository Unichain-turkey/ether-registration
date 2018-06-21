// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import web3 from 'web3'
import App from './App'
import router from './router'
import store from './vuex/store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import datePicker from 'vue-bootstrap-datetimepicker'

import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css'

Vue.use(BootstrapVue)
Vue.use(datePicker)
Vue.config.productionTip = false

Vue.filter('toWei', (key) => {
  return web3.utils.toWei(key, 'ether')
})

;(async () => {
  try {
    await store.dispatch('getContractInstance')
    await store.dispatch('registerWeb3')
  } catch (e) {
    console.log('uff', e)
  } finally {
    new Vue({
      el: '#app',
      store,
      router,
      components: { App },
      template: '<App/>'
    })
  }
})()
