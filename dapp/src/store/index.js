import Vue from 'vue'
import Vuex from 'vuex'
import { ipfs, getWeb3, getContract } from '../common/web3Service'

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
    ipfsApi: null,
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
    registerWeb3Instance (state, payload) {
      // console.log('registerWeb3instance Mutation being executed', payload)
      let result = payload
      state.web3.isInjected = result.injectedWeb3
      state.web3.web3Instance = result.web3
      state.web3.coinbase = result.coinbase[0]
    },
    registerContractInstance (state, payload) {
      // console.log('Casino contract instance: ', payload)
      state.contractInstance = () => payload
    },
    SETIPFS (state, result) {
      state.ipfsApi = result
    },
  },
  actions: {
    registerWeb3 ({commit}) {
      getWeb3.then(result => {
        // console.log('committing result to registerWeb3Instance mutation', result)
        commit('registerWeb3Instance', result)
      }).catch(e => {
        console.log('Error in getweb3', e)
      })
    },
    getContractInstance ({commit}) {
      getContract.then(result => {
        // console.log('Try to set contract instanse with data', result)
        commit('registerContractInstance', result)
      }).catch(e => console.log('Gene', e))
    },
    ipfsSet ({ commit }) {
      commit('SETIPFS',ipfs)
    },
  },
  getters: {
    web3state: state => {
      return state.web3
    },
    web3Instance: state => {
      return state.web3.web3Instance
    },
    balance: state => {
      return (state.web3.balance / 1000000000000000000).toFixed(4)
    },
    currentAddress: state => {
      return state.web3.coinbase
    },
    network: state => {
      return state.NETWORKS[state.web3.networkId]
    },
    contract: state => {
      return state.contractInstance
    },
    getIpfs: state => {
      return state.ipfsApi
    }
  }
})
