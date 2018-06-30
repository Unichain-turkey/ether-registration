<template>
  <div v-if="$route.name!=='entry'">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link class="navbar-brand" to="/"> Registhereum </router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link  class="navbar-brand" to="/create"> Create Event </router-link>
          </li>
          <li class="nav-item">
            <router-link  class="navbar-brand" to="/admin"> My Events </router-link>
          </li>
          <li class="nav-item">
            <router-link  class="navbar-brand" to="/mp"> Marketplace </router-link>
          </li>
        </ul>
        <span class="form-inline">
           <b class="mr-sm-2">Logged in as: {{$store.getters.currentAddress}}</b>
           <b class="ml-2 mr-sm-0">TotalActivity: {{totalActivity}}</b>
        </span>
      </div>
    </nav>
  </div>
</template>

<script>
import store from '@/store/index'
export default {
  name: 'Header',
  data: function () {
    return {
      totalActivity: null
    }
  },
  mounted () {
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
