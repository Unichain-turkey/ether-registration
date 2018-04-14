<template>
  <div>
    <p>Hello UniChain</p>
    <div>{{$store.getters.web3state}}</div>
  </div>
</template>

<script>
export default {
  name: 'side-component'
}
</script>

<style scoped>

</style>
