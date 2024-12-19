<template>
    <div class="container-fluid">
      <h1>{{ this.game.game_name }}</h1>
<h2>{{  this.game.game_score  }}</h2>
<CategoryHeader :gameid = this.gameid></CategoryHeader>

<FooterLinks></FooterLinks>
</div>

  </template>

  <script>

  // import axios from "axios";


import CategoryHeader from "./CategoryHeader.vue";
import FooterLinks from "./Footer.vue"


  export default {
    name: 'GameBoard',
    props: {
      gameid: String,
    //   game_name: String,
    //   game_score: String,

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
    }
  },
    data() {
      return {
// gameName: this.$store.state.game[0].game_name
// gameScore: this.game_score,
// gameID: this.gameid
    }
  },

    methods: {

      newGameReset() {
        this.$store.dispatch("resetClues");
        // location.reload();
      },
    }
  }

  </script>





