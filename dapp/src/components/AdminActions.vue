<template>
  <div>

    <div class="progress" v-if="pending">
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
        <input type="text" class="form-control col-md-6"  v-model="payable" placeholder="True or False" aria-describedby="btnGroupAddon">
        <button  v-on:click="setPayable" class="btn btn-outline-success btn-block col-md-3">Pay or not</button>
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
      payable: true,
      user: '',
      payCode: '',

      name: null,
      surname: null,
      email: null,
      number: null,
      number1: null,
      c_instance: null,
      coinbase: null,
      web3: null,
      pending: false
    }
  },
  methods: {
    adminAct: function (e) {
      console.log(this.c_instance)
      console.log(this.price)
      const temp = this.c_instance.methods.registerToActivity(
        this.address,
        this.email
      ).send(
        {value: this.$options.filters.toWei('0.1'), from: this.coinbase})
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
