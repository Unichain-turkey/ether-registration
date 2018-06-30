<template>
  <footer class="spec-footer footer">
    <div class="row">
      <div class="col-md-12">
        <a class="icon-color" href="https://twitter.com/unichaintr" target="_blank">
          <i class="fab fa-2x fa-twitter"></i>
        </a>
        <a class="icon-color" href="https://www.instagram.com/unichaintr/" target="_blank">
          <i class="fab fa-2x fa-instagram"></i>
        </a>
        <a class="icon-color" href="#" target="_blank">
          <i class="fas fa-2x fa-rss"></i>
        </a>
        <a class="icon-color" href="https://medium.com/@unichaintr" target="_blank">
          <i class="fab fa-2x fa-medium"></i>
        </a>
        <a class="icon-color" href="https://github.com/unichain-turkey/"target="_blank">
          <i class="fab fa-2x fa-github"></i>
        </a>
        <hr/>
        <p class="text-center">© {{new Date().getFullYear()}} Unichain Turkey | BlockCircus Hackathon</p>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'Footer'
  }
</script>

<style>
  .icon-color {
    color: Tomato;
    padding-left: 3px;
    padding-right: 3px;
  }
  .spec-footer {
    margin-bottom: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 1rem;
    background-color: #000000;
    color: white;
    text-align: center;
  }
</style>
