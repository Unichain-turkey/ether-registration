<template>
  <div>
    <nav class="navbar sticky-top navbar-light bg-light">
      <a class="navbar-brand" href="#">Registhereum</a>
      <b>Balance: {{$store.getters.balance}},000 ETH</b>
      <b>Address: {{$store.getters.coinbase}}</b>
      <b>Network: {{$store.getters.network}}</b>
      <b></b>
    </nav>
    <div class="jumbotron jumbotron-fluid text-center">
      <div class="container-fluid">
        <h1 class="display-4">Hello UniChain</h1>
        <p class="lead ">This is an Activity registration app by using smart contracts.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>

</style>
