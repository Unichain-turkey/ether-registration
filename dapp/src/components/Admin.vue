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
        <br/>
        <div>
          <h3 class="text-center">Upcomming Events</h3>
        </div>
        <div class="row">
          <div class="col-4" v-for="activity in upcomingActivities" v-bind:key="activity.key">
            <div class="card" style="border: 0">
              <div class="card-body">
                <router-link class="text-dark" :to="{path:'/activity/'+activity.address }">
                  <img class="card-img img-fluid rounded mx-auto d-block" :src="getImageUrl(activity.imageHash)" alt="Card image" style="max-width: 100%; height: 75%" >
                  <div class="card-body">
                    <h6 class="card-title">{{activity.name.toUpperCase()}}</h6>
                    <p class="card-text">{{activity.content}}</p>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <br/>
      </div>
      <div class="tab-pane fade" id="all-past" role="tabpanel" aria-labelledby="profile-tab">
        <br/>
        <div>
          <h3 class="text-center">Past Events</h3>
        </div>
        <div class="row">
          <div class="col-4" v-for="activity in pastActivities" v-bind:key="activity.key">
            <div class="card" style="border: 0">
              <div class="card-body">
                <router-link class="text-dark" :to="{path:'/activity/'+activity.address }">
                  <img class="card-img img-fluid rounded mx-auto d-block" :src="getImageUrl(activity.imageHash)" alt="Card image" style="max-width: 100%; height: 75%" >
                  <div class="card-body">
                    <h6 class="card-title">{{activity.name.toUpperCase()}}</h6>
                    <p class="card-text">{{activity.content}}</p>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <br/>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store/index'
window.depo = {
  web3: store
}
export default {
  name: "Admin",
  data: function () {
    return {
      upcomingActivities: [],
      pastActivities: []
    }
  },
  methods :{
    getImageUrl: function (hash) {
      return 'https://gateway.ipfs.io/ipfs/' + hash + '/'
    }
  },
  mounted () {
    var _self = this
    let _contract = this.$store.getters.contract()
    let myAddress = this.$store.getters.currentAddress
    _contract.getPastEvents('ActivityCreated', { fromBlock: 0, toBlock: 'latest'}, (err, event) => {
      event.forEach((element) => {
        element = element.returnValues
        if(element[1] === myAddress){
          const temp = _contract.methods.getInfoActivity(element[1]).call()
          temp.then(function (value) {
            var date = new Date(parseInt(value[6]) * 1000)
            if (date >= Date.now()) {
              this.upcomingActivities.push({
                'name': value[0],
                'address': value[1],
                'limit': value[5],
                'content': value[7],
                'imageHash': value[8]
              })
            }else {
              this.pastActivities.push({
                'name': value[0],
                'address': value[1],
                'limit': value[5],
                'content': value[7],
                'imageHash': value[8]
              })
            }
          }.bind(this))
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
