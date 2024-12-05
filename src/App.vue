<template>
  <div class="container-fluid">

<CategoryHeader/>

</div>
  <footer>
<strong>Made With:</strong>
Vue JS, HTML, CSS Grid, Flexbox, Bootstrap, PostgreSQL, Node/Express API
<div class="links">

<a href="https://github.com/stars/KimiEatsCode/lists/code-jeopardy-workspace">
  View on Github</a>

 <a href="https://tally.so/embed/n9vl6V?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1">Message Me</a>

 <a href="" @click="newGameReset()">Start New Game</a>
</div>
</footer>
</template>

<script>

import CategoryHeader from './components/CategoryHeader.vue';
import axios from "axios";

export default {
  name: 'App',
  components: {
    CategoryHeader,
  },
  data() {
    return {
    gameInfo: axios
      .get(`${this.$store.state.url}/api/games`)
        .then((res) => {
          this.getResponse = true;
          // console.log("Get game info call " + JSON.stringify(res.data));
          return (this.gameInfo = res.data);
        })
        .catch((error) => {
          console.log(error);
          this.getResponse = false;
        }),
  }
},
  methods: {
    newGameReset() {
      this.$store.dispatch("resetClues");
      location.reload();
    },
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
  margin-top: 20px;
}

footer {
  display:fixed;
  text-align:center;
  bottom:0px;
  height:50px;
  padding:50px 15%;
  font-size: 16px;
  line-height:22px;
}


.links {
  display:flex;
  align-items:center;
  justify-content:center;
  padding:20px 0px 40px 0px;
}

.links > a{
padding-left:20px;
}

</style>



