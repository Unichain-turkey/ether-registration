<template>
  <div class="container">
  <div align="center">
    <br>
  <strong>Active Events</strong>
    <br>
    </div>
  <div class="list-group" v-for="activity in activities " v-bind:key="activity.address">

    <router-link :to="{path:'/activity/'+activity.address }" class="list-group-item list-group-item-action">{{activity.name.toUpperCase() +', capacity is ' + activity.limit+ ' people and created by '+ activity.address}}</router-link>

  </div>
  </div>
</template>

<script>
import store from '@/vuex/store'
window.depo = {
  web3: store
}
export default {
  name: 'index',
  data: function () {
    return {
      activities: []
    }
  },
  mounted () {
    let _contract = this.$store.getters.contract()
    console.log('Contract in index', _contract)
    console.log('Contract in index', _contract)

    _contract.getPastEvents('ActivityCreated', { fromBlock: 0, toBlock: 'latest'}, (err, event) => {
      console.log(event)
      event.forEach((element) => {
        console.log(element)
        element = element.returnValues
        this.activities.push({'name': element._name, 'address': element._owner, 'limit': element._limit})
      })
      console.log(err)
    })
  }
}
</script>

<style scoped>

</style>
