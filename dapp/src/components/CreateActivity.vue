<template>
  <div>
    <div class="container">
      <form @submit.prevent="createActivityButton()">
        <div class="form-group">
          <label for="exampleFormControlInput1">Activity Name</label>
          <input type="text" class="form-control" id="exampleFormControlInput1" v-model="activity_name" placeholder="Name of ">
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" v-on:change="free($event)" value="" id="isPayActiveCheck">
          <label class="form-check-label" for="isPayActiveCheck">
            Free
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" v-model="is_active"  value="" id="isActiveCheck">
          <label class="form-check-label" for="isActiveCheck">
            Is Active
          </label>
        </div>
        <br>

        <div class="form-group col-md-3" v-show="isActivePrice">
          <label for="price">Price</label>
          <input type="number" class="form-control" v-model="price" id="price" placeholder="milli ether">
        </div>
        <div class="form-group col-md-3">
          <label>When</label>
          <date-picker v-model="date" ></date-picker>

        </div>

        <br>
        <div class="form-group col-md-3">
          <label for="participantLimit">Participant Limit</label>
          <input type="number" class="form-control" v-model="participant_limit" id="participantLimit">
        </div>
        <div class="form-group col-md-3">
          <label for="content">Content </label>
          <textarea class="form-control" rows="5" id="content" v-model="content" name="text"></textarea>
        </div>

        <form @submit.prevent="uploadImage()">
          <div class="form-group">
            <div class="form-group">
              <label for="inputFile">İmage</label>
              <input type="file" class="form-control" @change="onFileChanged" id="inputFile" aria-describedby="fileHelp" placeholder="Place File">
              <small id="fileHelp" class="form-text text-muted">Load your image</small>
            </div>
          </div>
          <button type="button" v-on:click="onUpload"  class="btn btn-outline-info btn-block" >Load image to Ipfs </button>
        </form>



        <br>
        <button type="submit" class="btn btn-primary mb-2">Create Activity</button>
      </form>
      <div>
        <ul>
          <li>{{this.activity_name}}</li>
          <li>{{this.price + ' mili ether'}}</li>
          <li>{{this.participant_limit}}</li>
          <li>{{getDate}}</li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
import store from '@/store/'
window.depo = {
  web3: store
}
function toTimestamp (strDate) {
  var datum = Date.parse(strDate)
  return datum / 1000
}


export default {
  name: 'CreateActivity',
  data () {
    return {
      c_instance: null,
      coinbase: null,
      activity_name: '',
      price: null,
      image: null,
      imageHash: '',
      is_active: null,
      participant_limit: null,
      content: null,
      activity_list: null,
      isActivePrice: true,
      date: new Date()
    }
  },
  computed: {
    getDate: function () {
      return toTimestamp(this.date)
    }
  },
  mounted () {
    this.c_instance = this.$store.getters.contract()
    this.coinbase = this.$store.getters.currentAddress
    console.log(this.coinbase)
    const temp = this.c_instance.methods.getTotalActivity().call()
    temp.then(function (val) {
      console.log('Total activity', val)
    })
  },
  methods: {
    free (event) {
      if (event.target.checked) {
        this.isActivePrice = false
        this.price = 0
      } else {
        this.isActivePrice = true
      }
    },
    onFileChanged (event) {
      this.image = event.target.files[0]
    },
    onUpload () {
      let ipfs = this.$store.getters.getIpfs
      console.log(ipfs)
      let reader = new window.FileReader()
      reader.onload = function (e) {
        let buffer = Buffer.from(reader.result)
        ipfs.add(buffer, {progress: (prog) => console.log(`received: ${prog}`)})
          .then((response) => {
            this.imageHash = response[0].hash
            console.log(response[0].hash)
          }).catch((err) => {
          console.error(err)
        })
      }.bind(this)
      reader.readAsArrayBuffer(this.image)
    },

    createActivityButton () {
      this.pending = true
      let _base = this.coinbase
      const temp = this.c_instance.methods.createActivity(
        this.activity_name,
        this.participant_limit,
        this.price,
        toTimestamp(this.date),
        this.content,
        this.imageHash
      ).send(
        {value: this.$options.filters.toWei('0.1'), from: _base, gas: 4700000})
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
