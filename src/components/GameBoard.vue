<template>
    <div class="container-fluid">
      <h1>{{ gameid }}</h1>
<h2>{{ this.$store.state.score }}</h2>
<CategoryHeader :gameid = this.gameid></CategoryHeader>

<FooterLinks></FooterLinks>
</div>
<footer>
<strong>Made With:</strong>
Vue JS, HTML, CSS Grid, Flexbox, Bootstrap, PostgreSQL, Node/Express API
<div class="links">
    <router-link :to="{ path:'/'}">Games</router-link>
 <a href="" @click="newGameReset(this.gameid)">Start New Game</a>
</div>
</footer>
  </template>

  <script>

  // import axios from "axios";

import CategoryHeader from "./CategoryHeader.vue";
import FooterLinks from "./Footer.vue"

  export default {
    name: 'GameBoard',
    props: {
      gameid: String,

    },
components: {
CategoryHeader,
FooterLinks
},
created () {
  this.$store.dispatch("fetchGameInfo",this.gameid);
},
computed: {
    game() {
      return this.$store.state.game;
    },
    score() {
     return this.$store.state.score;
    }
  },
    data() {
      return {

    }
  },

    methods: {

      newGameReset(gameid) {
        this.$store.dispatch("resetClues");
        this.$store.dispatch("resetGameScore", gameid);
        // location.reload();
      },
    }
  }

  </script>





