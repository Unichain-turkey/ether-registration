<template>
  <div id="app">
    <header-component></header-component>
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/Header'
export default {
  name: 'App',
  components: {
    'header-component': Header
  },
  mounted () {
  }
}
</script>

<style>
</style>
