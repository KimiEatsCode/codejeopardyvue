<template>
    <div class="container-fluid">
      <h1>{{ this.$store.state.score }}</h1>
<h2>{{  this.$store.state.game_name   }}</h2>
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
      game_name: String,
      game_score: String,

    },
components: {
CategoryHeader,
FooterLinks
},
mounted() {
  this.$store.commit('setGameInfo', `${this.props.game_name}`)
},
    data() {
      return {

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





