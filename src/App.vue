<template>
  <div class="container-fluid">
<CategoryHeader/>
</div>

<!-- <footer><button onClick="showInfo()" type="button" id="toggle-info-button" class="btn btn-secondary"> -->
  <footer>
Made With:
<div id="info-popover">Vue JS, HTML, CSS Grid, Flexbox, Bootstrap, PostgresSQL, Node/Express API hosted on Render.</div></footer>
</template>

<script>

import CategoryHeader from './components/CategoryHeader.vue';

export default {
  name: 'App',
  components: {
    CategoryHeader,
  }
//   methods: {
//     showInfo: function() {
//   let x = document.getElementById("info-popover");
//   if (x.style.display === "none") {
//     x.style.display = "block";
//   } else {
//     x.style.display = "none";
//   }
// }
//   }

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
  margin-top: 20px;
}

footer {
  display:fixed;
  bottom:0px;
 height:50px;
  padding:20px;
  font-size: 16px;
  line-height:17px;
}


</style>



