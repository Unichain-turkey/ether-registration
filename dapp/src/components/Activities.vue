<template>
    <div class="activities">
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item">
          <a class="nav-link" id="new-tab" data-toggle="tab" href="#all-new" role="tab" aria-controls="profile" aria-selected="false">New Events</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" id="active-tab" data-toggle="tab" href="#all-active" role="tab" aria-controls="home" aria-selected="true">All Events</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="reco-tab" data-toggle="tab" href="#all-recommendations" role="tab" aria-controls="contact" aria-selected="false">Recommendations</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="past-tab" data-toggle="tab" href="#all-past" role="tab" aria-controls="contact" aria-selected="false">Past Events</a>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="all-active" role="tabpanel" aria-labelledby="home-tab">
          <br/>
          <div>
            <h3 class="text-center">Active Events</h3>
          </div>
          <div class="row">
            <div class="col-4" v-for="activity in activities " v-bind:key="activity.key">
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
        </div>
        <div class="tab-pane fade" id="all-new" role="tabpanel" aria-labelledby="profile-tab">
          <br/>
          <div>
            <h3 class="text-center">New Events</h3>
          </div>
          <div class="row">
            <div class="col-4" v-for="activity in newActivities " v-bind:key="activity.key">
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
        </div>
        <div class="tab-pane fade" id="all-recommendations" role="tabpanel" aria-labelledby="contact-tab">
          <br/>
          <div>
            <h3 class="text-center">Recommmend Events</h3>
          </div>
          <div class="row">
            <div class="col-4" v-for="activity in activities " v-bind:key="activity.key">
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
        </div>
        <div class="tab-pane fade" id="all-past" role="tabpanel" aria-labelledby="contact-tab">
          <br/>
          <div>
            <h3 class="text-center">Past Events</h3>
          </div>
          <div class="row">
            <div class="col-4" v-for="activity in pastActivities " v-bind:key="activity.key">
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
  name: "Activities",
  data: function () {
    return {
      newActivities: [],
      activities: [],
      pastActivities: []
    }
  },
  mounted () {
    let _contract = this.$store.getters.contract()

    _contract.getPastEvents('ActivityCreated', { fromBlock: 0, toBlock: 'latest'}, (err, event) => {
      let number=0;
      event.forEach((element) => {
        element = element.returnValues
        const temp = _contract.methods.getInfoActivity(element._owner).call()
        temp.then(function (val) {
          console.log(val)
          var date = new Date(parseInt(val[6]) * 1000)
          var daysDiff = Math.floor((new Date() - date) / (1000 * 60 * 60 * 24));
          if(val[2]===true){
            number += 1;
            this.activities.push({
              'name': val[0],
              'key': number,
              'address': val[1],
              'limit': val[5],
              'content': val[7],
              'imageHash': val[8]
            })

          }
          else {
            number += 1;
            this.pastActivities.push({
              'name': val[0],
              'key': number,
              'address': val[1],
              'limit': val[5],
              'content': val[7],
              'imageHash': val[8]
            })
          }
          if(daysDiff<7){
            number += 1;
            this.newActivities.push({
              'name': val[0],
              'key': number,
              'address': val[1],
              'limit': val[5],
              'content': val[7],
              'imageHash': val[8]
            })

          }

        }.bind(this))


      })
    })
  },
  methods :{
    getImageUrl: function (hash) {
      return 'https://gateway.ipfs.io/ipfs/' + hash + '/'
    }
  }

}
</script>

<style scoped>

</style>
