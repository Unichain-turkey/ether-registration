<template>
  <div>
    <header-component></header-component>
    <div class="container">
      <form @submit.prevent="createActivityButton()">
        <div class="form-group">
          <label for="exampleFormControlInput1">Activity Name</label>
          <input type="text" class="form-control" id="exampleFormControlInput1" v-model="activity_name" placeholder="Meeting">
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" v-model="is_pay_active" value="" id="isPayActiveCheck">
          <label class="form-check-label" for="isPayActiveCheck">
            Free
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" v-model="is_active" value="" id="isActiveCheck">
          <label class="form-check-label" for="isActiveCheck">
            Is Active
          </label>
        </div>
        <div class="form-group col-md-2">
          <label for="price">Price</label>
          <input type="number" class="form-control" v-model="price" id="price">
        </div>
        <div class="form-group col-md-2">
          <label for="participantLimit">Participant Limit</label>
          <input type="number" class="form-control" v-model="participant_limit" id="participantLimit">
        </div>
        <!--
        <div class="form-group col-md-2">
          <label for="validationNumber">Validation Number</label>
          <input type="text" class="form-control" v-model="validation_number" id="validationNumber">
        </div>
        -->
        <button type="submit" class="btn btn-primary mb-2">Create Activity</button>
      </form>
      <div>
        <ul>
          <li>{{this.activity_name}}</li>
          <li>{{this.is_pay_active}}</li>
          <li>{{this.is_active}}</li>
          <li>{{this.price}}</li>
          <li>{{this.participant_limit}}</li>
          <!--<li>{{this.validation_number}}</li>-->
          <li>{{this.pending}}</li>
        </ul>
      </div>
      <div>
        <p>CURRENT ACTIVITIES</p>
        <button type="submit" v-on:click="getList()" class="btn btn-primary mb-2">GET LIST</button>
        <button type="submit" v-on:click="clearList()" class="btn btn-primary mb-2">CLEAR LIST</button>
        <button type="submit" v-on:click="refreshList()" class="btn btn-primary mb-2">REFRESH LIST</button>
        <p>{{activity_list}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Web3 from 'web3'
import {ABI, address} from '../../../build/contracts/DenemeContract'
export default {
  name: 'Activity',
  components: {
    'header-component': Header
  },
  data () {
    return {
      activity_name: '',
      is_pay_active: null,
      is_active: null,
      price: null,
      participant_limit: null,
      // validation_number: null,
      activity_list: null,
      pending: false,
      contractCreationValue: 0.5
    }
  },
  beforeCreate () {
    new Promise(function (resolve, reject) {
      let web3 = new Web3(window.web3.currentProvider)
      let casinoContract = web3.eth.contract(ABI)
      let casinoContractInstance = casinoContract.at(address)
      resolve(casinoContractInstance)
    })
      .then(result => {
        this.$store.dispatch('setContract', result)
      }).catch(e => console.log(e))
  },
  methods: {
    getList () {
      this.activity_list = 5
    },
    clearList () {
      this.activity_list = null
    },
    refreshList () {
      this.activity_list += 5
    },
    createActivityButton () {
      this.pending = true
      this.$store.getters.contractInstance().createActivity(
        this.activity_name,
        this.participant_limit,
        this.is_active,
        this.is_pay_active,
        this.price,
        {
          gas: 300000,
          value: this.$store.getters.web3InstanceGetter().toWei(0.005, 'ether'),
          from: this.$store.getters.currentAddress
        },
        (err, result) => {
          if (err) {
            console.log(err)
            this.pending = false
          } else {
            console.log('Created')
            console.log(result)
            this.pending = false
          }
        }
      )
    }
  }
}
</script>

<style scoped>

</style>
