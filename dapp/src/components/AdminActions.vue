<template>
  <div>
    <div class="progress" v-if="pending">
      <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
    </div>
    <h4 class="display-5">Admin Actions</h4>
    <br>
    <div class="container">
      <div class="input-group">
        <input type="text" class="form-control col-md-7"  v-model="payCode" placeholder="Secret Code 0x00000000000" aria-describedby="btnGroupAddon">
        <button  v-on:click="setPayCode" class="btn btn-outline-success btn-block col-md-3">Send Code</button>
      </div>
      <br/>
      <div class="input-group">
        <button  v-on:click="activate" class="btn btn-outline-success btn-block col-md-5">Free</button>
        <button  v-on:click="deactivate" class="btn btn-outline-danger btn-block col-md-5" style="margin-top: 0">For Pay</button>
      </div>
      <br/>
      <div class="input-group">
        <input type="text" class="form-control col-md-7"  v-model="newOwner" placeholder="0x3TH3R3UMADDR3SS" aria-describedby="btnGroupAddon">
        <button  v-on:click="changeOwner" class="btn btn-outline-success btn-block col-md-3">Leave Activity</button>
      </div>
      <br/>
      <div class="input-group">
        <input type="text" class="form-control col-md-7"  v-model="user" placeholder="I have a high ground" aria-describedby="btnGroupAddon">
        <button  v-on:click="deleteUser" class="btn btn-outline-success btn-block col-md-3">Kick User</button>
      </div>
      <br/>
      <div class="input-group">
        <input type="text" class="form-control col-md-7"  v-model="userlist" placeholder="Who is there" aria-describedby="btnGroupAddon">
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
      currentPayCode: '',

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
    activate: function (e) {
      const temp = this.contractInstance.methods.openPayActive(
        this.coinbase
      ).send(
        {from: this.coinbase, gas: 4500000})
      this.pending = true
      var self = this
      temp.then(function (value) {
        console.log(value)
        self.pending = false
      })
    },
    deactivate: function (e) {
      const temp = this.contractInstance.methods.closePayActive(
        this.coinbase
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
      const temp = this.contractInstance.methods.deleteParticipiant(
        this.coinbase,
        this.payCode
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
      const temp = this.contractInstance.methods.getParticipiant(
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
