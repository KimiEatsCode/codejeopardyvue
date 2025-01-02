<template>

      <div class="d-flex flex-column flex-md-row p-4 gap-4 py-md-5 align-items-center justify-content-center">
<!-- <h1>{{ this.$store.state.username }}</h1> -->
  <div class="list-group">

    <div v-for="game in userComputedGames" v-bind:key="game.game_id">
    <router-link :to="{ name:'game', params: {  gameid: game.game_id, gameName: game.game_name, gameScore:game.game_score }}">

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
// import axios from "axios";

  export default {
    name: "GamesList",
    props: {
      userid: Number
  },
  created () {
  this.$store.dispatch("fetchUserGames", this.userid);

},
computed: {
userComputedGames() {
  return this.$store.state.userGames
}
  },
    data() {
      return {
        getResponse: false,
        id: this.userid,

    };
  },

    methods: {

    },
  };
  </script>

  <style>
.description {
text-align:left;
}
  </style>
