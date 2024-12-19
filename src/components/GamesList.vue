<template>
    <div class="grid-body">
<h1>Gamelist</h1>
      <ul class="" v-for="game in games" v-bind:key="game.game_id">

        <li>
        <router-link :click="updateStoreGameInfo(game)" :to="{ name:'game', params: { gameid: game.game_id, game_score: game.game_score, game_name: game.game_name  }}"><li><h2 class="page-title">{{  game.game_name }}</h2></li></router-link>

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
},
computed: {
    games() {
      return this.$store.state.games;
    }
  },
    data() {
      return {
        getResponse: false,
      //   games: axios
      //   .get(`${this.$store.state.url}/api/games`)
      //     .then((res) => {
      //       this.getResponse = true;
      //       console.log("Get games api call from gameslist file " + JSON.stringify(res.data[0]));
      //       return (this.games = res.data);
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //       this.getResponse = false;
      //     }),


      };
    },
    methods: {
updateStoreGameInfo(game) {
      this.$store.commit('setGameInfo', `${game}`);
    }
    },

  };
  </script>

  <style>

  .page-title {
    margin-top:10px;
  }

  .grid-body {
    min-height: 100%;
      display: grid;
      grid-template-rows: auto 1fr auto;
      grid-template-columns: 100%;
  }

  .grid-header {
    display:inline-grid;
    grid-template-columns: auto auto auto auto;
  }

  .grid-headings {
    background-color: cadetblue;
    font-weight:bold;
    font-size: 1.2em;
    padding:10px 5px;
  }

  .grid-clues-container {
    display:grid;
    grid-template-columns: auto auto auto auto;
    grid-template-rows: fit-content;
    overflow:none;

  }

  .grid-clues {
    display: grid;
    grid-template-columns: repeat(1, 1fr); /*make 1 column responsive*/
    grid-template-rows: repeat(3,1fr); /*make rows responsive*/
    font-size: 1.2em;
  }

  .cluecolumn {
    background-color: rgb(65, 125, 255);
  }

  .grid-clues button {
    height:100%;
  }

  .scorebox {
    font-weight: bold;
    font-size:1.3em;
    background-color:rgb(255, 214, 112);
    padding:5px;
    margin-bottom:5px;
  }
  </style>
