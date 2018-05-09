import Web3 from 'web3'

import activityContract from '../../build/contracts/Activitycontract.json'

var addrActivityContract = '0x88c015d75be972177f171efcf6fd708d095c83b5'

var contractInstance = null

let web3 = window.web3
var isInjected = false
console.log(window.web3)
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider)
  contractInstance = new web3.eth.Contract(activityContract.abi, addrActivityContract)
  console.log('herer injected')
  isInjected = true
} else {
  web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
  contractInstance = new web3.eth.Contract(activityContract.abi, addrActivityContract)

  isInjected = false
}

const NETWORKS = {
  '1': 'Main Net',
  '2': 'Deprecated Morden test network',
  '3': 'Ropsten test network',
  '4': 'Rinkeby test network',
  '42': 'Kovan test network'
}

const getNetIdString = async () => {
  const id = await web3.eth.net.getId()
  if (typeof id === 'number') {
    return NETWORKS[id] || 'Truffle Test Network'
  } else {
    return ''
  }
}

const getEthWallets = () =>
  new Promise((resolve, reject) => {
    web3.eth.getAccounts((err, res) => {
      if (!err) return resolve(res)
      reject(err)
    })
  })
const getBalance = (account) =>
  new Promise((resolve, reject) => {
    web3.eth.getBalance(account, (err, res) => {
      if (!err) return resolve(res)
      reject(err)
    })
  })

export { getEthWallets, getNetIdString, getBalance, isInjected, web3, contractInstance }
