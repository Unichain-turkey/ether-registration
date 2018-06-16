<template>
  <div class="container ">
    <div class="row">
    <h3 class="col-12 display-4 text-center  p-2">Active Events</h3>
    </div>

      <!-- <div class="list-group" v-for="activity in activities " v-bind:key="activity.address">

        <router-link :to="{path:'/activity/'+activity.address }" class="list-group-item list-group-item-action">{{activity.name.toUpperCase() +', capacity is ' + activity.limit+ ' people and created by '+ activity.address}}</router-link>

      </div> -->

      <div class="row">

        <div class="col-md-3 " v-for="activity in activities " v-bind:key="activity.address">

          <div class="card p-2 m-2" style="width: 18rem;">
            <router-link :to="{path:'/activity/'+activity.address }">
            <img class="card-img-top" src="@/assets/unichain_2.png/" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">{{activity.name.toUpperCase()}}</h5>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
            </router-link>
          </div>

        </div>

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
        this.activities.push({'name': element._name, 'address': element._owner, 'limit': element._limit})
      })
    })
  }
}
</script>

<style scoped>

</style>
