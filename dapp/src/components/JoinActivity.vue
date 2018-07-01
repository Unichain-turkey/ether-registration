<template>
  <div>
    <div class="progress" v-if="pending">
      <p>Sending transaction</p>
      <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
    </div>
    <h4 class="display-5">Join The Event</h4>
    <br>
    <div class="container">

      <div class="form-group">

        <input type="text" class="form-control col-md-8"  v-model="name" placeholder="Name">
      </div>

      <div class="form-group">
        <input type="text" class="form-control col-md-8"  v-model="surname" placeholder="Surname">
      </div>

      <div class="form-group">
        <input type="text" class="form-control col-md-8"  v-model="email" placeholder="E-mail">
      </div>
      <div class="form-group">
        <input type="text" class="form-control col-md-8"  v-model="number" placeholder="Cell Phone">
      </div>

      <button  v-on:click="registerAct" class="btn btn-outline-success btn-block col-md-8">Register</button>

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
      web3: null,
      pending: false
    }
  },
  beforeCreate () {
  },
  created () {
    this.c_instance = this.$store.getters.contract()
    this.web3 = this.$store.getters.web3Instance
    this.coinbase = this.$store.getters.currentAddress
    console.log(this.c_instance)
    console.log(this.web3)
    console.log(this.coinbase)
  },
  methods: {
    registerAct: function (e) {
      console.log(this.c_instance)
      console.log(this.price)
      const temp = this.c_instance.methods.registerToActivity(
        this.address,
        this.email
      ).send(
        {value: this.$options.filters.toWei('0.1'), from: this.coinbase})
      this.pending = true
      var self = this
      temp.then(function (error, value) {
        if(error){
          console.log(error)
        }else{
          console.log(value)
        }
        self.pending = false
      })
    }

  }
}
</script>

<style scoped>

</style>
