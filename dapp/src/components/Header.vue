<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link  class="navbar-brand"   :to="{ name: 'index'}">Registhereum</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link  class="navbar-brand"  :to="{ name: 'create'}">Create Event</router-link>
          </li>
        </ul>
        <span class="form-inline">
         <b class="mr-sm-2">Address: {{$store.getters.currentAddress}}</b>
          <!--<b>Balance: {{$store.getters.balance}} ETH</b>
          <b>Network: {{$store.getters.network}}</b> -->
         <b class="ml-2 mr-sm-0">TotalActivity: {{totalActivity}}</b>

    </span>
      </div>
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
