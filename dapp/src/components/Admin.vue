<template>
  <div class="admin-page container">
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item">
        <a class="nav-link active" id="home-tab" data-toggle="tab" href="#all-active" role="tab" aria-controls="home" aria-selected="true">Active Events</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#all-past" role="tab" aria-controls="profile" aria-selected="false">Past Events</a>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div class="tab-pane fade show active" id="all-active" role="tabpanel" aria-labelledby="home-tab">
        <div>
          <h3 class="text-center">Active Events</h3>
        </div>
        <div class="row">
          <div class="col-md-3 " v-for="activity in activities " v-bind:key="activity.address">
            <div class="card p-2 m-2" style="width: 18rem;">
              <router-link class="text-dark" :to="{path:'/activity/'+activity.address }">
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
      <div class="tab-pane fade" id="all-past" role="tabpanel" aria-labelledby="profile-tab">
        <div>
          <h3 class="text-center">New Events</h3>
        </div>
        <div class="row">
          <div class="col-md-3 " v-for="activity in activities " v-bind:key="activity.address">
            <div class="card p-2 m-2" style="width: 18rem;">
              <router-link class="text-dark" :to="{path:'/activity/'+activity.address }">
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
    </div>
  </div>
</template>

<script>
  import store from '@/store'
  window.depo = {
    web3: store
  }
  export default {
    name: "Admin",
    data: function () {
      return {
        activities: []
      }
    },
    mounted () {
      let _contract = this.$store.getters.contract()
      let _myAddress = this.$store.getters.currentAddress

      _contract.getPastEvents('ActivityCreated', { fromBlock: 0, toBlock: 'latest'}, (err, event) => {
        event.forEach((element) => {
          element = element.returnValues
          console.log(element)
          if(element._owner === _myAddress){
            this.activities.push({'name': element._name, 'address': element._owner, 'limit': element._limit})
          }
        })
        if(err){
          console.log(err)
        }
      })
    }
  }
</script>

<style scoped>

</style>
