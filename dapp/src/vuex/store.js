import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    web3: {
      isInjected: false,
      web3Instance: null,
      networkId: null,
      coinbase: null,
      balance: null,
      error: null
    },
    contractInstance: null,
    NETWORKS: {
      '1': 'Main Net',
      '2': 'Deprecated Morden test network',
      '3': 'Ropsten test network',
      '4': 'Rinkeby test network',
      '42': 'Kovan test network',
      '4447': 'Truffle Develop Network',
      '5777': 'Ganache Blockchain'
    }
  },
  strict: true, // don't leave it true on production
  mutations: {
    CREATEWEB3 (state, result) {
      console.log(result)
      state.web3.balance = result.balance
      state.web3.coinbase = result.coinbase
      state.web3.networkId = result.networkId
      state.web3.isInjected = result.injectedWeb3
    }
  },
  actions: {
    createWeb3 ({ commit }, result) {
      commit('CREATEWEB3', result)
    }
  },
  getters: {
    web3state: state => {
      return state.web3
    },
    balance: state => {
      return state.web3.balance / 1000000000000000000
    },
    coinbase: state => {
      return state.web3.coinbase
    },
    network: state => {
      console.log('mevlana')
      return state.NETWORKS[state.web3.networkId]
    }
  }
})
