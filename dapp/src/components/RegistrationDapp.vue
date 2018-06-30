<template>
  <div>
    <create-activity></create-activity>
  </div>
</template>

<script>
import CreateActivity from '@/components/CreateActivity.vue'
export default {
  name: 'registration-dapp',
  components: {
    'create-activity': CreateActivity
  },
  beforeCreate () {
    console.log('dapp component is coming')
  }
}
</script>

<style scoped>

</style>
