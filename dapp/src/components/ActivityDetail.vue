<template>

  <div class="container">
    <div class="item  col-xs-12 col-lg-12 list-group-item"  track-by="id" >
      <div class="thumbnail">
        <img class="center" src="@/assets/unichain_2.png" alt="" />
        <div class="caption">
          <h4 class="group inner list-group-item-heading">
            {{ item['0'] }}</h4>
          <p class="group inner list-group-item-text">
            Owner: {{item['1']}}</p>
          <p class="group inner list-group-item-text"  v-bind:style="{ color: bgColor}">
            {{getActive}}</p>
          <p class="group inner list-group-item-text">
            Price : {{getPrice}}</p>
          <p class="group inner list-group-item-text">
            Registered : {{item['4']}}</p>
          <p class="group inner list-group-item-text">
            Limit:  {{item['5']}}</p>
          <p class="group inner list-group-item-text">
            Date:  {{when}}</p>
        </div>
      </div>
      <br>
      <hr>
      <br>
      <join-component :address="address" :price="this.item['3']"></join-component>
    </div>

  </div>
</template>

<script>
import store from '@/vuex/store'
import join from '@/components/JoinActivity'

export default {
  name: 'ActivityDetail',
  components: {
    'join-component': join
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
    console.log('address', this.address)
  },
  created () {
    this.c_instance = store.getters.contractInstance()
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
