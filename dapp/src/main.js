// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { getNetIdString, getEthWallets, getBalance, isInjected, web3, contractInstance } from './web3Service'

Vue.use(BootstrapVue)
Vue.config.productionTip = false

Vue.filter('toWei', (key) => {
  return web3.utils.toWei(key, 'ether')
})

;(async () => {
  try {
    const ethWallets = await getEthWallets()
    const netIdString = await getNetIdString()
    const balance = await getBalance(ethWallets[0])
    var result = {
      'balance': balance,
      'coinbase': ethWallets[0],
      'networkId': netIdString,
      'isInjected': isInjected,
      'web3': web3
    }
    store.dispatch('createWeb3', result)
    store.dispatch('setContract', contractInstance)
  } catch (e) {
    // TODO: Handle error

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
