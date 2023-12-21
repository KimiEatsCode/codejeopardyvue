<template>
  <div class="container-fluid">
<CategoryHeader/>
</div>
<footer>Made by Kimi Rettig. Project uses CSS Grid, Vue JS, Flexbox, SQLPostGres, Node/Express API hosted on Render</footer>
</template>

<script>

import CategoryHeader from './components/CategoryHeader.vue'

export default {
  name: 'App',
  components: {
    CategoryHeader,

  }

  }

</script>

<style>
html, body {
    width: 100%;
    height: 100%;
}

#app {
  display:grid;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

footer {
  display:fixed;
  bottom:0px;
 height:50px;
  padding:20px;
  font-size: 1.1em;
}


</style>



