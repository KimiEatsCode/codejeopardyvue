<template>

      <div class="d-flex flex-column flex-md-row p-4 gap-4 py-md-5 align-items-center justify-content-center">

  <div class="list-group">
    <div v-for="game in games" v-bind:key="game.game_id">
    <router-link :to="{ name:'game', params: { gameid: game.game_id, gameName: game.game_name, gameScore:game.game_score }}">

      <!-- <div class="d-flex gap-2 w-100 justify-content-between list-group-item-action gap-3 py-3" aria-current="true"> -->
        <div class=" gap-2 w-100 justify-content-between list-group-item-action gap-3 py-3" aria-current="true">
        <div>
          <h4 class="page-title">{{  game.game_name }}</h4>

        </div>

        <h6 class="text-bold opacity-50 text-nowrap rounded-circle">{{ game.game_score}}</h6>

   <div class="col-8">
   <h6 class="description">
      {{  game.game_description }}
    </h6>
  </div>

  </div>
</router-link>
<hr>
</div>

  </div>
    </div>

  </template>

  <script>
import axios from "axios";

  export default {
    name: "GamesList",
    props: {
  },
  created () {
  this.$store.dispatch("fetchAllGames");
  // this.$store.commit('setGameInfo', `${this.gameid}`);
},
computed: {
    // games() {
    //   return this.$store.state.games;
    // },
  },
    data() {
      return {
        getResponse: false,
        games:  axios
        .get(`${this.$store.state.url}/api/games`)
        .then((res) => {
          return (this.games = res.data);
        })
        .catch((error) => {
          console.log(error + " fetch all games error");

        }),
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
.description {
text-align:left;
}
  </style>
