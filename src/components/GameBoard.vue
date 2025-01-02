<template>
    <div class="container-fluid mt-5">
<h2>{{ this.$store.state.gameName }}</h2>
<h2>{{ this.$store.state.gameScore }}</h2>

<CategoryHeader :gameid = this.gameid></CategoryHeader>

<FooterLinks></FooterLinks>

</div>

<footer>
<strong>Made With:</strong>
Vue JS, HTML, CSS Grid, Flexbox, Bootstrap, PostgreSQL, Node/Express API
<ul class="links">
  <li> <router-link :to="{ path:'/'}">Games</router-link></li>
 <li style="cursor: pointer;text-decoration: underline; color:blue" @click="newGameReset()">Start New Game</li>
</ul>
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
      gameName: String,
      gameScore: String
    },
components: {
CategoryHeader,
FooterLinks
},
created () {
  this.$store.dispatch("fetchGameInfo",this.gameid);
  this.$store.dispatch("userGameInfo",this.userid_games);
},
computed: {
  },
    data() {
      return {

    }
  },

    methods: {
      newGameReset() {
        console.log('test new game reset function gameboard clicked ' + this.$store.state.gameid)
        this.$store.dispatch("resetClues");
        this.$store.dispatch("setScoreAction", { gameid: this.gameid, score: 0 });
        location.reload();
      },
    }
  }

  </script>





