<template>

  <div class="container">
    <div class="item  col-xs-12 col-lg-12 list-group-item"  track-by="id" style="border: 0">
      <div class="thumbnail">
        <div class="card" style="border: 0">
          <div class="card-body">
            <img class="card-img img-fluid rounded mx-auto d-block" :src="getImageUrl(item['8'])" alt="Card image" style="height: 75%; width: 75%" >
          </div>
        </div>
        <div class="row">
          <div class="col-md flex-first">
            <h3 class="text-center text-uppercase">{{ item['0'] }}</h3>
            <p class="group inner list-group-item-text">
              Description: {{item['7']}}
            </p>
            <p class="group inner list-group-item-text"  v-bind:style="{ color: bgColor}">
              <span style="color: black;">Status: </span>{{getActive}}
            </p>
            <p class="group inner list-group-item-text">
              Price : {{getPrice}}</p>
            <p class="group inner list-group-item-text">
              Registered User Count : {{item['4']}}</p>
            <p class="group inner list-group-item-text">
              Student Limit:  {{item['5']}}</p>
            <p class="group inner list-group-item-text">
              Activity Date:  {{when}}</p>
            <p class="group inner list-group-item-text">
              Activity Creator Address: {{item['1']}}</p>
          </div>
        </div>
      </div>
      <br>
      <hr>
      <br>
      <div class="row">
        <div class="col-sm">
          <join-component :address="address" :price="this.item['3']"></join-component>
        </div>
        <div class="col-sm">
          <admin-actions></admin-actions>
        </div>
      </div>
    </div>
    <hr/>
    <br/>
  </div>
</template>

<script>
import store from '@/store/index'
import join from '@/components/JoinActivity'
import AdminActions from '@/components/AdminActions'

export default {
  name: 'ActivityDetail',
  components: {
    'join-component': join,
    'admin-actions': AdminActions
  },
  data: function () {
    return {
      c_instance: '',
      address: this.$route.params.id,
      item: '',
      web3: '',
      bgColor: 'yelllow'
    }
  },
  computed: {
    getPrice: function () {
      return this.item['3'] + ' mili ether'
    },
    when: function () {
      var date = new Date(this.item['6'] * 1000)
      return date.toString()
    },
    getActive: function () {
      if (this.item['2'] === true) {
        return 'Active'
      } else {
        return 'Closed'
      }
    }
  },
  mounted () {
    this.c_instance = store.getters.contract()
    this.coinbase = store.getters.currentAddress
    this.web3 = store.getters.web3Instance
    const temp = this.c_instance.methods.getInfoActivity(this.address).call()
    temp.then(function (val) {
      this.item = val
      if (this.item['2'] === true) {
        this.bgColor = 'green'
      } else {
        this.bgColor = 'red'
      }
    }.bind(this))
  },
  methods: {
    getImageUrl: function (hash) {
      return 'https://gateway.ipfs.io/ipfs/' + hash + '/'
    }
  }
}
</script>

<style scoped>
</style>
