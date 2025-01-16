<template>

      <div class="d-flex flex-column flex-md-row p-4 gap-4 py-md-2 align-items-center justify-content-center">

  <div class="list-group p-5">
  <div class=" gap-2 w-200 justify-content-between list-group-item-action gap-3" aria-current="true">
      <h4 class="page-title">User Id: {{ this.userid}}</h4>
  </div>
    <div v-for="game in userComputedGames" v-bind:key="game.game_id">
<!-- {{ game }} -->
 <router-link :to="{ name:'gameboard', params: { userid: this.userid ,  gameid:game.game_id, gamename: game.game_name, gamescore:game.game_score}}">

        <div class="gap-2 w-100 justify-content-between list-group-item-action gap-3 py-3" aria-current="true">
        <div>
          <h3 class="page-title py-3">{{  game.game_name }}</h3>

        </div>

        <h5 class="text-bold opacity-70 text-nowrap rounded-circle">Score: {{ game.game_score}}</h5>

   <div class="col-8">
   <h5 class="description">
      {{  game.game_description }}
    </h5>
  </div>

  </div>
</router-link>

<hr>
</div>

  </div>

    </div>
    <!-- <FooterLinks></FooterLinks> -->
  </template>

  <script>
// import axios from "axios";
// import FooterLinks from "./Footer.vue"

  export default {
    name: "GamesList",
    props: {
       userid:String
  },
  mounted() {

  this.$store.dispatch("fetchUserGames", this.id);
},

computed: {
userComputedGames() {
  return this.$store.state.userGames
},
id() {
  return this.userid
}
  },
    data() {
      return {
        getResponse: false,

    };
  },

    methods: {

}
  }
  </script>

  <style>
.description {
text-align:left;
}
  </style>
