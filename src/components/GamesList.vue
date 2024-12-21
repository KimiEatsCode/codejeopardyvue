<template>
    <div class="grid-body">
<h1>Gamelist</h1>
      <ul class="" v-for="game in games" v-bind:key="game.game_id">
        <li>
        <!-- <router-link :click ="updateStoreGameInfo()" :to="{ name:'game', params: { gameid: game.game_id }}"><li><h3 class="page-title">{{  game.game_name }}</h3></li></router-link> -->
        <router-link  :to="{ name:'game', params: { gameid: game.game_id }}"><li><h3 class="page-title">{{  game.game_name }}</h3></li></router-link>{{ game.game_score }}
        </li>
      </ul>
    </div>

  </template>

  <script>
// import axios from "axios";

  export default {
    name: "GamesList",
    props: {
  },
  created () {
  this.$store.dispatch("fetchAllGames");
  // this.$store.commit('setGameInfo', `${this.gameid}`);
},
computed: {
    games() {
      return this.$store.state.games;
    },
  },
    data() {
      return {
        getResponse: false,
      };
    },
    methods: {
// updateStoreGameInfo() {
//       this.$store.commit('setGameInfo', `${this.gameid}`);
//     }
    },
  };
  </script>

  <style>

  </style>
