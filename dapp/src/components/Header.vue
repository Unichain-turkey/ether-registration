<template>
  <div>
    <nav class="navbar sticky-top navbar-light bg-light">
      <a class="navbar-brand" href="#">Registhereum</a>
      <b>Address: {{$store.getters.currentAddress}}</b>
      <!--<b>Balance: {{$store.getters.balance}} ETH</b>
      <b>Network: {{$store.getters.network}}</b> -->
      <b>TotalActivity: {{totalActivity}}</b>
      <b></b>
    </nav>
    <div class="jumbotron jumbotron-fluid text-center bg-primary">
      <div class="container-fluid">
        <h1 class="display-4">Hello UniChain</h1>
        <p class="lead ">This is an Activity registration app by using smart contracts.</p>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/vuex/store'
export default {
  name: 'Header',
  data: function () {
    return {
      totalActivity: null
    }
  },
  mounted () {
    console.log('contract in header  2', store.getters.contract())

    const temp = store.getters.contract().methods.getTotalActivity().call()
    let that = this
    temp.then(function (val) {
      that.totalActivity = val
    })
  }
}
</script>

<style scoped>

</style>
