<template>
  <div>
    <div class="progress" v-if="pending">
      <p>Sending transaction</p>
      <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
    </div>
    <h4 class="display-5">Admin Actions</h4>
    <br>
    <div class="container">
      <div class="input-group">
        <input type="text" class="form-control col-md-6"  v-model="payCode" placeholder="Secret Code" aria-describedby="btnGroupAddon">
        <button  v-on:click="setPayCode" class="btn btn-outline-success btn-block col-md-3">Send Code</button>
      </div>
      <br/>
      <div class="input-group">
        <input type="text" class="form-control col-md-6"  v-model="active" placeholder="True or False" aria-describedby="btnGroupAddon">
        <button  v-on:click="setActive" class="btn btn-outline-success btn-block col-md-3">Set</button>
      </div>
      <br/>
      <div class="input-group">
        <input type="text" class="form-control col-md-6"  v-model="newOwner" placeholder="0x3TH3R3UMADDR3SS" aria-describedby="btnGroupAddon">
        <button  v-on:click="changeOwner" class="btn btn-outline-success btn-block col-md-3">Say goodbye :(</button>
      </div>
      <br/>
      <div class="input-group">
        <input type="text" class="form-control col-md-6"  v-model="user" placeholder="I have a high ground" aria-describedby="btnGroupAddon">
        <button  v-on:click="deleteUser" class="btn btn-outline-success btn-block col-md-3">Get out</button>
      </div>
      <br/>
      <div class="input-group">
        <input type="text" class="form-control col-md-6"  v-model="userlist" placeholder="Who is there" aria-describedby="btnGroupAddon">
        <button  v-on:click="getUserList" class="btn btn-outline-success btn-block col-md-3">Get list</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminActions",
  data () {
    return {
      userlist: [],
      active: true,
      newOwner: '',
      user: '',
      payCode: '',

      name: null,
      surname: null,
      email: null,
      number: null,
      number1: null,
      contractInstance: null,
      coinbase: null,
      web3: null,
      pending: false
    }
  },
  created () {
    this.contractInstance = this.$store.getters.contract()
    this.web3 = this.$store.getters.web3Instance
    this.coinbase = this.$store.getters.currentAddress
  },
  methods: {
    adminAct: function (e) {
      console.log(this.contractInstance)
      console.log(this.price)
      const temp = this.contractInstance.methods.registerToActivity(
        this.address,
        this.email
      ).send(
        {value: this.$options.filters.toWei('0.1'), from: this.coinbase})
      temp.then(function (error, value) {
        console.log(error)
        console.log(value)
      })
    },
    changeOwner: function (e) {
      const temp = this.contractInstance.methods.transferOwnershipActivity(
        this.coinbase,
        this.newOwner
      ).send(
        {from: this.coinbase, gas: 4500000})
      this.pending = true
      var self = this
      temp.then(function (value) {
        console.log(value)
        self.pending = false
      })
    },
    setPayCode: function (e) {
      const temp = this.contractInstance.methods.transferOwnershipActivity(
        this.coinbase,
        this.newOwner
      ).send(
        {from: this.coinbase, gas: 4500000})
      this.pending = true
      var self = this
      temp.then(function (value) {
        console.log(value)
        self.pending = false
      })
    },
    setActive: function (e) {
      const temp = this.contractInstance.methods.transferOwnershipActivity(
        this.coinbase,
        this.newOwner
      ).send(
        {from: this.coinbase, gas: 4500000})
      this.pending = true
      var self = this
      temp.then(function (value) {
        console.log(value)
        self.pending = false
      })
    },
    deleteUser: function (e) {
      const temp = this.contractInstance.methods.transferOwnershipActivity(
        this.coinbase,
        this.newOwner
      ).send(
        {from: this.coinbase, gas: 4500000})
      this.pending = true
      var self = this
      temp.then(function (value) {
        console.log(value)
        self.pending = false
      })
    },
    getUserList: function (e) {
      const temp = this.contractInstance.methods.transferOwnershipActivity(
        this.coinbase,
        this.newOwner
      ).send(
        {from: this.coinbase, gas: 4500000})
      this.pending = true
      var self = this
      temp.then(function (value) {
        console.log(value)
        self.pending = false
      })
    }


  }
}

</script>

<style scoped>

</style>
