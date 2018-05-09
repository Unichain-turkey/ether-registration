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
export default {
  name: 'index',
  data: function () {
    return {
      activities: []
    }
  },
  mounted () {
    let _contract = this.$store.getters.contractInstance()
    _contract.getPastEvents('ActivityCreated', { fromBlock: 0, toBlock: 'latest'}, (err, event) => {
      event.forEach((element) => {
        element = element.returnValues
        this.activities.push({'name': element._activityName, 'address': element._owner, 'limit': element._participantLimit})
      })
    })
    console.log(this.activities)
  }
}
</script>

<style scoped>

</style>
