<template>
  <div id="app">
    <header-component></header-component>

    <router-view/>
    <footer-component></footer-component>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
  name: 'App',
  components: {
    'header-component': Header,
    'footer-component': Footer
  },
  mounted () {
  }
}
</script>

<style>
  #app {
    font-family: 'Ubuntu', sans-serif;
  }
</style>
