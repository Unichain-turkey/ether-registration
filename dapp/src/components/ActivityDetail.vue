<template>

  <div class="container">
    <div class="item  col-xs-12 col-lg-12 list-group-item"  track-by="id" >
      <div class="thumbnail">
        <div class="row">
        <div class="col-md-8 flex-first">
          <h4 class="display-4 text-center" >
            {{ item['0'].toUpperCase() }}</h4>
          <p class>DESCRIPTION
            Firat Isbecer is an entrepreneur and an angel investor. Isbecer co-founded Pozitron, a pioneering mobile banking and payments software company that was acquired by London based fintech star Monitise plc in 2014. As the Managing Director of Monitise MEA, Isbecer oversaw the company’s Eastern Europe, Middle East, Central Asia and Africa operations. Monitise was later acquired by US-based financial services tech giant Fiserv Inc in 2017. </p>
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
          <p class="group inner list-group-item-text">
            Owner: {{item['1']}}</p>
        </div>
        <img class="col-md-4 flex-last" src="@/assets/unichain_2.png" alt="" />
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
