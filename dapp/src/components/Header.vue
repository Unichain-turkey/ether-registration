<template>
  <div>
    <nav class="navbar sticky-top navbar-light bg-light">
      <a class="navbar-brand" href="#">Registhereum</a>
      <b>Balance: {{$store.getters.balance}} ETH</b>
      <b>Address: {{$store.getters.currentAddress}}</b>
      <b>Network: {{$store.getters.network}}</b>
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
export default {
  name: 'Header'
}
</script>

<style scoped>

</style>
