import Web3 from 'web3'

import activityContract from '../../build/contracts/Activitycontract.json'

var addrActivityContract = '0x93e52492d81532a644acbf47e717485f9ac23187'

const NETWORKS = {
  '1': 'Main Net',
  '2': 'Deprecated Morden test network',
  '3': 'Ropsten test network',
  '4': 'Rinkeby test network',
  '42': 'Kovan test network'
}

const getContract = new Promise(function (resolve, reject) {
  console.log('1')
  let web3 = window.web3
  let contract = null
  if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider)
    contract = new web3.eth.Contract(activityContract.abi, addrActivityContract)
  } else {
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
    contract = new web3.eth.Contract(activityContract.abi, addrActivityContract)
  }

  resolve(contract)
})

let getWeb3 = new Promise(function (resolve, reject) {
  // Check for injected web3 (mist/metamask)
  var web3js = window.web3
  if (typeof web3js !== 'undefined') {
    var web3 = new Web3(web3js.currentProvider)
    resolve({
      injectedWeb3: true,
      web3 () {
        return web3
      }
    })
  } else {
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545')) // GANACHE FALLBACK
    resolve({
      injectedWeb3: false,
      web3 () {
        return web3
      }
    })
  }
})
  .then(result => {
    return new Promise(function (resolve, reject) {
      // Retrieve coinbase
      result.web3().eth.getAccounts((err, coinbase) => {
        if (err) {
          reject(new Error('Unable to retrieve coinbase'))
        } else {
          console.log(coinbase)
          result = Object.assign({}, result, { coinbase })
          resolve(result)
        }
      })
    })
  })

export {getWeb3, getContract }
