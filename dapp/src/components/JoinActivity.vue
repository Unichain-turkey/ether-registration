<template>
  <div>
    <h4 class="display-5">Join The Event</h4>
    <br>
    <div class="container">

        <div class="form-group">

          <input type="text" class="form-control col-md-3"  v-model="name" placeholder="Name">
        </div>

      <div class="form-group">
        <input type="text" class="form-control col-md-3"  v-model="surname" placeholder="Surname">
      </div>

        <div class="form-group">
          <input type="text" class="form-control col-md-3"  v-model="email" placeholder="E-mail">
        </div>
        <div class="form-group">
          <input type="text" class="form-control col-md-3"  v-model="number" placeholder="Cell Phone">
        </div>

        <button  v-on:click="registerAct" class="btn btn-success mb-2">Register</button>

    </div>
  </div>
</template>

<script>
export default {
  name: 'JoinActivity',
  props: ['address', 'price'],
  data () {
    return {
      name: null,
      surname: null,
      email: null,
      number: null,
      c_instance: null,
      coinbase: null,
      web3: null
    }
  },
  beforeCreate () {
  },
  created () {
    this.c_instance = this.$store.getters.contract()
    this.web3 = this.$store.getters.web3Instance
    this.coinbase = this.$store.getters.currentAddress
    // todo change provider then try again
    /*
    this.c_instance.events.ParticipantRegisteredAt({
      filter: {}, // Using an array means OR: e.g. 20 or 23
      fromBlock: 0
    }, function (error, event) {

    })
    */
  },
  methods: {
    registerAct: function (e) {
      console.log(this.coinbase)
      console.log(this.web3)
      console.log(this.c_instance)
      const temp = this.c_instance.methods.registerToActivity(
        this.address,
        this.email
      ).send(
        {value: this.$options.filters.toWei('0.' + this.price), from: this.coinbase, gas: 4700000})
      temp.then(function (error, value) {
        console.log(error)
        console.log(value)
      })
    }

  }
}
</script>

<style scoped>

</style>
